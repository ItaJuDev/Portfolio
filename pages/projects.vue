<script setup>
const projectCategories = [
  {
    category: "Game Development",
    projects: [
      {
        title: "12TailsOnline Server",
        image: "/12TailsPoster.jpg",
        link: "#",
        description: "A multiplayer online game server.",
      },
      {
        title: "Math Related",
        image: "/MathRelateGame.png",
        link: "#",
        description: "An educational math-based game.",
      },
      {
        title: "VR Experiment",
        image: "/VrGame.png",
        link: "#",
        description: "A virtual reality game experiment.",
      },
    ],
  },
  {
    category: "Web Development",
    projects: [
      {
        title: "AZ Mirror",
        image: "/AZMirror.png",
        link: "#",
        description: "3D model viewer for startups.",
      },
      {
        title: "Trading Reward",
        image: "/TradingReward.png",
        link: "#",
        description: "A web platform for tracking rewards.",
      },
    ],
  },
  {
    category: "Mobile Applications",
    projects: [
      {
        title: "TrackIt",
        image: "/TrackIt.png",
        link: "#",
        description: "A mobile app for tracking expenses.",
      },
    ],
  },
];
</script>

<template>
  <section class="container mx-auto py-12 px-6 text-white max-w-5xl">
    <h2 class="text-5xl font-bold text-center mb-8 py-16">My Works</h2>

    <div
      v-for="category in projectCategories"
      :key="category.category"
      class="mb-12"
    >
      <!-- Category Title -->
      <h3 class="text-3xl font-semibold mb-6 border-b-2 border-gray-500 pb-2">
        {{ category.category }}
      </h3>

      <!-- Project Grid for Each Category -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="project in category.projects"
          :key="project.title"
          class="project-card group"
        >
          <img :src="project.image" alt="Project image" class="project-image" />
          <div class="p-4 flex flex-col justify-between h-full">
            <div>
              <h4 class="text-xl font-bold">{{ project.title }}</h4>
              <p class="text-gray-400 text-sm mt-2">
                {{ project.description }}
              </p>
            </div>
            <!-- View Details Positioned to the Right -->
            <NuxtLink
              :to="project.link"
              class="text-green-400 hover:underline mt-2 inline-block text-sm text-right block"
            >
              View Details →
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
/* Project Card Hover Effect */
.project-card {
  @apply bg-black/20 p-4 rounded-lg shadow-lg transition-all transform duration-300 hover:scale-105 hover:shadow-xl relative overflow-hidden;
}

/* Improve Image Quality */
.project-image {
  @apply w-full h-48 object-cover rounded-md;
  image-rendering: auto; /* Ensures high-quality image scaling */
}

/* Glowing Effect on Hover */
.project-card::before {
  content: "";
  position: absolute;
  inset: 0;
  background: radial-gradient(circle, rgba(0, 150, 255, 0.2), transparent);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.project-card:hover::before {
  opacity: 1;
}
</style>
