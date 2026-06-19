-- Schema for namakecil-db
CREATE TABLE IF NOT EXISTS access_codes (
  code TEXT PRIMARY KEY,
  createdAt TEXT NOT NULL
);

-- Insert default access codes
INSERT OR IGNORE INTO access_codes (code, createdAt) VALUES ('2425NK-1', '2026-06-19T00:00:00Z');
INSERT OR IGNORE INTO access_codes (code, createdAt) VALUES ('@temanparenting.id-2456n1', '2026-06-19T00:00:00Z');
