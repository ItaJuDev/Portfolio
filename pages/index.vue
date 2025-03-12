<script setup>
import Main from "@/components/Main.vue";
import Works from "@/components/Works.vue";
import Skills from "@/components/Skills.vue";
import Contact from "@/components/Contact.vue";
</script>

<template>
  <section
    class="min-h-screen flex flex-col justify-between bg-[#0a192f] text-white px-6 md:px-16 pt-20"
  >
    <div class="max-w-5xl w-full flex-grow px-4 mx-auto">
      <Main />
      <Works />
      <Skills />
      <Contact />
    </div>
  </section>
</template>

<style>
/* Animated Background */
.animated-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background:
    radial-gradient(circle at 30% 30%, rgba(0, 150, 255, 0.15), transparent),
    radial-gradient(circle at 70% 70%, rgba(255, 0, 150, 0.1), transparent),
    radial-gradient(circle at 50% 50%, rgba(255, 255, 0, 0.08), transparent);
  animation: moveBg 10s infinite alternate ease-in-out;
}

/* Movement Animation */
@keyframes moveBg {
  0% {
    transform: translateX(-10px) translateY(-10px);
  }
  50% {
    transform: translateX(10px) translateY(10px) scale(1.1);
  }
  100% {
    transform: translateX(-10px) translateY(-10px);
  }
}
</style>
