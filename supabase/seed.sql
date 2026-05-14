-- ============================================================
-- Clubify — Demo Account Seed
-- Run AFTER schema.sql in: Supabase Dashboard → SQL Editor
--
-- BEFORE running:
--   1. Auth → Settings → Disable "Confirm email" (for instant login)
--   2. Auth → Settings → Enable "Allow anonymous sign-ins"
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ── Demo Student: youssef.mahmoud@guc.edu.eg / demo1234 ──────
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  aud, role, created_at, updated_at,
  confirmation_token, recovery_token, email_change_token_new, email_change
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
  now(), now(), '', '', '', ''
)
ON CONFLICT (email) DO NOTHING;

-- ── Demo Admin: sara.ahmed@guc.edu.eg / demo1234 ─────────────
INSERT INTO auth.users (
  id, instance_id, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  aud, role, created_at, updated_at,
  confirmation_token, recovery_token, email_change_token_new, email_change
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
  now(), now(), '', '', '', ''
)
ON CONFLICT (email) DO NOTHING;

-- ── Enrich the auto-created profile rows ─────────────────────
UPDATE public.profiles SET
  name               = 'Youssef Mahmoud',
  guc_id             = '49-12345',
  faculty            = 'Media Engineering & Technology',
  year               = 3,
  bio                = 'CS student passionate about tech, media, and making a difference.',
  role               = 'student',
  joined_clubs       = ARRAY['c1','c7','c10'],
  attended_sessions  = 14,
  total_sessions     = 18,
  profile_completion = 75,
  avatar_url         = 'https://api.dicebear.com/7.x/avataaars/svg?seed=youssef&backgroundColor=b6e3f4'
WHERE id = 'a0000000-0000-0000-0000-000000000001';

UPDATE public.profiles SET
  name               = 'Sara Ahmed',
  guc_id             = '49-67890',
  faculty            = 'Management Technology',
  year               = 4,
  bio                = 'President of GUC Media Club. Passionate about storytelling and student leadership.',
  role               = 'admin',
  joined_clubs       = ARRAY['c1'],
  attended_sessions  = 28,
  total_sessions     = 30,
  profile_completion = 95,
  avatar_url         = 'https://api.dicebear.com/7.x/avataaars/svg?seed=sara&backgroundColor=ffdfbf'
WHERE id = 'a0000000-0000-0000-0000-000000000002';

-- ── Verify ───────────────────────────────────────────────────
SELECT id, name, email, role FROM public.profiles
WHERE id IN (
  'a0000000-0000-0000-0000-000000000001',
  'a0000000-0000-0000-0000-000000000002'
);
