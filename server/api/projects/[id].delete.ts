import { readProjects, writeProjects } from '../../utils/projects';

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
  const projects = await readProjects();
  const index = projects.findIndex((p: any) => p.id === id);
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' });
  }
  projects.splice(index, 1);
  await writeProjects(projects);
  return { success: true };
});
