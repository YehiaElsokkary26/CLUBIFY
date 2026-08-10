-- ============================================================
-- Clubify — Complete Database Schema
-- Run in: Supabase Dashboard → SQL Editor
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ─────────────────────────────────────────────────────────────
-- PROFILES
-- Auto-populated by trigger when user signs up via Supabase Auth
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.profiles (
  id                  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name                TEXT NOT NULL,
  email               TEXT NOT NULL UNIQUE,
  guc_id              TEXT,
  faculty             TEXT,
  year                INTEGER,
  bio                 TEXT,
  avatar_url          TEXT,
  role                TEXT NOT NULL DEFAULT 'student'
                        CHECK (role IN ('student', 'club_admin', 'super_admin')),
  profile_completion  INTEGER DEFAULT 0,
  warnings            JSONB DEFAULT '[]',
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

-- Trigger: auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.profiles (id, name, email, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ─────────────────────────────────────────────────────────────
-- CLUBS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.clubs (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                  TEXT NOT NULL,
  slug                  TEXT NOT NULL UNIQUE,
  category              TEXT NOT NULL
                          CHECK (category IN ('Technology','Business','Arts','Sports','Academic','Media','Community')),
  logo                  TEXT,
  cover_image           TEXT,
  description           TEXT,
  mission               TEXT,
  member_count          INTEGER DEFAULT 0,
  follower_count        INTEGER DEFAULT 0,
  founded               INTEGER,
  contact_email         TEXT,
  social_links          JSONB DEFAULT '{}',
  tags                  TEXT[] DEFAULT '{}',
  is_recruiting         BOOLEAN DEFAULT FALSE,
  recruitment_deadline  DATE,
  spots_left            INTEGER DEFAULT 0,
  spotlight             JSONB DEFAULT '{}',
  who_should_join       TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────
-- COMMITTEES
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.committees (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id          UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  name             TEXT NOT NULL,
  description      TEXT,
  spots_available  INTEGER DEFAULT 0,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────
-- CLUB STAFF  (leadership board displayed on club page)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.club_staff (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id        UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  user_id        UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name           TEXT NOT NULL,
  role           TEXT NOT NULL,
  avatar_url     TEXT,
  display_order  INTEGER DEFAULT 0,
  is_month_star  BOOLEAN DEFAULT FALSE,
  quote          TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────
-- CLUB MEMBERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.club_members (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id       UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  user_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  committee_id  UUID REFERENCES public.committees(id) ON DELETE SET NULL,
  status        TEXT NOT NULL DEFAULT 'active'
                  CHECK (status IN ('active', 'alumni', 'suspended')),
  joined_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (club_id, user_id)
);

-- Trigger: keep clubs.member_count in sync
CREATE OR REPLACE FUNCTION public.sync_member_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.clubs SET member_count = member_count + 1 WHERE id = NEW.club_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.clubs SET member_count = GREATEST(0, member_count - 1) WHERE id = OLD.club_id;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_member_count ON public.club_members;
CREATE TRIGGER trg_member_count
  AFTER INSERT OR DELETE ON public.club_members
  FOR EACH ROW EXECUTE FUNCTION public.sync_member_count();


-- ─────────────────────────────────────────────────────────────
-- CLUB FOLLOWS  (follow without joining)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.club_follows (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id     UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (club_id, user_id)
);

-- Trigger: keep clubs.follower_count in sync
CREATE OR REPLACE FUNCTION public.sync_follower_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.clubs SET follower_count = follower_count + 1 WHERE id = NEW.club_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.clubs SET follower_count = GREATEST(0, follower_count - 1) WHERE id = OLD.club_id;
  END IF;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_follower_count ON public.club_follows;
CREATE TRIGGER trg_follower_count
  AFTER INSERT OR DELETE ON public.club_follows
  FOR EACH ROW EXECUTE FUNCTION public.sync_follower_count();


-- ─────────────────────────────────────────────────────────────
-- EVENTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.events (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id             UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  title               TEXT NOT NULL,
  description         TEXT,
  date                DATE NOT NULL,
  time                TEXT,
  location            TEXT,
  type                TEXT CHECK (type IN ('Workshop','Competition','Talk','Social')),
  capacity            INTEGER,
  rsvp_count          INTEGER DEFAULT 0,
  average_rating      NUMERIC(3,2) DEFAULT 0,
  review_count        INTEGER DEFAULT 0,
  recap_title         TEXT,
  recap_body          TEXT,
  recap_published_at  TIMESTAMPTZ,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────
-- EVENT RSVPs
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.event_rsvps (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id    UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status      TEXT NOT NULL CHECK (status IN ('going','maybe','not_going')),
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (event_id, user_id)
);

-- Trigger: keep events.rsvp_count (going only) in sync
CREATE OR REPLACE FUNCTION public.sync_rsvp_count()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  UPDATE public.events
  SET rsvp_count = (
    SELECT COUNT(*) FROM public.event_rsvps
    WHERE event_id = COALESCE(NEW.event_id, OLD.event_id) AND status = 'going'
  )
  WHERE id = COALESCE(NEW.event_id, OLD.event_id);
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_rsvp_count ON public.event_rsvps;
CREATE TRIGGER trg_rsvp_count
  AFTER INSERT OR UPDATE OR DELETE ON public.event_rsvps
  FOR EACH ROW EXECUTE FUNCTION public.sync_rsvp_count();


-- ─────────────────────────────────────────────────────────────
-- EVENT REVIEWS  (one per user per event, only after event ends)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.event_reviews (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id    UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  rating      INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  text        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (event_id, user_id)
);

-- Trigger: keep events.average_rating and review_count in sync
CREATE OR REPLACE FUNCTION public.sync_event_rating()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
DECLARE
  target_event_id UUID;
BEGIN
  target_event_id := COALESCE(NEW.event_id, OLD.event_id);
  UPDATE public.events
  SET
    average_rating = (SELECT COALESCE(AVG(rating), 0) FROM public.event_reviews WHERE event_id = target_event_id),
    review_count   = (SELECT COUNT(*)                  FROM public.event_reviews WHERE event_id = target_event_id)
  WHERE id = target_event_id;
  RETURN NULL;
END;
$$;

DROP TRIGGER IF EXISTS trg_event_rating ON public.event_reviews;
CREATE TRIGGER trg_event_rating
  AFTER INSERT OR UPDATE OR DELETE ON public.event_reviews
  FOR EACH ROW EXECUTE FUNCTION public.sync_event_rating();


-- ─────────────────────────────────────────────────────────────
-- EVENT ATTENDANCE  (marked by officers after event)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.event_attendance (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id    UUID NOT NULL REFERENCES public.events(id) ON DELETE CASCADE,
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  marked_by   UUID REFERENCES public.profiles(id),
  marked_at   TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (event_id, user_id)
);


-- ─────────────────────────────────────────────────────────────
-- ANNOUNCEMENTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.announcements (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id     UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  club_name   TEXT,
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  audience    TEXT DEFAULT 'all' CHECK (audience IN ('all','members','followers')),
  created_by  UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────
-- ANNOUNCEMENT COMMENTS  (flat, one level only)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.announcement_comments (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  announcement_id  UUID NOT NULL REFERENCES public.announcements(id) ON DELETE CASCADE,
  user_id          UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  text             TEXT NOT NULL,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────
-- NEWSLETTERS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.newsletters (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id          UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  title            TEXT NOT NULL,
  preview_text     TEXT,
  body             TEXT NOT NULL,  -- stored as HTML
  author_name      TEXT,
  author_id        UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  is_members_only  BOOLEAN DEFAULT FALSE,
  published_at     TIMESTAMPTZ DEFAULT NOW(),
  created_at       TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────
-- NEWSLETTER BOOKMARKS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.newsletter_bookmarks (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  newsletter_id  UUID NOT NULL REFERENCES public.newsletters(id) ON DELETE CASCADE,
  user_id        UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (newsletter_id, user_id)
);


-- ─────────────────────────────────────────────────────────────
-- CLUB RESOURCES  (PDFs, docs, links — members only)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.club_resources (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id      UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  description  TEXT,
  type         TEXT NOT NULL CHECK (type IN ('PDF','Doc','Link')),
  url          TEXT NOT NULL,
  uploaded_by  UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────
-- APPLICATIONS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.applications (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type   TEXT NOT NULL DEFAULT 'club' CHECK (entity_type IN ('club','committee')),
  entity_id     UUID NOT NULL,
  club_id       UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  committee_id  UUID REFERENCES public.committees(id) ON DELETE SET NULL,
  user_id       UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  status        TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','accepted','rejected','waitlisted')),
  answers       JSONB DEFAULT '{}',
  notes         TEXT,
  reviewed_by   UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  reviewed_at   TIMESTAMPTZ,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────
-- INTERVIEW SLOTS
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.interview_slots (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id         UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  datetime        TIMESTAMPTZ NOT NULL,
  is_booked       BOOLEAN DEFAULT FALSE,
  booked_by       UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  application_id  UUID REFERENCES public.applications(id) ON DELETE SET NULL,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────
-- ANONYMOUS FEEDBACK  (no user_id stored — truly anonymous)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.anonymous_feedback (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id     UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  text        TEXT NOT NULL,
  is_read     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────
-- SATISFACTION SURVEYS  (officers create, members respond)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.surveys (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  club_id     UUID NOT NULL REFERENCES public.clubs(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  questions   JSONB NOT NULL DEFAULT '[]',
  semester    TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.survey_responses (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  survey_id    UUID NOT NULL REFERENCES public.surveys(id) ON DELETE CASCADE,
  user_id      UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  answers      JSONB NOT NULL DEFAULT '{}',
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (survey_id, user_id)
);


-- ─────────────────────────────────────────────────────────────
-- NOTIFICATIONS  (grouped by club on the frontend)
-- ─────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS public.notifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  club_id     UUID REFERENCES public.clubs(id) ON DELETE CASCADE,
  club_name   TEXT,
  type        TEXT NOT NULL
                CHECK (type IN ('newsletter','event','announcement','application_update','recap')),
  title       TEXT NOT NULL,
  body        TEXT,
  link        TEXT,
  is_read     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ─────────────────────────────────────────────────────────────
-- INDEXES
-- ─────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_clubs_category       ON public.clubs(category);
CREATE INDEX IF NOT EXISTS idx_clubs_slug           ON public.clubs(slug);
CREATE INDEX IF NOT EXISTS idx_events_club          ON public.events(club_id);
CREATE INDEX IF NOT EXISTS idx_events_date          ON public.events(date);
CREATE INDEX IF NOT EXISTS idx_members_club         ON public.club_members(club_id);
CREATE INDEX IF NOT EXISTS idx_members_user         ON public.club_members(user_id);
CREATE INDEX IF NOT EXISTS idx_follows_user         ON public.club_follows(user_id);
CREATE INDEX IF NOT EXISTS idx_follows_club         ON public.club_follows(club_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_event          ON public.event_rsvps(event_id);
CREATE INDEX IF NOT EXISTS idx_rsvps_user           ON public.event_rsvps(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_event        ON public.event_reviews(event_id);
CREATE INDEX IF NOT EXISTS idx_announcements_club   ON public.announcements(club_id);
CREATE INDEX IF NOT EXISTS idx_newsletters_club     ON public.newsletters(club_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user   ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_read   ON public.notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_applications_user    ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_club    ON public.applications(club_id);
CREATE INDEX IF NOT EXISTS idx_feedback_club        ON public.anonymous_feedback(club_id);


-- ─────────────────────────────────────────────────────────────
-- ROW LEVEL SECURITY (RLS)
-- ─────────────────────────────────────────────────────────────
ALTER TABLE public.profiles              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clubs                 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.committees            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_staff            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_members          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_follows          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_rsvps           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_reviews         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_attendance      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcement_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletters           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.newsletter_bookmarks  ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.club_resources        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interview_slots       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anonymous_feedback    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surveys               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_responses      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications         ENABLE ROW LEVEL SECURITY;

-- Helper: is the current user an admin of a given club?
CREATE OR REPLACE FUNCTION public.is_club_admin(club_id UUID)
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.club_staff
    WHERE club_id = $1 AND user_id = auth.uid()
  ) OR EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'super_admin'
  );
$$;

-- Helper: is the current user a member of a given club?
CREATE OR REPLACE FUNCTION public.is_club_member(club_id UUID)
RETURNS BOOLEAN LANGUAGE sql SECURITY DEFINER AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.club_members
    WHERE club_id = $1 AND user_id = auth.uid() AND status = 'active'
  );
$$;

-- PROFILES
CREATE POLICY "profiles_select_all"   ON public.profiles FOR SELECT USING (TRUE);
CREATE POLICY "profiles_update_own"   ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- CLUBS
CREATE POLICY "clubs_select_all"      ON public.clubs FOR SELECT USING (TRUE);
CREATE POLICY "clubs_write_admin"     ON public.clubs FOR ALL USING (public.is_club_admin(id));

-- COMMITTEES
CREATE POLICY "committees_select_all" ON public.committees FOR SELECT USING (TRUE);
CREATE POLICY "committees_write"      ON public.committees FOR ALL USING (public.is_club_admin(club_id));

-- CLUB STAFF
CREATE POLICY "staff_select_all"      ON public.club_staff FOR SELECT USING (TRUE);
CREATE POLICY "staff_write"           ON public.club_staff FOR ALL USING (public.is_club_admin(club_id));

-- CLUB MEMBERS
CREATE POLICY "members_select_all"    ON public.club_members FOR SELECT USING (TRUE);
CREATE POLICY "members_write_admin"   ON public.club_members FOR ALL USING (public.is_club_admin(club_id));

-- CLUB FOLLOWS
CREATE POLICY "follows_select_all"    ON public.club_follows FOR SELECT USING (TRUE);
CREATE POLICY "follows_own"           ON public.club_follows FOR ALL USING (auth.uid() = user_id);

-- EVENTS
CREATE POLICY "events_select_all"     ON public.events FOR SELECT USING (TRUE);
CREATE POLICY "events_write_admin"    ON public.events FOR ALL USING (public.is_club_admin(club_id));

-- EVENT RSVPs
CREATE POLICY "rsvps_select_all"      ON public.event_rsvps FOR SELECT USING (TRUE);
CREATE POLICY "rsvps_own"             ON public.event_rsvps FOR ALL USING (auth.uid() = user_id);

-- EVENT REVIEWS
CREATE POLICY "reviews_select_all"    ON public.event_reviews FOR SELECT USING (TRUE);
CREATE POLICY "reviews_own"           ON public.event_reviews FOR ALL USING (auth.uid() = user_id);

-- EVENT ATTENDANCE
CREATE POLICY "attendance_select_own" ON public.event_attendance FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "attendance_write"      ON public.event_attendance FOR ALL
  USING (public.is_club_admin((SELECT club_id FROM public.events WHERE id = event_id)));

-- ANNOUNCEMENTS
CREATE POLICY "ann_select_all"        ON public.announcements FOR SELECT USING (TRUE);
CREATE POLICY "ann_write_admin"       ON public.announcements FOR ALL USING (public.is_club_admin(club_id));

-- ANNOUNCEMENT COMMENTS
CREATE POLICY "comments_select_all"   ON public.announcement_comments FOR SELECT USING (TRUE);
CREATE POLICY "comments_insert_auth"  ON public.announcement_comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "comments_delete_own"   ON public.announcement_comments FOR DELETE USING (auth.uid() = user_id);

-- NEWSLETTERS (content access enforced in service layer based on membership)
CREATE POLICY "news_select_all"       ON public.newsletters FOR SELECT USING (TRUE);
CREATE POLICY "news_write_admin"      ON public.newsletters FOR ALL USING (public.is_club_admin(club_id));

-- NEWSLETTER BOOKMARKS
CREATE POLICY "bookmarks_own"         ON public.newsletter_bookmarks FOR ALL USING (auth.uid() = user_id);

-- CLUB RESOURCES
CREATE POLICY "resources_select_members" ON public.club_resources FOR SELECT
  USING (public.is_club_member(club_id));
CREATE POLICY "resources_write_admin"    ON public.club_resources FOR ALL USING (public.is_club_admin(club_id));

-- APPLICATIONS
CREATE POLICY "apps_select_own"       ON public.applications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "apps_select_admin"     ON public.applications FOR SELECT USING (public.is_club_admin(club_id));
CREATE POLICY "apps_insert_auth"      ON public.applications FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "apps_update_admin"     ON public.applications FOR UPDATE USING (public.is_club_admin(club_id));

-- INTERVIEW SLOTS
CREATE POLICY "slots_select_all"      ON public.interview_slots FOR SELECT USING (TRUE);
CREATE POLICY "slots_write_admin"     ON public.interview_slots FOR ALL USING (public.is_club_admin(club_id));

-- ANONYMOUS FEEDBACK (insert only — no user_id stored)
CREATE POLICY "feedback_insert"       ON public.anonymous_feedback FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "feedback_select_admin" ON public.anonymous_feedback FOR SELECT
  USING (public.is_club_admin(club_id));
CREATE POLICY "feedback_update_admin" ON public.anonymous_feedback FOR UPDATE
  USING (public.is_club_admin(club_id));

-- SURVEYS
CREATE POLICY "surveys_select_all"    ON public.surveys FOR SELECT USING (TRUE);
CREATE POLICY "surveys_write_admin"   ON public.surveys FOR ALL USING (public.is_club_admin(club_id));

-- SURVEY RESPONSES
CREATE POLICY "survey_resp_own"       ON public.survey_responses FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "survey_resp_admin"     ON public.survey_responses FOR SELECT
  USING (public.is_club_admin((SELECT club_id FROM public.surveys WHERE id = survey_id)));

-- NOTIFICATIONS
CREATE POLICY "notif_own"             ON public.notifications FOR ALL USING (auth.uid() = user_id);
