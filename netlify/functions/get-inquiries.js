
// 后端函数：获取所有询盘
exports.handler = async (event, context) => {
  // 模拟从数据库获取数据的逻辑
  // 实际生产中您只需：const { data } = await supabase.from('inquiries').select('*')
  
  const mockInquiries = [
    {
      id: '1',
      name: 'Michael Chen',
      company: 'Asia Logistics Group',
      email: 'm.chen@asialog.com',
      message: 'Looking for a steady supply of Advanced Synthetic Engine Oil for our fleet of 200 trucks.',
      date: '2024-05-20'
    }
  ];

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mockInquiries)
  };
};
