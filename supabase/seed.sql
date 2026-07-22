-- ============================================================
-- Clubify — Demo Account Seed  (v2 — idempotent)
-- Run in: Supabase Dashboard → SQL Editor
--
-- BEFORE running, confirm these settings in Auth → Settings:
--   • "Enable email confirmations" → OFF
--   • "Allow anonymous sign-ins"  → ON
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ── 1. Auth users ─────────────────────────────────────────────
-- Insert or reset the demo student
INSERT INTO auth.users (
  id, instance_id,
  email, encrypted_password,
  email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data,
  aud, role,
  created_at, updated_at,
  confirmation_token, recovery_token,
  email_change_token_new, email_change,
  is_sso_user
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  '00000000-0000-0000-0000-000000000000',
  'youssef.mahmoud@guc.edu.eg',
  crypt('demo1234', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Youssef Mahmoud"}',
  'authenticated', 'authenticated',
  now(), now(),
  '', '', '', '',
  false
)
ON CONFLICT (id) DO UPDATE SET
  encrypted_password  = crypt('demo1234', gen_salt('bf')),
  email_confirmed_at  = now(),
  updated_at          = now();

-- Insert or reset the demo admin
INSERT INTO auth.users (
  id, instance_id,
  email, encrypted_password,
  email_confirmed_at,
  raw_app_meta_data, raw_user_meta_data,
  aud, role,
  created_at, updated_at,
  confirmation_token, recovery_token,
  email_change_token_new, email_change,
  is_sso_user
)
VALUES (
  'a0000000-0000-0000-0000-000000000002',
  '00000000-0000-0000-0000-000000000000',
  'sara.ahmed@guc.edu.eg',
  crypt('demo1234', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"name":"Sara Ahmed"}',
  'authenticated', 'authenticated',
  now(), now(),
  '', '', '', '',
  false
)
ON CONFLICT (id) DO UPDATE SET
  encrypted_password  = crypt('demo1234', gen_salt('bf')),
  email_confirmed_at  = now(),
  updated_at          = now();

-- ── 2. Profiles — direct upsert (don't rely solely on trigger) ─
INSERT INTO public.profiles (
  id, name, guc_id, faculty, year, bio,
  role, joined_clubs, attended_sessions, total_sessions,
  profile_completion, avatar_url
)
VALUES (
  'a0000000-0000-0000-0000-000000000001',
  'Youssef Mahmoud',
  '49-12345',
  'Media Engineering & Technology',
  3,
  'CS student passionate about tech, media, and making a difference.',
  'student',
  ARRAY['c1','c7','c10'],
  14, 18, 75,
  'https://api.dicebear.com/7.x/avataaars/svg?seed=youssef&backgroundColor=b6e3f4'
)
ON CONFLICT (id) DO UPDATE SET
  name               = EXCLUDED.name,
  guc_id             = EXCLUDED.guc_id,
  faculty            = EXCLUDED.faculty,
  year               = EXCLUDED.year,
  bio                = EXCLUDED.bio,
  role               = EXCLUDED.role,
  joined_clubs       = EXCLUDED.joined_clubs,
  attended_sessions  = EXCLUDED.attended_sessions,
  total_sessions     = EXCLUDED.total_sessions,
  profile_completion = EXCLUDED.profile_completion,
  avatar_url         = EXCLUDED.avatar_url,
  updated_at         = now();

INSERT INTO public.profiles (
  id, name, guc_id, faculty, year, bio,
  role, joined_clubs, attended_sessions, total_sessions,
  profile_completion, avatar_url
)
VALUES (
  'a0000000-0000-0000-0000-000000000002',
  'Sara Ahmed',
  '49-67890',
  'Management Technology',
  4,
  'President of GUC Media Club. Passionate about storytelling and student leadership.',
  'admin',
  ARRAY['c1'],
  28, 30, 95,
  'https://api.dicebear.com/7.x/avataaars/svg?seed=sara&backgroundColor=ffdfbf'
)
ON CONFLICT (id) DO UPDATE SET
  name               = EXCLUDED.name,
  guc_id             = EXCLUDED.guc_id,
  faculty            = EXCLUDED.faculty,
  year               = EXCLUDED.year,
  bio                = EXCLUDED.bio,
  role               = EXCLUDED.role,
  joined_clubs       = EXCLUDED.joined_clubs,
  attended_sessions  = EXCLUDED.attended_sessions,
  total_sessions     = EXCLUDED.total_sessions,
  profile_completion = EXCLUDED.profile_completion,
  avatar_url         = EXCLUDED.avatar_url,
  updated_at         = now();

-- ── 3. Verify ─────────────────────────────────────────────────
SELECT
  p.id,
  p.name,
  u.email,
  p.role,
  u.email_confirmed_at IS NOT NULL AS email_confirmed
FROM public.profiles p
JOIN auth.users u ON u.id = p.id
WHERE p.id IN (
  'a0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000002'
);
