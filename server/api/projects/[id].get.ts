import { readProjects } from '../../utils/projects';

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
  const projects = await readProjects();
  return projects.find((p: any) => p.id === id) || null;
});
