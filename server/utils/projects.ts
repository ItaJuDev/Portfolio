import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const dataPath = join(process.cwd(), 'server', 'data', 'projects.json');

export async function readProjects() {
  try {
    const data = await readFile(dataPath, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export async function writeProjects(projects: any) {
  await writeFile(dataPath, JSON.stringify(projects, null, 2));
}
