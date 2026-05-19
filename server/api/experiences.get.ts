import { defineEventHandler, setHeader } from "h3";
import experiencesData from "../data/experiences.json";

export default defineEventHandler(async (event) => {
  const experiences = [...(experiencesData as any[])].sort((a, b) => {
    const ai = a.order_index ?? 0;
    const bi = b.order_index ?? 0;
    if (ai !== bi) return ai - bi;
    if (a.start_date && b.start_date) return b.start_date.localeCompare(a.start_date);
    return 0;
  });

  setHeader(event, "Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  return experiences;
});
