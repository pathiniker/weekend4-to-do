-- 1. Create To-Do database

-- 2. Create To-Do table
-- add column for added tasks

CREATE TABLE todo (
id SERIAL PRIMARY KEY,
task varchar(120) NOT NULL
);
