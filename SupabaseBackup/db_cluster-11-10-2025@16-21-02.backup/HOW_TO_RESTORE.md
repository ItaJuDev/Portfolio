# How to restore your Supabase backup

Your backup file is a full **PostgreSQL cluster dump** (output of `pg_dumpall`) from a Supabase project running PostgreSQL 17.6. It contains:

- 14 PostgreSQL roles (`anon`, `authenticated`, `postgres`, `supabase_admin`, ...)
- The `template1` database dump
- The `postgres` database dump, with the Supabase-managed schemas (`auth`, `storage`, `realtime`, `vault`, `extensions`, `graphql`, ...) AND your custom data in `public`.

## Why you cannot restore the raw file directly

Hosted Supabase projects do **not** give you superuser access. The original dump tries to:

1. `CREATE ROLE anon`, `CREATE ROLE authenticated`, ... — those roles already exist on every Supabase project; the statements will fail.
2. `\connect template1` — you can't connect to `template1` as a non-superuser.
3. Re-create the `auth`, `storage`, `realtime`, `vault`, `extensions` schemas and their tables — they already exist on a brand-new project and contain the correct (and possibly newer) versions.

So I prepared a **cleaned restore file** containing only your custom data.

## What I prepared for you

File: `restore_public.sql` (sitting next to your original backup)

It contains only:

- Your two enum types: `public."ProjectType"`, `public."ToolNTechType"`
- Your five tables: `public.contacts`, `public.experiences`, `public.project_skills`, `public.projects`, `public.skills`
- Their primary keys and foreign keys
- Row Level Security + the 5 read policies
- The actual row data (5 / 1 / 14 / 5 / 17 rows)

Your `auth.users` table was empty in the backup, so no user accounts were lost — nothing to restore there.

## How to restore (step by step)

### 1. Get your new project's connection string

In the Supabase dashboard for your new project:

1. Click **Project Settings** (gear icon, bottom-left).
2. Click **Database** in the sidebar.
3. Under **Connection string**, copy the **URI** (the one that starts with `postgresql://postgres:[YOUR-PASSWORD]@db.<project-ref>.supabase.co:5432/postgres`).
4. Replace `[YOUR-PASSWORD]` with the database password you set when you created the project.

If you forgot the password: same page, click **Reset database password**.

### 2. Run the restore from your terminal

Open a terminal on your computer (the folder containing the backup), then run:

```bash
psql "postgresql://postgres:YOUR_PASSWORD_HERE@db.YOUR_REF.supabase.co:5432/postgres" -f restore_public.sql
```

> **Don't have `psql`?** Install it via the [Postgres downloads page](https://www.postgresql.org/download/) (Mac: `brew install libpq && brew link --force libpq`; Windows: install Postgres or use the standalone `psql` tool).

You should see output like:

```
SET
CREATE TYPE
ALTER TYPE
CREATE TYPE
ALTER TYPE
CREATE TABLE
ALTER TABLE
... (etc.)
COPY 5
COPY 1
COPY 14
COPY 5
COPY 17
ALTER TABLE
... (etc.)
CREATE POLICY
```

The `COPY 5 / 1 / 14 / 5 / 17` lines confirm the row counts loaded.

### 3. Verify in the dashboard

In the new Supabase project, open **Table Editor**. You should see `contacts`, `experiences`, `project_skills`, `projects`, `skills` with all the original rows.

## Alternative: paste into the SQL editor

If you'd rather not install `psql`, you can:

1. Open `restore_public.sql` in any text editor.
2. Copy the whole thing.
3. In the Supabase dashboard go to **SQL Editor → New query**.
4. Paste and click **Run**.

This works because the cleaned file is small (~63 KB) and contains no `\connect` or other psql meta-commands.

## What if I get an error?

- **`relation "public.contacts" already exists`** — your new project already has tables with these names. Drop them first (`DROP TABLE public.contacts, public.experiences, public.project_skills, public.projects, public.skills CASCADE;`) and re-run.
- **`type "ProjectType" already exists`** — same idea: `DROP TYPE public."ProjectType", public."ToolNTechType" CASCADE;` then re-run.
- **`permission denied to set role`** — make sure you're connecting as the `postgres` user (the connection string from the dashboard does this by default).

## Notes on what is **not** restored

- **Storage objects (uploaded files)** — your `storage.objects` table referenced 11 files in 1 bucket, but the actual file bytes live in Supabase's S3, not in this SQL dump. You will need to re-upload those files. (If you don't see the originals anywhere, only metadata can be recovered — let me know and I'll pull the metadata into a CSV.)
- **Auth users** — the original `auth.users` table was empty, so nothing to do.
- **Realtime / migration state** — handled automatically by the new project.

If you want me to also export the storage object metadata (filenames, paths, sizes) so you know which files need re-uploading, just say the word.
