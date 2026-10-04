//src/services/post.service.js 
const { pool } = require("../config/dbConnect");

async function getAllPosts() {
    const { rows } = await pool.query(
        "SELECT id, title, content, author_id, published, created_at FROM posts ORDER BY id"
    );
    return rows;
}

async function getPostById(id) {
    const { rows } = await pool.query(
        "SELECT id, title, content, author_id, published, created_at FROM posts WHERE id = $1",
        [id]
    );
    return rows[0] || null;
}

async function getPostsByAuthorId(authorId) {
    const { rows } = await pool.query(
        "SELECT id, title, content, author_id, published, created_at FROM posts WHERE author_id = $1 ORDER BY id",
        [authorId]
    );
    return rows;
}

async function createPost({ title, content, author_id, published }) {
    const { rows } = await pool.query(
        `INSERT INTO posts (title, content, author_id, published)
         VALUES ($1, $2, $3, $4)
         RETURNING id, title, content, author_id, published, created_at`,
        [title, content, author_id, published ?? false]
    );
    return rows[0];
}

async function updatePost(id, { title, content, author_id, published }) {
    const { rows } = await pool.query(
        `UPDATE posts
         SET title = $1, content = $2, author_id = $3, published = $4
         WHERE id = $5
         RETURNING id, title, content, author_id, published, created_at`,
        [title, content, author_id, published ?? false, id]
    );
    return rows[0] || null;
}

async function deletePost(id) {
    const { rows } = await pool.query(
        "DELETE FROM posts WHERE id = $1 RETURNING id, title, content, author_id, published, created_at",
        [id]
    );
    return rows[0] || null;
}

module.exports = {
    getAllPosts,
    getPostById,
    getPostsByAuthorId,
    createPost,
    updatePost,
    deletePost
};