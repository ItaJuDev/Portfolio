<script setup>
import Header from "./components/Header.vue";
import Footer from "@/components/Footer.vue";
</script>

<template>
  <title>ItaJuDev Portfolio</title>
  <div class="bg-black text-white font-sans">
    <div class="relative w-full min-h-screen bg-[#0a192f] overflow-hidden">
      <!-- Animated Background (non-interactive, always behind content) -->
      <div class="absolute inset-0 -z-10 pointer-events-none">
        <div class="animated-bg"></div>
      </div>

      <Header />
      <div class="relative z-10">
        <NuxtPage />
      </div>
      <Footer />

      <!-- Page Content (Everything inside will stay on top) -->
      <div class="relative z-10 max-w-5xl mx-auto px-6 md:px-16">
        <slot />
      </div>
    </div>
  </div>
</template>

<style>
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
/* Global background to prevent white flashes during overscroll */
html,
body,
#__nuxt {
  background-color: #0a192f;
  min-height: 100%;
}

/* Improve dark feel on mobile chrome/safari and reduce scroll chaining */
html,
body {
  color-scheme: dark;
  overscroll-behavior-y: none;
  overscroll-behavior-x: none;
}
/* Darker Animated Background */
.animated-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 20% 20%, rgba(0, 50, 150, 0.15), transparent),
    radial-gradient(circle at 80% 80%, rgba(50, 0, 100, 0.15), transparent),
    radial-gradient(circle at 50% 50%, rgba(100, 0, 150, 0.1), transparent);
  animation: moveBg 12s infinite alternate ease-in-out;
  filter: brightness(0.7); /* Makes it slightly darker */

  pointer-events: none; /* 👈 This makes sure clicks go through */
  z-index: -1; /* 👈 Moves background behind content */
}

/* Subtle Movement Animation */
@keyframes moveBg {
  0% {
    transform: translateX(-15px) translateY(-15px);
  }
  50% {
    transform: translateX(15px) translateY(15px) scale(1.05);
  }
  100% {
    transform: translateX(-15px) translateY(-15px);
  }
}

/* Global Page Transition */
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.5s ease,
    transform 0.5s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
