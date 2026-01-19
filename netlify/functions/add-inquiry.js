
// 后端函数：接收并保存新询盘
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = JSON.parse(event.body);
  console.log("Saving Inquiry to Database:", data);

  // 实际生产中：await supabase.from('inquiries').insert([data])

  return {
    statusCode: 201,
    body: JSON.stringify({ message: "Inquiry saved successfully", id: Date.now().toString() })
  };
};
