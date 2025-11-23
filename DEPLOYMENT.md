# 部署指南

## 1. 设置Supabase

### 1.1 创建Supabase项目
1. 访问 [supabase.com](https://supabase.com)
2. 点击 "Start your project"
3. 注册/登录账户
4. 创建新项目：
   - 选择组织
   - 输入项目名称（如：my-blog-website）
   - 选择数据库密码
   - 选择地区（建议选择最近的地区）

### 1.2 配置数据库
1. 进入项目控制台
2. 点击左侧菜单的 "SQL Editor"
3. 点击 "New query"
4. 复制 `supabase-schema.sql` 文件中的所有SQL代码
5. 粘贴到查询编辑器中
6. 点击 "Run" 执行建表语句

### 1.3 获取API密钥
1. 点击左侧菜单的 "Settings" → "API"
2. 复制以下信息：
   - Project URL（格式如：https://xxxxx.supabase.co）
   - anon public 密钥

### 1.4 配置网站
1. 编辑 `config.js` 文件
2. 替换以下内容：
```javascript
const SUPABASE_URL = '你的项目URL'; // 替换这里
const SUPABASE_ANON_KEY = '你的匿名密钥'; // 替换这里
```

## 2. 部署到Netlify

### 2.1 准备代码仓库
1. 创建Git仓库（GitHub/GitLab/Bitbucket）
2. 将项目文件上传到仓库：
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <你的仓库URL>
git push -u origin main
```

### 2.2 连接Netlify
1. 访问 [netlify.com](https://netlify.com)
2. 注册/登录账户
3. 点击 "Sites" 页面
4. 点击 "Deploy manually" 或 "Import an existing project"

### 2.3 自动部署（推荐）
1. 选择 "Deploy with Git"
2. 选择你的Git提供商（GitHub/GitLab/Bitbucket）
3. 授权Netlify访问你的仓库
4. 选择包含项目文件的仓库

### 2.4 配置构建设置
- **Branch to deploy**: `main` (或你的主分支)
- **Build command**: 留空（因为是纯静态网站）
- **Publish directory**: `.` (点号，表示根目录)

### 2.5 部署网站
1. 点击 "Deploy site"
2. 等待部署完成（通常需要1-2分钟）
3. 部署成功后，你会获得一个URL（如：https://amazing-site-name.netlify.app）

## 3. 验证部署

### 3.1 检查网站功能
1. 访问部署后的URL
2. 测试各个页面：
   - 首页：查看最新文章
   - 博客页面：查看文章列表，尝试发表文章
   - 关于页面：查看个人信息，尝试发送留言

### 3.2 检查数据库连接
1. 如果页面无法加载数据，检查：
   - `config.js` 中的Supabase配置是否正确
   - Supabase项目是否正常运行
   - 数据表是否正确创建

## 4. 自定义域名（可选）

### 4.1 使用Netlify子域名
- Netlify会自动生成一个子域名（如：amazing-site-name.netlify.app）
- 你可以修改Site name来自定义子域名

### 4.2 使用自定义域名
1. 在Netlify控制台点击你的网站
2. 点击 "Site configuration" → "Domain management"
3. 点击 "Add custom domain"
4. 输入你的域名并按照指示配置DNS

## 5. 故障排除

### 常见问题
1. **页面空白或无法加载**
   - 检查 `config.js` 配置是否正确
   - 检查浏览器控制台是否有错误信息

2. **无法发表文章/留言**
   - 检查Supabase项目的RLS（行级安全）设置
   - 确认数据表权限配置正确

3. **样式异常**
   - 检查CSS文件是否正确加载
   - 检查文件路径是否正确

### 获取帮助
- Supabase文档：https://supabase.com/docs
- Netlify文档：https://docs.netlify.com
- 检查浏览器开发者工具的控制台错误

## 6. 后续维护

### 更新网站
1. 修改代码后提交到Git仓库
2. Netlify会自动重新部署
3. 或者在Netlify控制台手动触发部署

### 备份数据
- 定期备份Supabase数据库
- 可以使用Supabase的备份功能

---

部署完成后，请提交你的Netlify网站URL作为作业成果。
