
-- Create users table
CREATE TABLE users
(
    name VARCHAR(100) NOT NULL,
    username VARCHAR(100) NOT NULL PRIMARY KEY,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create posts table
CREATE TABLE posts
(
    post_id SERIAL PRIMARY KEY,
    photo VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    username VARCHAR(100) REFERENCES users(username) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create comments table
CREATE TABLE comments
(
    comment_id SERIAL PRIMARY KEY,
    comment TEXT NOT NULL,
    username VARCHAR(100) REFERENCES users(username) ON DELETE CASCADE,
    post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create likes table for post
CREATE TABLE likes_post
(
    like_id SERIAL PRIMARY KEY,
    username VARCHAR(100) REFERENCES users(username) ON DELETE CASCADE,
    post_id INT REFERENCES posts(post_id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

