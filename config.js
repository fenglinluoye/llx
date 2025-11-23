// Supabase 配置
const SUPABASE_URL = 'https://your-project-ref.supabase.co'; // 请替换为你的Supabase项目URL
const SUPABASE_ANON_KEY = 'your-anon-key'; // 请替换为你的Supabase匿名密钥

// 创建 Supabase 客户端
const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 导出客户端供其他脚本使用
window.supabase = supabase;
