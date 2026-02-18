import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("server alive");
});

app.post("/notify", async (req, res) => {
  await fetch(process.env.DISCORD_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "Railwayから通知" })
  });
  res.json({ ok: true });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("running"));
