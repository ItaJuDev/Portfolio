import { readProjects } from '../../utils/projects';

export default defineEventHandler(async () => {
  return await readProjects();
});
