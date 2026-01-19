
export const getChatResponse = async (userMessage: string) => {
  // 模拟一个本地化的快速响应，不请求外部接口，避免连接拒绝错误
  const msg = userMessage.toLowerCase();
  await new Promise(r => setTimeout(r, 600));

  if (msg.includes('hello') || msg.includes('hi')) return "Hello! How can I assist you with Hangte Lubricants today?";
  if (msg.includes('price')) return "For detailed pricing, please submit an inquiry through our Contact form for a formal quotation.";
  if (msg.includes('shipping')) return "We offer global shipping. Delivery times vary by region (usually 15-30 days).";
  
  return "Thank you for your message. A sales representative will provide a detailed answer shortly. Would you like to leave your email?";
};
