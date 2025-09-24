Supabase setup for portfolio

1) Create a new Supabase project and get your Project URL and anon key from Project Settings → API.

2) In this repo, set env vars in `.env`:

   SUPABASE_URL=your-url
   SUPABASE_ANON_KEY=your-anon-key

3) Apply the schema in Supabase SQL Editor:

   - Open SQL → New query
   - Paste the contents of `supabase/schema.sql`
   - Run

4) Insert some data into `skills`, `projects`, and `experiences` via Table Editor.

Notes

- Images field in `projects` accepts JSON array of URLs, e.g. ["/img1.png", "/img2.png"].
- The site reads anonymously; writes can be done from the Supabase dashboard or via Admin tools.

