<template>
  <div class="relative flex flex-col gap-6 py-16 w-full max-w-5xl mx-auto">
    <!-- Title & Description (Aligned Left) -->
    <h2 class="text-5xl font-bold text-white">Contact</h2>
    <p class="text-gray-400 text-left">I would like to work with you...</p>

    <!-- Contact Links (Centered) -->
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
      <!-- LinkedIn -->
      <a
        href="https://www.linkedin.com/in/vitit-charubencharat/"
        target="_blank"
        class="contact-box"
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center space-x-4">
            <img
              src="https://skillicons.dev/icons?i=linkedin"
              alt="LinkedIn"
              class="w-8 h-8"
            />
            <p class="text-lg font-semibold text-white">LinkedIn</p>
          </div>
          <span class="arrow">→</span>
        </div>
      </a>

      <!-- Gmail -->
      <a href="mailto:vitit.charubencharat@gmail.com" class="contact-box">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center space-x-4">
            <img
              src="https://skillicons.dev/icons?i=gmail"
              alt="Gmail"
              class="w-8 h-8"
            />
            <p class="text-lg font-semibold text-white">Gmail</p>
          </div>
          <span class="arrow">→</span>
        </div>
      </a>

      <!-- GitHub -->
      <a href="https://github.com/ItaJuDev" target="_blank" class="contact-box">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center space-x-4">
            <img
              src="https://skillicons.dev/icons?i=github"
              alt="GitHub"
              class="w-8 h-8"
            />
            <p class="text-lg font-semibold text-white">GitHub</p>
          </div>
          <span class="arrow">→</span>
        </div>
      </a>

      <!-- Discord -->
      <a
        href="https://discord.com/users/408995873587068928"
        target="_blank"
        class="contact-box"
      >
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center space-x-4">
            <img
              src="https://skillicons.dev/icons?i=discord"
              alt="Discord"
              class="w-8 h-8"
            />
            <p class="text-lg font-semibold text-white">Discord</p>
          </div>
          <span class="arrow">→</span>
        </div>
      </a>
    </div>
  </div>
</template>

<style>
/* Contact Box Styling */
.contact-box {
  @apply flex bg-black/20 rounded-lg p-4 w-full max-w-sm shadow-md 
         hover:bg-black/30 transition transform hover:scale-105 hover:shadow-lg;
  transition: all 0.3s ease-in-out;
}

/* Arrow Animation */
.contact-box .arrow {
  @apply text-gray-400 transition-transform duration-300;
}

.contact-box:hover .arrow {
  transform: translateX(5px);
}
</style>
