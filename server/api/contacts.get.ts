import { defineEventHandler, setHeader } from "h3";
import contactsData from "../data/contacts.json";

export default defineEventHandler(async (event) => {
  const contacts = [...(contactsData as any[])]
    .filter((c) => c.active !== false)
    .sort((a, b) => {
      const ai = a.order_index ?? 0;
      const bi = b.order_index ?? 0;
      if (ai !== bi) return ai - bi;
      return String(a.label).localeCompare(String(b.label));
    });

  setHeader(event, "Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  return contacts;
});
