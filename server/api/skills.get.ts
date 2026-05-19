import { defineEventHandler, setHeader } from "h3";
import skillsData from "../data/skills.json";

export default defineEventHandler(async (event) => {
  const skills = [...(skillsData as any[])].sort((a, b) => {
    const ai = a.order_index ?? 0;
    const bi = b.order_index ?? 0;
    if (ai !== bi) return ai - bi;
    return String(a.name).localeCompare(String(b.name));
  });

  setHeader(event, "Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  return skills;
});
