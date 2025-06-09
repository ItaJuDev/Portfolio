import { readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const { password } = await readBody(event);
  const config = useRuntimeConfig();
  const success = password === config.ADMIN_PASSWORD;
  return { success };
});
