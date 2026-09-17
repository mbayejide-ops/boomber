// pages/api/test-signal.js

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed" });
  }

  try {
    const { number } = req.body;

    if (!number) {
      return res.status(400).json({ success: false, error: "Number is required" });
    }

    console.log("--- TESTING SYSTEM ---");
    console.log("Target Number:", number);
    console.log("Status: Online");
    console.log("----------------------");

    return res.status(200).json({
      success: true,
      message: "SYSTEM ONLINE: Signal Received Successfully",
      received: number
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: "Internal server error" });
  }
}
