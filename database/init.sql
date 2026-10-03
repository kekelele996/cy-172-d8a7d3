CREATE TABLE IF NOT EXISTS app_metadata (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

INSERT INTO app_metadata (key, value)
VALUES ('project', 'gb-172-password-toolbox')
ON CONFLICT (key) DO NOTHING;
