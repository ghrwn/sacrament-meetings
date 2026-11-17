-- Sacrament Meeting Planner: PostgreSQL schema and sample records.
-- Run this script in the Neon SQL editor after provisioning the database.

CREATE TABLE IF NOT EXISTS meetings (
  id              SERIAL        PRIMARY KEY,
  date            DATE          NOT NULL UNIQUE,
  meeting_type    VARCHAR(20)   NOT NULL
                                CHECK (meeting_type IN (
                                  'testimony',
                                  'regular',
                                  'stake',
                                  'general',
                                  'special'
                                )),
  presiding       VARCHAR(255)  NOT NULL,
  conducting      VARCHAR(255)  NOT NULL,
  announcements   TEXT[]        DEFAULT '{}',
  opening_hymn    JSONB         NOT NULL,
  opening_prayer  VARCHAR(255)  NOT NULL,
  ward_business   JSONB         DEFAULT '[]',
  stake_business  BOOLEAN       DEFAULT false,
  sacrament_hymn  JSONB         NOT NULL,
  speakers        JSONB         DEFAULT '[]',
  closing_hymn    JSONB         NOT NULL,
  closing_prayer  VARCHAR(255)  NOT NULL
);

INSERT INTO meetings (
  date, meeting_type, presiding, conducting, announcements,
  opening_hymn, opening_prayer, ward_business, stake_business,
  sacrament_hymn, speakers, closing_hymn, closing_prayer
) VALUES
(
  '2026-11-15', 'regular', 'Bishop Daniel Santos', 'Brother Michael Reyes',
  ARRAY['Ward temple day will be held next Saturday.', 'Youth activity is scheduled for Wednesday evening.'],
  '{"number":2,"title":"The Spirit of God"}'::jsonb, 'Sister Maria Cruz',
  '[{"description":"Sustaining of the new Primary presidency."}]'::jsonb, false,
  '{"number":193,"title":"I Stand All Amazed"}'::jsonb,
  '[{"name":"Brother Joseph Garcia","topic":"Strengthening Our Faith in Jesus Christ","type":"speaker"},{"name":"Sister Angela Ramos","topic":"Finding Peace Through the Holy Ghost","type":"speaker"}]'::jsonb,
  '{"number":85,"title":"How Firm a Foundation"}'::jsonb, 'Brother David Lim'
),
(
  '2026-11-08', 'regular', 'Bishop Daniel Santos', 'Brother Michael Reyes',
  ARRAY['Ward temple day will be held next Saturday.'],
  '{"number":2,"title":"The Spirit of God"}'::jsonb, 'Sister Maria Cruz',
  '[{"description":"Sustaining of the new Primary presidency."}]'::jsonb, false,
  '{"number":193,"title":"I Stand All Amazed"}'::jsonb,
  '[{"name":"Brother Joseph Garcia","topic":"Faith in Jesus Christ","type":"speaker"},{"name":"Sister Angela Ramos","topic":"The Holy Ghost","type":"speaker"}]'::jsonb,
  '{"number":85,"title":"How Firm a Foundation"}'::jsonb, 'Brother David Lim'
),
(
  '2026-11-01', 'testimony', 'Bishop Daniel Santos', 'Brother Michael Reyes',
  ARRAY['Please support the upcoming ward service activity.'],
  '{"number":100,"title":"Nearer, My God, to Thee"}'::jsonb, 'Brother Peter Mendoza',
  '[]'::jsonb, false,
  '{"number":193,"title":"I Stand All Amazed"}'::jsonb,
  '[{"name":"Ward Members","topic":"Personal Testimonies","type":"speaker"}]'::jsonb,
  '{"number":98,"title":"I Need Thee Every Hour"}'::jsonb, 'Sister Elena Torres'
),
(
  '2026-10-25', 'regular', 'Bishop Daniel Santos', 'Sister Rebecca Flores',
  ARRAY['The annual ward Christmas preparation will begin soon.'],
  '{"number":19,"title":"We Thank Thee, O God, for a Prophet"}'::jsonb, 'Brother Kim',
  '[{"description":"Sustaining of ward auxiliary leaders."}]'::jsonb, true,
  '{"number":169,"title":"As Now We Take the Sacrament"}'::jsonb,
  '[{"name":"Sister Grace Villanueva","topic":"Remembering the Savior","type":"speaker"},{"name":"Ward Choir","topic":"A Musical Message of Faith","type":"musical-number"}]'::jsonb,
  '{"number":116,"title":"Come, Follow Me"}'::jsonb, 'Brother Mark Bautista'
),
(
  '2026-10-18', 'stake', 'Stake President Robert Garcia', 'Brother Thomas Lee',
  ARRAY['Stake leadership training follows the meeting.'],
  '{"number":2,"title":"The Spirit of God"}'::jsonb, 'Brother John Perez',
  '[]'::jsonb, true,
  '{"number":193,"title":"I Stand All Amazed"}'::jsonb,
  '[{"name":"Stake President Robert Garcia","topic":"Strengthening Our Stakes of Zion","type":"speaker"},{"name":"Stake Young Men","topic":"Musical Number","type":"musical-number"}]'::jsonb,
  '{"number":100,"title":"Nearer, My God, to Thee"}'::jsonb, 'Sister Hannah White'
),
(
  '2026-10-11', 'general', 'Elder Samuel Johnson', 'Brother Thomas Lee',
  ARRAY['Welcome to today''s special conference meeting.'],
  '{"number":19,"title":"We Thank Thee, O God, for a Prophet"}'::jsonb, 'Sister Elizabeth Moore',
  '[]'::jsonb, false,
  '{"number":169,"title":"As Now We Take the Sacrament"}'::jsonb,
  '[{"name":"Elder Samuel Johnson","topic":"Discipleship and Service","type":"speaker"},{"name":"Church Choir","topic":"Musical Number","type":"musical-number"}]'::jsonb,
  '{"number":85,"title":"How Firm a Foundation"}'::jsonb, 'Brother Matthew Clark'
),
(
  '2026-10-04', 'special', 'Bishop Daniel Santos', 'Sister Torres',
  ARRAY['Welcome to the special music and testimony meeting.'],
  '{"number":134,"title":"I Believe in Christ"}'::jsonb, 'Sister Park',
  '[]'::jsonb, false,
  '{"number":175,"title":"God, Our Father, Hear Us Pray"}'::jsonb,
  '[{"name":"Sister Chen","topic":"The Sacrament","type":"speaker"},{"name":"Brother Osei","topic":"Covenant Keeping","type":"speaker"}]'::jsonb,
  '{"number":219,"title":"Because I Have Been Given Much"}'::jsonb, 'Brother Alvarez'
),
(
  '2026-09-27', 'regular', 'Bishop Daniel Santos', 'Brother Michael Reyes',
  ARRAY['Ministering interviews are available this week.'],
  '{"number":85,"title":"How Firm a Foundation"}'::jsonb, 'Brother Kim',
  '[{"description":"Sustaining of the new Sunday School presidency."}]'::jsonb, false,
  '{"number":173,"title":"While of These Emblems We Partake"}'::jsonb,
  '[{"name":"Sister Nakamura","topic":"Personal Revelation","type":"speaker"},{"name":"Brother Santos","topic":"Temple Covenants","type":"speaker"}]'::jsonb,
  '{"number":226,"title":"Improve the Shining Moments"}'::jsonb, 'Sister Jensen'
)
ON CONFLICT (date) DO NOTHING;
