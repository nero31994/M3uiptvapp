let usedCodes = {}; // Store used codes in memory

const approvedCodes = {
    "7days": 7 * 24 * 60 * 60 * 1000,   // Expires in 7 days
    "VIP2025": 3 * 24 * 60 * 60 * 1000,  // Expires in 3 days
    "TRIAL123": 24 * 60 * 60 * 1000,     // Expires in 24 hours
    "1MONTH": 30 * 24 * 60 * 60 * 1000   // Expires in 30 days (1 month)
};

export default function handler(req, res) {
    const { code } = req.query;

    if (!code) {
        return res.status(400).json({ error: "Code is required" });
    }

    // Check if the code is already used
    if (usedCodes[code]) {
        const currentTime = Date.now();
        if (currentTime > usedCodes[code].expiresAt) {
            delete usedCodes[code]; // Remove expired code
        } else {
            return res.status(403).json({ approved: false, error: "Code already used!" });
        }
    }

    // Validate the code and set expiration
    if (approvedCodes[code]) {
        usedCodes[code] = { 
            expiresAt: Date.now() + approvedCodes[code] 
        };
        return res.status(200).json({ approved: true });
    } else {
        return res.status(403).json({ approved: false, error: "Invalid code" });
    }
}
