import { readBody } from 'h3';
import { readProjects, writeProjects } from '../../utils/projects';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const projects = await readProjects();
  const newProject = { id: Date.now(), ...body };
  projects.push(newProject);
  await writeProjects(projects);
  return newProject;
});
