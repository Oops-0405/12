
const { createClient } = require('@supabase/supabase-js');

exports.handler = async (event, context) => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  // 如果没有环境变量，暂时返回 Mock 数据，避免报错
  if (!supabaseUrl || !supabaseKey) {
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        {
          id: '1',
          name: 'Advanced Synthetic Engine Oil (Demo)',
          category: 'Automotive',
          description: 'Please configure SUPABASE_URL in Netlify to see real data.',
          image: 'https://picsum.photos/seed/oil1/600/400',
          features: ['Config Required']
        }
      ])
    };
  }

  const supabase = createClient(supabaseUrl, supabaseKey);
  const { data, error } = await supabase.from('products').select('*');

  if (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  };
};
