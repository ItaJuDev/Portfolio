<script setup>
import { computed } from "vue";
import { useContacts } from "~/composables/usePortfolio";

const { contacts, pending, error } = useContacts();

const items = computed(() => contacts.value || []);

const iconUrl = (icon, type) => {
  const src = icon || type || "link";
  if (!src) return "https://skillicons.dev/icons?i=link";
  if (/^https?:\/\//.test(src)) return src; // absolute URL
  return `https://skillicons.dev/icons?i=${encodeURIComponent(src)}`;
};
</script>

<template>
  <div class="relative flex flex-col gap-6 py-16 w-full max-w-5xl mx-auto">
    <h2 class="text-5xl font-bold text-white">Contact</h2>
    <p class="text-gray-400 text-left">I would like to work with you...</p>

    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-4 justify-center">
      <div v-if="pending" class="text-gray-400">Loading contacts...</div>
      <div v-else-if="error" class="text-red-400">Failed to load contacts.</div>
      <template v-else>
        <a
          v-for="c in items"
          :key="c.id"
          :href="c.url || '#'"
          target="_blank"
          class="contact-box"
        >
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center space-x-4">
              <img :src="iconUrl(c.icon, c.type)" :alt="c.label || c.type || 'contact'" class="w-8 h-8" />
              <p class="text-lg font-semibold text-white">{{ c.label || c.type || 'Contact' }}</p>
            </div>
            <span class="arrow">→</span>
          </div>
        </a>

        <!-- Optional empty-state fallback if table has no rows -->
        <div v-if="items.length === 0" class="text-gray-400">
          No contact links yet.
        </div>
      </template>
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
