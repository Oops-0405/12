
// 后端函数：保存或更新产品信息
exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const product = JSON.parse(event.body);
  console.log("Updating product in database:", product.name);

  // 实际生产中：await supabase.from('products').upsert(product)

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Product updated", product })
  };
};
