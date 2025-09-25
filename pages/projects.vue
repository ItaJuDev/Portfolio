<script setup lang="ts">
import { ref, computed } from "vue";
import { useProjects } from "~/composables/usePortfolio";

const { byCategory, pending, error } = useProjects();

// Store the currently selected project for the modal
const selectedProject = ref<any | null>(null);
const openModal = (project: any) => {
  selectedProject.value = project;
};

const closeModal = () => {
  selectedProject.value = null;
  selectedImage.value = null;
  currentImageIndex.value = 0;
};

// Image Lightbox Variables
const selectedImage = ref<string | null>(null);
const currentImageIndex = ref(0);

const hasImages = computed(
  () => selectedProject.value && Array.isArray(selectedProject.value.images) && selectedProject.value.images.length > 0,
);

const openImage = (image: string, index: number) => {
  selectedImage.value = image;
  currentImageIndex.value = index;
};

const nextImage = () => {
  if (hasImages.value) {
    currentImageIndex.value = (currentImageIndex.value + 1) % (selectedProject.value!.images!.length as number);
    selectedImage.value = selectedProject.value!.images![currentImageIndex.value] as string;
  }
};

const prevImage = () => {
  if (hasImages.value) {
    const len = selectedProject.value!.images!.length as number;
    currentImageIndex.value = (currentImageIndex.value - 1 + len) % len;
    selectedImage.value = selectedProject.value!.images![currentImageIndex.value] as string;
  }
};
</script>

<template>
  <section class="container max-w-5xl px-6 py-12 mx-auto text-white">
    <h2 class="py-16 mb-8 text-5xl font-bold text-center">My Works</h2>

    <div v-if="pending" class="py-16 text-center text-gray-400">Loading projects...</div>
    <div v-else-if="error" class="py-16 text-center text-red-400">Failed to load projects. Check Supabase config.</div>

    <div v-else v-for="category in byCategory" :key="category.category" class="mb-12">
      <h3 class="pb-2 mb-6 text-3xl font-semibold border-b-2 border-gray-500">
        {{ category.category }}
      </h3>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="project in category.projects"
          :key="project.title"
          class="cursor-pointer project-card group"
          @click="openModal(project)"
        >
          <img :src="project.image" alt="Project image" class="project-image" />
          <div class="flex flex-col justify-between h-full p-4">
            <div>
              <h4 class="text-xl font-bold">{{ project.title }}</h4>
              <p class="mt-2 text-sm text-gray-400">{{ project.description }}</p>
            </div>
            <button class="block mt-2 text-sm text-right text-green-400 hover:underline">View Details →</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Page Modal for Project Details -->
    <transition name="fade-scale">
      <div v-if="selectedProject" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <transition name="slide-up">
          <div class="bg-[#0a192f] p-6 rounded-lg max-w-screen-lg w-full h-[90vh] overflow-hidden relative">
            <button @click="closeModal" class="absolute text-red-400 top-2 right-4 hover:underline">✖ Close</button>

            <h3 class="mb-4 text-3xl font-bold text-center">
              {{ selectedProject.title }}
            </h3>

            <div class="flex flex-col gap-6 md:flex-row">
              <!-- Video -->
              <div v-if="selectedProject.video" class="relative w-full mb-10 md:w-1/2">
                <iframe
                  v-if="selectedProject.video && selectedProject.video.includes('youtube.com')"
                  :src="selectedProject.video"
                  class="w-full rounded-lg h-60"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>

                <video v-else-if="selectedProject.video" controls class="w-full rounded-lg h-52">
                  <source :src="selectedProject.video" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div class="flex flex-col w-full py-16 md:w-1/2">
                <!-- Short Talk -->
                <p v-if="selectedProject.short_talk" class="items-center mb-4 text-center text-gray-400 text-1xl bold">
                  "{{ selectedProject.short_talk }}"
                </p>
              </div>
            </div>

            <!-- Animated Image Gallery with Slider -->
            <div v-if="hasImages" class="relative flex flex-col items-center mt-6">
              <!-- Main Large Image View with Animation -->
              <div class="relative w-full max-w-3xl overflow-hidden h-96">
                <transition name="fade-slide" mode="out-in">
                  <img
                    :src="selectedProject.images[currentImageIndex].url"
                    class="absolute inset-0 object-cover w-full transition-all duration-500 rounded-lg shadow-lg h-96"
                  />
                </transition>

                <!-- Navigation Buttons -->
                <button
                  @click="prevImage"
                  class="absolute p-2 text-white transform -translate-y-1/2 rounded-full left-4 top-1/2 bg-black/50"
                >
                  <
                </button>
                <button
                  @click="nextImage"
                  class="absolute p-2 text-white transform -translate-y-1/2 rounded-full right-4 top-1/2 bg-black/50"
                >
                  >
                </button>
              </div>

              <!-- Thumbnail Images -->
              <div class="flex gap-2 mt-4 overflow-x-auto">
                <img
                  v-for="(img, index) in selectedProject.images"
                  :key="index"
                  :src="img"
                  class="object-cover w-10 h-10 transition duration-200 border-2 rounded-md cursor-pointer"
                  :class="{ 'border-blue-400': selectedImage === img }"
                  @click="openImage(img, index)"
                />
              </div>
            </div>

            <p class="mt-6 text-center text-gray-300">
              {{ selectedProject.description }}
            </p>
          </div>
        </transition>
      </div>
    </transition>
  </section>
</template>

<style>
/* Project Card Styling */
.project-card {
  @apply bg-black/20 p-4 rounded-lg shadow-lg transition-all transform duration-300 hover:scale-105 hover:shadow-xl relative flex flex-col;
}

/* Image Styling */
.project-image {
  @apply w-full h-48 object-cover rounded-md;
  object-fit: cover;
}

/* Full Page Modal Styling */
.modal {
  @apply fixed inset-0 flex items-center justify-center bg-black/75 p-6;
}

/* Modal Content */
.modal-content {
  @apply bg-gray-900 p-6 rounded-lg max-w-screen-lg w-full h-[90vh] overflow-y-auto text-white;
}

/* Image Gallery */
.modal img {
  transition: transform 0.2s ease-in-out;
}

.modal img:hover {
  transform: scale(1.05);
}

.modal::-webkit-scrollbar {
  display: none; /* Hides scrollbar in Chrome/Safari */
}

.modal {
  scrollbar-width: none; /* Hides scrollbar in Firefox */
  -ms-overflow-style: none; /* Hides scrollbar in IE/Edge */
  overflow-y: auto; /* Keeps content scrollable */
}
/* Fix Slide Animation - No Jumping */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition:
    opacity 0.5s ease-in-out,
    transform 0.5s ease-in-out;
  position: absolute; /* Ensures smooth transition */
  width: 100%;
  height: 100%;
}

/* Image enters from right */
.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

/* Image exits to left */
.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}

/* ✅ Fade-in & Fade-out Animation */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* ✅ Slide-up Effect for Modal Content */
.slide-up-enter-active,
.slide-up-leave-active {
  transition:
    transform 0.4s ease,
    opacity 0.4s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>
