import { kv } from "@vercel/kv"; // Vercel KV storage

export default async function handler(req, res) {
    const approvedCodes = ["7days", "VIP2025", "TRIAL123"]; // Add more codes here
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: "Code is required" });
    }

    // Check if the code has already been used
    const isUsed = await kv.get(`usedCode:${code}`);
    if (isUsed) {
        return res.status(403).json({ approved: false, error: "Code already used!" });
    }

    // Check if the code is valid
    if (approvedCodes.includes(code)) {
        await kv.set(`usedCode:${code}`, true, { ex: 604800 }); // Store for 7 days (1 week)
        return res.status(200).json({ approved: true });
    } else {
        return res.status(403).json({ approved: false, error: "Invalid code" });
    }
}
