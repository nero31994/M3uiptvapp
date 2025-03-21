export default function handler(req, res) {
    const approvedDevices = ["device123", "device456"]; // Replace with actual approved device IDs
    const { deviceId } = req.query;

    if (!deviceId) {
        return res.status(400).json({ error: "Device ID is required" });
    }

    if (approvedDevices.includes(deviceId)) {
        return res.status(200).json({ approved: true });
    } else {
        return res.status(403).json({ approved: false, error: "Device not approved" });
    }
}
