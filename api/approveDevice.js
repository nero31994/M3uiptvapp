import fs from 'fs';
import path from 'path';

const filePath = path.resolve('./usedCodes.json');

// List of valid codes (Modify as needed)
let approvedCodes = {
    "7days": "User1",
    "VIP2025": "User2",
    "TRIAL123": "User3"
};

// Load used codes from file
function loadUsedCodes() {
    if (fs.existsSync(filePath)) {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }
    return {};
}

// Save used codes to file
function saveUsedCodes(usedCodes) {
    fs.writeFileSync(filePath, JSON.stringify(usedCodes, null, 2), 'utf8');
}

export default function handler(req, res) {
    const { code } = req.query;
    let usedCodes = loadUsedCodes();

    if (!code) {
        return res.status(400).json({ error: "Code is required" });
    }

    if (usedCodes[code]) {
        return res.status(403).json({ approved: false, error: "Code already used!" });
    }

    if (approvedCodes[code]) {
        usedCodes[code] = true;  // Mark the code as used
        saveUsedCodes(usedCodes); // Save to file

        return res.status(200).json({ approved: true, user: approvedCodes[code] });
    } else {
        return res.status(403).json({ approved: false, error: "Invalid code" });
    }
}
