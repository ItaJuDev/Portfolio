<script setup>
import { ref, computed } from "vue";
import { useSkills } from "~/composables/usePortfolio";

const activeTab = ref("frontend");
const { grouped, pending, error } = useSkills();

const currentSkills = computed(() => grouped.value?.[activeTab.value] || []);
</script>

<template>
  <div class="py-16 relative">
    <h2 class="text-5xl font-bold mb-6 text-white">Skills</h2>
    <p class="left-1 text-gray-400 mb-8">
      Tools and technologies I enjoy working with
    </p>

    <!-- Tabs -->
    <div class="flex justify-center space-x-4">
      <button
        @click="activeTab = 'frontend'"
        :class="
          activeTab === 'frontend'
            ? 'bg-blue-400 text-black'
            : 'bg-gray-700 text-gray-300'
        "
        class="px-6 py-2 rounded-lg hover:bg-blue-400 hover:text-black transition"
      >
        Frontend
      </button>
      <button
        @click="activeTab = 'backend'"
        :class="
          activeTab === 'backend'
            ? 'bg-blue-400 text-black'
            : 'bg-gray-700 text-gray-300'
        "
        class="px-6 py-2 rounded-lg hover:bg-blue-400 hover:text-black transition"
      >
        Backend
      </button>
      <button
        @click="activeTab = 'others'"
        :class="
          activeTab === 'others'
            ? 'bg-blue-400 text-black'
            : 'bg-gray-700 text-gray-300'
        "
        class="px-6 py-2 rounded-lg hover:bg-blue-400 hover:text-black transition"
      >
        Others
      </button>
    </div>

    <!-- Skills Content -->
    <div class="relative mt-6 flex justify-center">
      <div class="w-full max-w-3xl relative">
        <transition name="fade-scale" mode="out-in">
          <div
            v-if="!pending && !error"
            :key="activeTab"
            class="flex flex-wrap justify-center gap-4 bg-black/20 p-6 rounded-lg shadow-lg"
          >
            <div
              v-for="skill in currentSkills"
              :key="skill.id || skill.name"
              class="relative group flex flex-col items-center"
            >
              <!-- Skill Info (Above Icon) -->
              <p
                class="absolute -top-10 text-sm text-gray-300 bg-black/20 px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                {{ skill.name }}
              </p>

              <!-- Enlarging Skill Icon on Hover -->
              <img
                :src="`https://skillicons.dev/icons?i=${skill.icon || ''}`"
                class="w-12 h-12 transition-transform duration-300 group-hover:scale-125"
              />
            </div>
          </div>
        </transition>
        <div v-if="pending" class="text-center text-gray-400 py-8">
          Loading skills...
        </div>
        <div v-if="error" class="text-center text-red-400 py-8">
          Failed to load skills. Check Supabase config.
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* Smooth Fade + Scale Animation */
.fade-scale-enter-active,
.fade-scale-leave-active {
  transition:
    opacity 0.4s ease,
    transform 0.4s ease;
}

.fade-scale-enter-from,
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.fade-scale-enter-to,
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
