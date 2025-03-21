export default function handler(req, res) {
    const approvedCodes = { "7days": true, "VIP2025": true, "TRIAL123": true };
    const hiddenM3uUrl = "https://raw.githubusercontent.com/nero31994/minemu3/refs/heads/main/CIGNAL%20-%202025-03-06T191919.914.m3u"; // Replace with your M3U URL

    const { code } = req.query;
    if (!code || !approvedCodes[code]) {
        return res.status(403).json({ approved: false, error: "Invalid or used code" });
    }

    return res.status(200).json({ approved: true, m3uUrl: hiddenM3uUrl });
}
