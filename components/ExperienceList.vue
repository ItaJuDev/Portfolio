<script setup>
import { computed } from "vue";
import { useExperiences } from "~/composables/usePortfolio";

const { experiences, pending, error } = useExperiences();

const fmt = (iso) => (iso ? new Date(iso).toLocaleDateString() : "Present");
const hasData = computed(() => (experiences.value || []).length > 0);
</script>

<template>
  <div class="mt-4 space-y-4">
    <div v-if="pending" class="text-gray-400">Loading experiences...</div>
    <div v-else-if="error" class="text-red-400">Failed to load experiences.</div>
    <div v-else-if="!hasData" class="text-gray-400">No experiences yet.</div>

    <div v-else>
      <div v-for="exp in experiences" :key="exp.id" class="p-3 border border-gray-700 rounded-md bg-black/10">
        <p class="font-semibold text-gray-200">{{ exp.company }}</p>
        <p class="text-sm text-gray-400">{{ exp.role }}</p>
        <p class="text-xs text-gray-500">{{ fmt(exp.start_date) }} - {{ fmt(exp.end_date) }}</p>
        <p v-if="exp.description" class="mt-1 text-sm text-gray-400">{{ exp.description }}</p>
      </div>
    </div>
  </div>
</template>
