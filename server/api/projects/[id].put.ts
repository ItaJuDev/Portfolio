import { readBody } from 'h3';
import { readProjects, writeProjects } from '../../utils/projects';

export default defineEventHandler(async (event) => {
  const id = Number(event.context.params?.id);
  const body = await readBody(event);
  const projects = await readProjects();
  const index = projects.findIndex((p: any) => p.id === id);
  if (index === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Project not found' });
  }
  projects[index] = { ...projects[index], ...body, id };
  await writeProjects(projects);
  return projects[index];
});
