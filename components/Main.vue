<template>
  <div
    class="relative flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-10 py-16"
  >
    <!-- Left Side: Name & Description -->
    <div class="flex-2">
      <h1 class="text-5xl font-bold text-white">
        Hi, I'm <span class="text-gray-300">Vitit Charubencharat</span>
      </h1>
      <h2 class="text-3xl text-blue-400 mt-2">Software Developer</h2>
      <p class="text-lg text-gray-400 mt-3">
        Passionate about building digital experiences.
      </p>
    </div>

    <!-- Right Side: Profile Image -->
    <div class="relative w-56 h-56 flex-1 flex justify-center md:justify-end">
      <div
        class="absolute w-56 h-56 rounded-full bg-blue-400 opacity-10 blur-3xl animate-pulse"
      ></div>
      <img
        src="/profile.jpg"
        alt="Profile Image"
        class="relative w-52 h-52 object-cover rounded-full border-4 border-gray-500 shadow-lg"
      />
    </div>
  </div>
</template>
