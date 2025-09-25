<script setup lang="ts">
import { ref, computed } from "vue";
import { useProjects } from "~/composables/usePortfolio";

const { byCategory, pending, error } = useProjects();

// Store the currently selected project for the modal
const selectedProject = ref<any | null>(null);
const openModal = (project: any) => {
  selectedProject.value = project;
  // Initialize gallery state
  currentImageIndex.value = 0;
};

const closeModal = () => {
  selectedProject.value = null;
  currentImageIndex.value = 0;
};

// Media slider (images + optional video)
const currentImageIndex = ref(0);

type MediaItem = { type: "image" | "youtube" | "video"; src: string };

const gallery = computed<MediaItem[]>(() => {
  const items: MediaItem[] = [];
  const p = selectedProject.value as any | null;
  if (!p) return items;
  if (p.video) {
    const v: string = p.video as string;
    const isYouTube = v.includes("youtube.com") || v.includes("youtu.be");
    items.push({ type: isYouTube ? "youtube" : "video", src: v });
  }
  if (Array.isArray(p.images)) {
    for (const img of p.images) {
      if (img) items.push({ type: "image", src: String(img) });
    }
  }
  return items;
});

const hasMedia = computed(() => gallery.value.length > 0);

const nextImage = () => {
  if (!hasMedia.value) return;
  const len = gallery.value.length;
  currentImageIndex.value = (currentImageIndex.value + 1) % len;
};

const prevImage = () => {
  if (!hasMedia.value) return;
  const len = gallery.value.length;
  currentImageIndex.value = (currentImageIndex.value - 1 + len) % len;
};

const goToImage = (index: number) => {
  if (!hasMedia.value) return;
  const len = gallery.value.length;
  if (index < 0 || index >= len) return;
  currentImageIndex.value = index;
};
</script>

