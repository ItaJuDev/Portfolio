<template>
  <div class="container py-16 mx-auto">
    <h2 class="mb-8 text-5xl font-bold text-white">Works</h2>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <!-- Work Experience -->
      <div class="p-6 border border-gray-600 rounded-lg shadow-lg bg-black/20 backdrop-blur-lg md:col-span-1">
        <h3 class="text-xl font-semibold text-gray-100">Company Experiences</h3>
        <ExperienceList />
      </div>

      <!-- Learning Projects -->
      <div
        class="flex flex-col p-6 border border-gray-600 rounded-lg shadow-lg bg-black/20 backdrop-blur-lg md:col-span-2"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-xl font-semibold text-gray-100">Learning Projects</h3>

          <!-- More Work Button (Navigate to /projects) -->
          <button
            @click="$router.push('/projects')"
            class="flex items-center gap-1 text-sm text-blue-400 hover:underline"
          >
            More Work →
          </button>
        </div>

        <div class="mt-4 space-y-4">
          <!-- TrackIt -->
          <a href="https://github.com/ItaJuDev/TrackIt" class="block hover-box">
            <div class="p-4 transition-all rounded-lg">
              <p class="font-bold text-gray-200">TrackIt</p>
              <p class="text-sm text-gray-400">A simple Flutter app to track income & expenses with a simple UI.</p>
              <div class="flex mt-2 space-x-2">
                <span class="flex items-center gap-1 px-2 py-1 text-xs bg-blue-500 rounded-full">
                  <img src="https://skillicons.dev/icons?i=flutter" class="w-4 h-4" />
                  Flutter
                </span>

                <span class="flex items-center gap-1 px-2 py-1 text-xs bg-blue-400 rounded-full">
                  <img src="https://skillicons.dev/icons?i=dart" class="w-4 h-4" />
                  Dart
                </span>
              </div>
            </div>
          </a>

          <!-- AZ Mirror -->
          <a href="https://github.com/ItaJuDev/AZMirror" class="block hover-box">
            <div class="p-4 transition-all rounded-lg">
              <p class="font-bold text-gray-200">AZ Mirror - JavaScript</p>
              <p class="text-sm text-gray-400">A JavaScript app for showing the 3D model for startup business.</p>
              <div class="flex mt-2 space-x-2">
                <span class="flex items-center gap-1 px-2 py-1 text-xs bg-yellow-600 rounded-full">
                  <img src="https://skillicons.dev/icons?i=javascript" class="w-4 h-4" />
                  JavaScript
                </span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Hover Animation for Project Boxes */
.hover-box {
  display: block;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease,
    background 0.3s ease;
}

.hover-box:hover {
  transform: translateY(-5px) scale(1.03);
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0px 4px 20px rgba(0, 150, 255, 0.3);
}
</style>
