
// 注意：在 Netlify 环境中，我们会使用环境变量来保证安全
// 如果您本地运行，可以在 .env 文件中定义这些值
export const SUPABASE_URL = process.env.SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY || '';

// 提示：实际开发中，后端函数会直接使用这个配置