<template>
  <section class="container max-w-5xl px-6 py-12 mx-auto text-white">
    <h2 class="py-16 mb-8 text-5xl font-bold text-center">My Works</h2>

    <div v-if="pending" class="py-8">
      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 6" :key="i" class="p-4 rounded-2xl bg-white/5 ring-1 ring-white/10 animate-pulse">
          <div class="w-full h-48 mb-4 bg-white/10 rounded-xl"></div>
          <div class="h-5 mb-2 bg-white/10 rounded"></div>
          <div class="h-4 bg-white/10 rounded w-2/3"></div>
        </div>
      </div>
    </div>
    <div v-else-if="error" class="py-16 text-center text-red-400">Failed to load projects. Check Supabase config.</div>

    <div v-else v-for="category in byCategory" :key="category.category" class="mb-12">
      <h3 class="pb-2 mb-6 text-3xl font-semibold border-b-2 border-gray-500">
        {{ category.category }}
      </h3>

      <div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="project in category.projects"
          :key="project.title"
          class="relative overflow-hidden cursor-pointer group"
          @click="openModal(project)"
        >
          <!-- Decorative gradient border wrapper -->
          <div class="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-400/20 via-blue-400/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition" />

          <div class="relative p-0.5 rounded-2xl ring-1 ring-white/10 bg-white/5 backdrop-blur-sm">
            <div class="relative overflow-hidden rounded-[1rem]">
              <img
                :src="project.image"
                alt="Project image"
                class="object-cover w-full h-48 transition duration-500 scale-100 group-hover:scale-105"
              />

              <!-- Top-right video badge if project has video -->
              <div v-if="project.video" class="absolute px-2 py-1 text-xs rounded-full top-2 right-2 bg-black/60 backdrop-blur text-white">
                <i class="mr-1 fas fa-play"></i> Video
              </div>

              <!-- Bottom gradient overlay -->
              <div class="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/70 to-transparent" />

              <!-- Content -->
              <div class="absolute inset-x-0 bottom-0 p-4">
                <h4 class="text-lg font-semibold">{{ project.title }}</h4>
                <p class="mt-1 text-sm text-gray-300 line-clamp-2">{{ project.description }}</p>

                <div class="flex items-center justify-end mt-3">
                  <span
                    class="inline-flex items-center gap-1 text-sm text-teal-300/90 group-hover:text-teal-200 transition"
                  >
                    View Details <i class="text-xs fas fa-arrow-right"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Page Modal for Project Details -->
    <transition name="fade-scale">
      <div
        v-if="selectedProject"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      >
        <transition name="slide-up">
          <div
            class="bg-[#0b1220]/95 backdrop-blur-md p-6 md:p-8 rounded-3xl shadow-2xl ring-1 ring-white/10 max-w-screen-xl w-full h-[92vh] overflow-hidden relative"
          >
            <button
              @click="closeModal"
              class="absolute inline-flex items-center justify-center w-10 h-10 text-white transition rounded-full top-4 right-4 bg-white/10 hover:bg-white/20"
              aria-label="Close"
            >
              <i class="fas fa-times"></i>
            </button>

            <h3
              class="mb-2 text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-blue-300 to-purple-300"
            >
              {{ selectedProject.title }}
            </h3>

            <p v-if="selectedProject.short_talk" class="mb-6 italic text-center text-gray-300">
              "{{ selectedProject.short_talk }}"
            </p>

            <!-- Unified Media Slider (Video + Images) -->
            <div v-if="hasMedia" class="relative flex flex-col items-center mt-2">
              <div
                class="relative w-full max-w-5xl h-[60vh] md:h-[65vh] overflow-hidden rounded-3xl ring-1 ring-white/10 shadow-2xl bg-black/20"
              >
                <transition name="fade-slide" mode="out-in">
                  <div :key="currentImageIndex" class="absolute inset-0">
                    <img
                      v-if="gallery[currentImageIndex]?.type === 'image'"
                      :src="gallery[currentImageIndex].src"
                      class="absolute inset-0 object-cover w-full h-full"
                    />
                    <iframe
                      v-else-if="gallery[currentImageIndex]?.type === 'youtube'"
                      :src="gallery[currentImageIndex].src"
                      class="absolute inset-0 w-full h-full"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerpolicy="strict-origin-when-cross-origin"
                      allowfullscreen
                    ></iframe>
                    <video
                      v-else-if="gallery[currentImageIndex]?.type === 'video'"
                      controls
                      class="absolute inset-0 object-contain w-full h-full bg-black"
                    >
                      <source :src="gallery[currentImageIndex].src" type="video/mp4" />
                    </video>
                  </div>
                </transition>

                <!-- Navigation Buttons -->
                <button
                  @click="prevImage"
                  class="absolute p-3 text-white transform -translate-y-1/2 rounded-full left-4 top-1/2 bg-black/50 hover:bg-black/60"
                  aria-label="Previous"
                >
                  <i class="fas fa-chevron-left"></i>
                </button>
                <button
                  @click="nextImage"
                  class="absolute p-3 text-white transform -translate-y-1/2 rounded-full right-4 top-1/2 bg-black/50 hover:bg-black/60"
                  aria-label="Next"
                >
                  <i class="fas fa-chevron-right"></i>
                </button>
              </div>

              <!-- Dot Indicators -->
              <div class="flex items-center gap-3 mt-6">
                <button
                  v-for="(_, index) in gallery"
                  :key="index"
                  :aria-label="`Go to media ${index + 1}`"
                  @click="goToImage(index)"
                  class="relative transition"
                >
                  <span
                    class="block rounded-full"
                    :class="[
                      'w-2.5 h-2.5',
                      currentImageIndex === index
                        ? 'bg-gradient-to-r from-teal-300 to-blue-400 shadow-[0_0_0_5px_rgba(56,189,248,0.25)]'
                        : 'bg-white/50 hover:bg-white/80',
                    ]"
                  />
                </button>
              </div>
            </div>

            <p class="max-w-3xl mx-auto mt-6 text-center text-gray-300">
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
