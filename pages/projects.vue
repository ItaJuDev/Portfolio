<script setup>
import { ref } from "vue";

const projectCategories = [
  {
    category: "Game Development",
    projects: [
      {
        title: "12TailsOnline Server",
        image: "/12TailsOnline/12TailsPoster.jpg",
        description: "A multiplayer online game server.",
        shortTalk:
          "Hi there! I'm just developing a game server for 12TailsOnline for learning something new, and I'm loving this game since it published in 2011. I never find the game make me fun and happy like this game. So I decided to make a server for this game. I hope it will be the Dream server for every one because I developed it with my love <3.",
        video: "https://www.youtube.com/embed/P8xABk6rdns",
        images: [
          "/12TailsOnline/1.png",
          "/12TailsOnline/2.png",
          "/12TailsOnline/3.png",
          "/12TailsOnline/4.png",
          "/12TailsOnline/5.png",
        ],
      },
      {
        title: "HeroBois",
        image: "/HeroBois.png",
        description: "An educational math-based game.",
        shortTalk: "A fun game designed to improve skill in rouge-like games",
        video: "https://www.youtube.com/embed/MbqKK-7Fmko",
      },
      {
        title: "VR Experiment",
        image: "/VrGame.png",
        description: "A virtual reality game experiment.",
        shortTalk:
          "Exploring the future of gaming with VR, providing an immersive experience.",
        video: "https://www.youtube.com/embed/k0ZGAGonSXU",
      },
    ],
  },
  {
    category: "Web Development",
    projects: [
      {
        title: "AZ Mirror",
        image: "/AZMirror.png",
        description: "3D model viewer for startups.",
        shortTalk:
          "A web app that allows users to preview and interact with 3D models in real time.",
        video: "https://www.youtube.com/embed/example-video",
      },
      {
        title: "Trading Reward",
        image: "/TradingReward.png",
        description: "A web platform for tracking rewards.",
        shortTalk:
          "Helping businesses manage and track their customer reward programs efficiently.",
        video: "",
      },
    ],
  },
  {
    category: "Mobile Applications",
    projects: [
      {
        title: "TrackIt",
        image: "/TrackIt.png",
        description: "A mobile app for tracking expenses.",
        shortTalk: "A simple and intuitive app for managing personal finances.",
        video: "https://www.youtube.com/embed/7nfjNrI96BA",
      },
    ],
  },
];

// Store the currently selected project for the modal
const selectedProject = ref(null);
const openModal = (project) => {
  selectedProject.value = project;
};

const closeModal = () => {
  selectedProject.value = null;
};

// ** Image Lightbox Variables **
const selectedImage = ref(null);
const currentImageIndex = ref(0);

// Handle opening an image in the slider
const openImage = (image, index) => {
  selectedImage.value = image;
  currentImageIndex.value = index;
};

// Handle next image in the slider
const nextImage = () => {
  if (selectedProject.value) {
    currentImageIndex.value =
      (currentImageIndex.value + 1) % selectedProject.value.images.length;
    selectedImage.value = selectedProject.value.images[currentImageIndex.value];
  }
};

// Handle previous image in the slider
const prevImage = () => {
  if (selectedProject.value) {
    currentImageIndex.value =
      (currentImageIndex.value - 1 + selectedProject.value.images.length) %
      selectedProject.value.images.length;
    selectedImage.value = selectedProject.value.images[currentImageIndex.value];
  }
};
</script>

<template>
  <section class="container mx-auto py-12 px-6 text-white max-w-5xl">
    <h2 class="text-5xl font-bold text-center mb-8 py-16">My Works</h2>

    <div
      v-for="category in projectCategories"
      :key="category.category"
      class="mb-12"
    >
      <h3 class="text-3xl font-semibold mb-6 border-b-2 border-gray-500 pb-2">
        {{ category.category }}
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in category.projects"
          :key="project.title"
          class="project-card group cursor-pointer"
          @click="openModal(project)"
        >
          <img :src="project.image" alt="Project image" class="project-image" />
          <div class="p-4 flex flex-col justify-between h-full">
            <div>
              <h4 class="text-xl font-bold">{{ project.title }}</h4>
              <p class="text-gray-400 text-sm mt-2">
                {{ project.description }}
              </p>
            </div>
            <button
              class="text-green-400 hover:underline mt-2 text-sm text-right block"
            >
              View Details →
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Full Page Modal for Project Details -->
    <transition name="fade-scale">
      <div
        v-if="selectedProject"
        class="fixed inset-0 flex justify-center items-center p-4 z-50"
      >
        <transition name="slide-up">
          <div
            class="bg-[#0a192f] p-6 rounded-lg max-w-screen-lg w-full h-[90vh] overflow-hidden relative"
          >
            <button
              @click="closeModal"
              class="absolute top-2 right-4 text-red-400 hover:underline"
            >
              ✖ Close
            </button>

            <h3 class="text-3xl font-bold mb-4 text-center">
              {{ selectedProject.title }}
            </h3>

            <div class="flex flex-col md:flex-row gap-6">
              <!-- Video -->
              <div
                v-if="selectedProject.video"
                class="mb-10 w-full md:w-1/2 relative"
              >
                <iframe
                  v-if="selectedProject.video.includes('youtube.com')"
                  :src="selectedProject.video"
                  class="w-full h-60 rounded-lg"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                ></iframe>

                <video v-else controls class="w-full h-52 rounded-lg">
                  <source :src="selectedProject.video" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>

              <div class="flex flex-col w-full md:w-1/2 py-16">
                <!-- Short Talk -->
                <p
                  v-if="selectedProject.shortTalk"
                  class="text-1xl text-gray-400 bold text-center mb-4 items-center"
                >
                  "{{ selectedProject.shortTalk }}"
                </p>
              </div>
            </div>

            <!-- Animated Image Gallery with Slider -->
            <div
              v-if="selectedProject.images && selectedProject.images.length > 0"
              class="relative flex flex-col items-center mt-6"
            >
              <!-- Main Large Image View with Animation -->
              <div class="relative w-full max-w-3xl h-96 overflow-hidden">
                <transition name="fade-slide" mode="out-in">
                  <img
                    :key="selectedImage"
                    :src="selectedImage || selectedProject.images[0]"
                    class="absolute inset-0 w-full h-96 object-cover rounded-lg shadow-lg transition-all duration-500"
                  />
                </transition>

                <!-- Navigation Buttons -->
                <button
                  @click="prevImage"
                  class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
                >
                  <
                </button>
                <button
                  @click="nextImage"
                  class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full"
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
                  class="w-10 h-10 object-cover rounded-md cursor-pointer border-2 transition duration-200"
                  :class="{ 'border-blue-400': selectedImage === img }"
                  @click="openImage(img, index)"
                />
              </div>
            </div>

            <p class="text-gray-300 mt-6 text-center">
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
