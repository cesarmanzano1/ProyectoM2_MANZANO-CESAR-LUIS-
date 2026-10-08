-- Insertar autores de prueba sin duplicar emails
INSERT INTO authors (name, email, bio)
VALUES
  ('Ana García', 'ana@example.com', 'Desarrolladora full-stack apasionada por Node.js'),
  ('Carlos Ruiz', 'carlos@example.com', 'Escritor técnico especializado en bases de datos'),
  ('María López', 'maria@example.com', 'Ingeniera de software con foco en APIs REST')
ON CONFLICT (email) DO NOTHING;


-- Insertar posts asociados a los IDs reales de sus autores
INSERT INTO posts (title, content, author_id, published)
SELECT
    datos.title,
    datos.content,
    a.id,
    datos.published
FROM (
    VALUES
      ('Introducción a Node.js', 'Node.js es un runtime de JavaScript...', 'ana@example.com', TRUE),
      ('PostgreSQL vs MySQL', 'Ambas bases de datos tienen ventajas...', 'carlos@example.com', TRUE),
      ('APIs RESTful', 'REST es un estilo arquitectónico...', 'ana@example.com', TRUE),
      ('Manejo de errores en Express', 'El manejo apropiado de errores...', 'maria@example.com', FALSE),
      ('Async/Await explicado', 'Las promesas simplifican el código asíncrono...', 'ana@example.com', FALSE)
) AS datos(title, content, email, published)
JOIN authors a ON a.email = datos.email
WHERE NOT EXISTS (
    SELECT 1
    FROM posts p
    WHERE p.title = datos.title
      AND p.author_id = a.id
);