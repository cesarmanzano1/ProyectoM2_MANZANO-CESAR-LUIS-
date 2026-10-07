--src/base_de_datos /setup.sql  
-- Crear la base de datos
CREATE DATABASE blog_db;

-- Crear usuario específico para la aplicación
CREATE USER blog_user WITH PASSWORD 'blog_password_2026';

-- Conectar a la base de datos
\c blog_db

-- Dar permisos al usuario en la base de datos
GRANT ALL PRIVILEGES ON DATABASE blog_db TO blog_user;

-- Dar permisos en el schema public
GRANT ALL PRIVILEGES ON SCHEMA public TO blog_user;

-- Dar permisos para crear tablas y usar secuencias
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO blog_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO blog_user;


-- Tabla de autores
CREATE TABLE authors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  bio TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de posts
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  content TEXT NOT NULL,
  author_id INTEGER NOT NULL,
  published BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
);