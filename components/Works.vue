<template>
  <div class="container mx-auto py-16">
    <h2 class="text-5xl font-bold mb-8 text-white">Works</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Work Experience -->
      <div
        class="bg-black/20 p-6 rounded-lg shadow-lg border border-gray-600 backdrop-blur-lg md:col-span-1"
      >
        <h3 class="text-xl font-semibold text-gray-100">Company Experiences</h3>
        <div class="mt-4 space-y-4">
          <p class="text-gray-400">Error 404 Not Found</p>
        </div>
      </div>

      <!-- Learning Projects -->
      <div
        class="bg-black/20 p-6 rounded-lg shadow-lg border border-gray-600 backdrop-blur-lg md:col-span-2 flex flex-col"
      >
        <div class="flex justify-between items-center">
          <h3 class="text-xl font-semibold text-gray-100">Learning Projects</h3>

          <!-- More Work Button (Navigate to /projects) -->
          <button
            @click="$router.push('/projects')"
            class="text-sm text-blue-400 hover:underline flex items-center gap-1"
          >
            More Work →
          </button>
        </div>

        <div class="mt-4 space-y-4">
          <!-- TrackIt -->
          <a href="https://github.com/ItaJuDev/TrackIt" class="block hover-box">
            <div class="p-4 rounded-lg transition-all">
              <p class="font-bold text-gray-200">TrackIt</p>
              <p class="text-gray-400 text-sm">
                A simple Flutter app to track income & expenses with a simple
                UI.
              </p>
              <div class="flex space-x-2 mt-2">
                <span
                  class="bg-blue-500 px-2 py-1 text-xs rounded-full flex items-center gap-1"
                >
                  <img
                    src="https://skillicons.dev/icons?i=flutter"
                    class="h-4 w-4"
                  />
                  Flutter
                </span>

                <span
                  class="bg-blue-400 px-2 py-1 text-xs rounded-full flex items-center gap-1"
                >
                  <img
                    src="https://skillicons.dev/icons?i=dart"
                    class="h-4 w-4"
                  />
                  Dart
                </span>
              </div>
            </div>
          </a>

          <!-- AZ Mirror -->
          <a
            href="https://github.com/ItaJuDev/AZMirror"
            class="block hover-box"
          >
            <div class="p-4 rounded-lg transition-all">
              <p class="font-bold text-gray-200">AZ Mirror - JavaScript</p>
              <p class="text-gray-400 text-sm">
                A JavaScript app for showing the 3D model for startup business.
              </p>
              <div class="flex space-x-2 mt-2">
                <span
                  class="bg-yellow-600 px-2 py-1 text-xs rounded-full flex items-center gap-1"
                >
                  <img
                    src="https://skillicons.dev/icons?i=javascript"
                    class="h-4 w-4"
                  />
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
