// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
});

// 初始化页面
function initializePage() {
    const currentPage = getCurrentPage();

    switch(currentPage) {
        case 'index':
            loadLatestPosts();
            break;
        case 'blog':
            loadAllPosts();
            initializePostForm();
            break;
        case 'about':
            initializeContactForm();
            loadComments();
            break;
    }
}

// 获取当前页面名称
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('blog.html')) return 'blog';
    if (path.includes('about.html')) return 'about';
    return 'index';
}

// 加载最新文章（首页）
async function loadLatestPosts() {
    try {
        const { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(6);

        if (error) throw error;

        const postsContainer = document.getElementById('latest-posts');
        if (posts && posts.length > 0) {
            postsContainer.innerHTML = posts.map(post => createPostCard(post)).join('');
        } else {
            postsContainer.innerHTML = '<p>暂无文章</p>';
        }
    } catch (error) {
        console.error('加载文章失败:', error);
        document.getElementById('latest-posts').innerHTML = '<p>加载失败，请稍后重试</p>';
    }
}

// 加载所有文章（博客页面）
async function loadAllPosts() {
    try {
        const { data: posts, error } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const postsContainer = document.getElementById('blog-posts');
        if (posts && posts.length > 0) {
            postsContainer.innerHTML = posts.map(post => createPostCard(post)).join('');
        } else {
            postsContainer.innerHTML = '<p>暂无文章</p>';
        }
    } catch (error) {
        console.error('加载文章失败:', error);
        document.getElementById('blog-posts').innerHTML = '<p>加载失败，请稍后重试</p>';
    }
}

// 创建文章卡片
function createPostCard(post) {
    const createdAt = new Date(post.created_at).toLocaleDateString('zh-CN');
    return `
        <div class="post-card">
            <h3>${post.title}</h3>
            <p>${post.content.substring(0, 150)}...</p>
            <small>分类: ${post.category} | 发布时间: ${createdAt}</small>
        </div>
    `;
}

// 初始化发表文章表单
function initializePostForm() {
    const form = document.getElementById('post-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const title = document.getElementById('title').value;
            const content = document.getElementById('content').value;
            const category = document.getElementById('category').value;

            try {
                const { data, error } = await supabase
                    .from('posts')
                    .insert([
                        {
                            title: title,
                            content: content,
                            category: category,
                            author_id: 1 // 临时使用固定用户ID
                        }
                    ]);

                if (error) throw error;

                alert('文章发表成功！');
                form.reset();
                loadAllPosts(); // 重新加载文章列表

            } catch (error) {
                console.error('发表文章失败:', error);
                alert('发表失败，请重试');
            }
        });
    }
}

// 初始化联系表单
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (form) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            try {
                const { data, error } = await supabase
                    .from('comments')
                    .insert([
                        {
                            name: name,
                            email: email,
                            message: message,
                            page: 'about'
                        }
                    ]);

                if (error) throw error;

                alert('留言发送成功！');
                form.reset();
                loadComments(); // 重新加载留言

            } catch (error) {
                console.error('发送留言失败:', error);
                alert('发送失败，请重试');
            }
        });
    }
}

// 加载留言
async function loadComments() {
    try {
        const { data: comments, error } = await supabase
            .from('comments')
            .select('*')
            .eq('page', 'about')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const commentsContainer = document.getElementById('comments');
        if (comments && comments.length > 0) {
            commentsContainer.innerHTML = comments.map(comment => createCommentCard(comment)).join('');
        } else {
            commentsContainer.innerHTML = '<p>暂无留言</p>';
        }
    } catch (error) {
        console.error('加载留言失败:', error);
        document.getElementById('comments').innerHTML = '<p>加载失败，请稍后重试</p>';
    }
}

// 创建留言卡片
function createCommentCard(comment) {
    const createdAt = new Date(comment.created_at).toLocaleDateString('zh-CN');
    return `
        <div class="comment">
            <strong>${comment.name}</strong> (${comment.email}) - ${createdAt}
            <p>${comment.message}</p>
        </div>
    `;
}
