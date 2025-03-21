export default function handler(req, res) {
    // List of valid codes
    const approvedCodes = ["7days", "VIP2025", "TRIAL123"];

    // Get code from request
    const { code } = req.query;

    // Check if code is provided
    if (!code) {
        return res.status(400).json({ approved: false, error: "Code is required" });
    }

    // Check if code is valid
    if (approvedCodes.includes(code)) {
        return res.status(200).json({ approved: true });
    } else {
        return res.status(403).json({ approved: false, error: "Invalid code" });
    }
}
