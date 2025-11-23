-- Supabase数据库表结构

-- 用户表
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 博客文章表
CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    content TEXT NOT NULL,
    category VARCHAR(50) NOT NULL,
    author_id INTEGER REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 评论表
CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    message TEXT NOT NULL,
    page VARCHAR(50) NOT NULL, -- 页面标识，如 'about', 'blog'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入一些示例数据
INSERT INTO users (username, email, password_hash, bio) VALUES
('admin', 'admin@example.com', 'hashed_password', '网站管理员');

INSERT INTO posts (title, content, category, author_id) VALUES
('欢迎来到我的博客', '这是我的第一篇博客文章，欢迎大家访问我的个人博客。在这里我会分享技术心得、生活感悟等内容。', '生活随笔', 1),
('JavaScript异步编程详解', '异步编程是JavaScript中的重要概念，本文将详细介绍Promise、async/await等异步编程技术...', '技术分享', 1),
('我的2024年总结', '2024年即将结束，这一年发生了很多事情，让我来回顾一下这一年的收获和感悟...', '思考感悟', 1);

INSERT INTO comments (name, email, message, page) VALUES
('访客1', 'visitor1@example.com', '很棒的博客，期待更多内容！', 'about'),
('访客2', 'visitor2@example.com', '文章写得很不错，支持！', 'about');

-- 设置行级安全策略 (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 为posts表创建策略（允许所有人读取，登录用户可以写入）
CREATE POLICY "允许所有人查看文章" ON posts FOR SELECT USING (true);
CREATE POLICY "允许登录用户发表文章" ON posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 为comments表创建策略（允许所有人读取和写入）
CREATE POLICY "允许所有人查看评论" ON comments FOR SELECT USING (true);
CREATE POLICY "允许所有人发表评论" ON comments FOR INSERT WITH CHECK (true);

-- 为users表创建策略（登录用户可以查看自己的信息）
CREATE POLICY "用户可以查看自己的信息" ON users FOR SELECT USING (auth.uid() = id);
