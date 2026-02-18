import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

// 確認用
app.get("/", (req, res) => {
  res.send("server alive");
});

// Discord通知用
app.post("/notify", async (req, res) => {
  try {
    const msg = req.body?.message || "通知テスト";

    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: msg })
    });

    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`running on ${port}`));
