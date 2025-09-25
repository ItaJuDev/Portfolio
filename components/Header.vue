<script setup>
import { ref, onMounted, onUnmounted } from "vue";
const links = [{ name: "projects", path: "/projects" }];
const isVisible = ref(true);
let lastScrollY = 0;

// Function to track scroll
const handleScroll = () => {
  const currentScrollY = window.scrollY;
  isVisible.value = currentScrollY < lastScrollY || currentScrollY < 50;
  lastScrollY = currentScrollY;
};

// Add event listener when mounted
onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

// Remove event listener when unmounted
onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <header
    :class="[
      'fixed top-0 max-w-6xl w-full  backdrop-blur-lg text-white py-2 px-6 md:px-10 flex justify-between items-center z-50 shadow-md mx-auto left-0 right-0 transition-transform duration-300',
      isVisible ? 'translate-y-0' : '-translate-y-full',
    ]"
  >
    <!-- Left: Logo -->
    <NuxtLink to="/" class="text-lg font-bold text-blue-400 transition hover:text-gray-100"> junior. </NuxtLink>

    <!-- Right: Navigation Links -->
    <ul class="flex space-x-4">
      <li v-for="link in links" :key="link.name">
        <NuxtLink :to="link.path" class="font-medium text-gray-300 transition hover:text-white">
          {{ link.name }}
        </NuxtLink>
      </li>
    </ul>
  </header>
</template>
