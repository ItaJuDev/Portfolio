<script setup lang="ts">
import { ref, onMounted } from 'vue';

const password = ref('');
const isAuthed = ref(false);
const projects = ref([]);

const fetchProjects = async () => {
  projects.value = await $fetch('/api/projects');
};

onMounted(() => {
  if (localStorage.getItem('admin-authed') === 'true') {
    isAuthed.value = true;
    fetchProjects();
  }
});

const login = async () => {
  const res = await $fetch('/api/auth', { method: 'POST', body: { password: password.value } });
  if (res.success) {
    isAuthed.value = true;
    localStorage.setItem('admin-authed', 'true');
    fetchProjects();
  } else {
    alert('Wrong password');
  }
};

const newProject = ref({
  title: '',
  category: '',
  image: '',
  description: '',
  shortTalk: '',
  video: '',
  images: ''
});

const createProject = async () => {
  const payload = { ...newProject.value, images: newProject.value.images.split(',').map((v: string) => v.trim()).filter(Boolean) };
  await $fetch('/api/projects', { method: 'POST', body: payload });
  Object.assign(newProject.value, { title: '', category: '', image: '', description: '', shortTalk: '', video: '', images: '' });
  fetchProjects();
};

const updateProject = async (p: any) => {
  const payload = { ...p, images: typeof p.images === 'string' ? p.images.split(',').map((v: string) => v.trim()).filter(Boolean) : p.images };
  await $fetch(`/api/projects/${p.id}`, { method: 'PUT', body: payload });
  fetchProjects();
};

const deleteProject = async (id: number) => {
  await $fetch(`/api/projects/${id}`, { method: 'DELETE' });
  fetchProjects();
};
</script>

<template>
  <section class="p-8 text-white max-w-3xl mx-auto">
    <div v-if="!isAuthed" class="space-y-4">
      <h1 class="text-2xl font-bold">Admin Login</h1>
      <input v-model="password" type="password" placeholder="Password" class="p-2 text-black w-full" />
      <button @click="login" class="bg-blue-500 px-4 py-2 rounded text-white">Login</button>
    </div>

    <div v-else>
      <h1 class="text-2xl font-bold mb-4">Manage Projects</h1>

      <div class="mb-8 space-y-2">
        <h2 class="font-semibold">Add New Project</h2>
        <input v-model="newProject.title" placeholder="Title" class="p-1 text-black w-full" />
        <input v-model="newProject.category" placeholder="Category" class="p-1 text-black w-full" />
        <input v-model="newProject.image" placeholder="Image" class="p-1 text-black w-full" />
        <input v-model="newProject.description" placeholder="Description" class="p-1 text-black w-full" />
        <input v-model="newProject.shortTalk" placeholder="Short Talk" class="p-1 text-black w-full" />
        <input v-model="newProject.video" placeholder="Video" class="p-1 text-black w-full" />
        <input v-model="newProject.images" placeholder="Images (comma separated)" class="p-1 text-black w-full" />
        <button @click="createProject" class="bg-green-600 px-3 py-1 rounded text-white">Create</button>
      </div>

      <div v-for="p in projects" :key="p.id" class="border-b border-gray-600 pb-4 mb-4 space-y-1">
        <input v-model="p.title" class="p-1 text-black w-full" />
        <input v-model="p.category" class="p-1 text-black w-full" />
        <input v-model="p.image" class="p-1 text-black w-full" />
        <input v-model="p.description" class="p-1 text-black w-full" />
        <input v-model="p.shortTalk" class="p-1 text-black w-full" />
        <input v-model="p.video" class="p-1 text-black w-full" />
        <input v-model="p.images" class="p-1 text-black w-full" />
        <div class="space-x-2 mt-2">
          <button @click="updateProject(p)" class="bg-yellow-600 px-3 py-1 rounded text-white">Save</button>
          <button @click="deleteProject(p.id)" class="bg-red-600 px-3 py-1 rounded text-white">Delete</button>
        </div>
      </div>
    </div>
  </section>
</template>
