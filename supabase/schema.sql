-- ============================================================
-- Clubify — Full Database Schema
-- Run this entire file in: Supabase Dashboard → SQL Editor
-- ============================================================

-- ── PROFILES ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id                 uuid        PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name               text        NOT NULL DEFAULT 'Student',
  guc_id             text,
  faculty            text,
  year               int         DEFAULT 1,
  avatar_url         text,
  bio                text        DEFAULT '',
  role               text        NOT NULL DEFAULT 'student'
                                 CHECK (role IN ('student', 'admin')),
  joined_clubs       text[]      DEFAULT '{}',
  attended_sessions  int         DEFAULT 0,
  total_sessions     int         DEFAULT 0,
  warnings           text[]      DEFAULT '{}',
  profile_completion int         DEFAULT 10,
  created_at         timestamptz DEFAULT now(),
  updated_at         timestamptz DEFAULT now()
);

-- Auto-create a profile row whenever a new auth user is created
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'https://api.dicebear.com/7.x/avataaars/svg?seed=' || NEW.id::text
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own"  ON public.profiles FOR SELECT  USING (auth.uid() = id);
CREATE POLICY "profiles_update_own"  ON public.profiles FOR UPDATE  USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own"  ON public.profiles FOR INSERT  WITH CHECK (auth.uid() = id);

-- ── CLUBS ────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.clubs (
  id                   text        PRIMARY KEY,
  name                 text        NOT NULL,
  slug                 text        UNIQUE NOT NULL,
  category             text,
  logo_url             text,
  cover_image_url      text,
  description          text,
  mission              text,
  member_count         int         DEFAULT 0,
  founded              int,
  contact_email        text,
  tags                 text[]      DEFAULT '{}',
  is_recruiting        bool        DEFAULT false,
  recruitment_deadline timestamptz,
  spots_left           int,
  who_should_join      text,
  social_links         jsonb       DEFAULT '{}',
  spotlight            jsonb       DEFAULT '{}',
  created_at           timestamptz DEFAULT now()
);

ALTER TABLE public.clubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "clubs_public_read"    ON public.clubs FOR SELECT  USING (true);
CREATE POLICY "clubs_admin_mutate"   ON public.clubs FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── COMMITTEES ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.committees (
  id               uuid  PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id          text  REFERENCES public.clubs ON DELETE CASCADE,
  name             text  NOT NULL,
  description      text,
  spots_available  int   DEFAULT 0
);

ALTER TABLE public.committees ENABLE ROW LEVEL SECURITY;

CREATE POLICY "committees_public_read"  ON public.committees FOR SELECT USING (true);
CREATE POLICY "committees_admin_mutate" ON public.committees FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── EVENTS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.events (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id     text        REFERENCES public.clubs ON DELETE CASCADE,
  title       text        NOT NULL,
  date        date        NOT NULL,
  time        text,
  location    text,
  description text,
  type        text        CHECK (type IN ('Workshop','Social','Competition','Meeting','Talk')),
  image_url   text,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "events_public_read"   ON public.events FOR SELECT USING (true);
CREATE POLICY "events_admin_mutate"  ON public.events FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── RECRUITMENTS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.recruitments (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id       text        REFERENCES public.clubs ON DELETE CASCADE,
  deadline      timestamptz NOT NULL,
  spots_left    int         NOT NULL,
  total_spots   int         NOT NULL,
  urgency_label text,
  is_open       bool        DEFAULT true,
  created_at    timestamptz DEFAULT now()
);

ALTER TABLE public.recruitments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "recruitments_public_read"   ON public.recruitments FOR SELECT USING (true);
CREATE POLICY "recruitments_admin_mutate"  ON public.recruitments FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── APPLICATIONS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.applications (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          uuid        REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  club_id          text        REFERENCES public.clubs,
  club_name        text        NOT NULL,
  committee_name   text        NOT NULL,
  interview_date   date,
  interview_time   text,
  status           text        DEFAULT 'pending'
                               CHECK (status IN ('pending','interviewed','accepted','rejected')),
  submitted_at     timestamptz DEFAULT now()
);

ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "applications_select_own"   ON public.applications FOR SELECT  USING (auth.uid() = user_id);
CREATE POLICY "applications_insert_own"   ON public.applications FOR INSERT  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "applications_admin_all"    ON public.applications FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── ANNOUNCEMENTS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.announcements (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id          text        REFERENCES public.clubs,
  author_id        uuid        REFERENCES public.profiles,
  author_name      text,
  title            text        NOT NULL,
  body             text        NOT NULL,
  image_url        text,
  target_audience  text        DEFAULT 'All'
                               CHECK (target_audience IN ('All','Members')),
  created_at       timestamptz DEFAULT now()
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "announcements_public_read"  ON public.announcements FOR SELECT  USING (true);
CREATE POLICY "announcements_admin_mutate" ON public.announcements FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── NOTIFICATIONS ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notifications (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        REFERENCES public.profiles ON DELETE CASCADE NOT NULL,
  type        text        NOT NULL CHECK (type IN ('event','recruitment','announcement','reminder')),
  title       text        NOT NULL,
  body        text        NOT NULL,
  club_id     text        REFERENCES public.clubs,
  club_name   text,
  is_read     bool        DEFAULT false,
  created_at  timestamptz DEFAULT now()
);

ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "notifications_select_own"  ON public.notifications FOR SELECT  USING (auth.uid() = user_id);
CREATE POLICY "notifications_update_own"  ON public.notifications FOR UPDATE  USING (auth.uid() = user_id);

-- ── FAVORITES ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.favorites (
  user_id     uuid  REFERENCES public.profiles ON DELETE CASCADE,
  club_id     text  REFERENCES public.clubs ON DELETE CASCADE,
  created_at  timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, club_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

CREATE POLICY "favorites_own"  ON public.favorites FOR ALL  USING (auth.uid() = user_id);

-- ── CLUB MEMBERS ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.club_members (
  user_id      uuid  REFERENCES public.profiles ON DELETE CASCADE,
  club_id      text  REFERENCES public.clubs ON DELETE CASCADE,
  role         text  DEFAULT 'Member',
  is_month_star bool DEFAULT false,
  quote        text,
  joined_at    timestamptz DEFAULT now(),
  PRIMARY KEY (user_id, club_id)
);

ALTER TABLE public.club_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "club_members_public_read"  ON public.club_members FOR SELECT  USING (true);
CREATE POLICY "club_members_own_delete"   ON public.club_members FOR DELETE  USING (auth.uid() = user_id);
CREATE POLICY "club_members_admin_mutate" ON public.club_members FOR ALL
  USING (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin'));

-- ── USER PREFERENCES (onboarding) ─────────────────────────────
CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_id        uuid    PRIMARY KEY REFERENCES public.profiles ON DELETE CASCADE,
  interests      text[]  DEFAULT '{}',
  activity_level text,
  goals          text[]  DEFAULT '{}',
  completed_at   timestamptz
);

ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "prefs_own"  ON public.user_preferences FOR ALL  USING (auth.uid() = user_id);

-- ============================================================
-- Done. Now run supabase/seed.sql to create demo accounts.
-- ============================================================
