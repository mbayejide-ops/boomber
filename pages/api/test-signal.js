export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { number } = req.body;
    console.log("Testing Signal for Number:", number);

    return res.status(200).json({
      success: true,
      message: "Signal received successfully",
      received: number
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}
