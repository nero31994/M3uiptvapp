function getDeviceId() {
    let deviceId = localStorage.getItem("deviceId");

    if (!deviceId) {
        deviceId = "DEV-" + Math.random().toString(36).substr(2, 9);
        localStorage.setItem("deviceId", deviceId);
    }

    return deviceId;
}

document.addEventListener("DOMContentLoaded", function () {
    let deviceId = getDeviceId();
    console.log("🔹 Device ID:", deviceId);

    fetch("/approved_devices.json")
        .then(response => response.json())
        .then(data => {
            if (data.approved.includes(deviceId)) {
                console.log("✅ Access Granted");

                // ✅ AUTOLOAD M3U PLAYLIST ✅
                let m3uUrl = "https://raw.githubusercontent.com/nero31994/minemu3/refs/heads/main/CIGNAL%20-%202025-03-06T191919.914.m3u";

                if (m3uUrl) {
                    localStorage.setItem("sM3uList", m3uUrl);
                    document.getElementById("sM3uUrl").value = m3uUrl;

                    downloadButton(); // Load and save playlist
                    
                    setTimeout(() => {
                        playlistReadyHandler(); // Ensure playlist is fully loaded
                        setTimeout(() => {
                            loadChannel(1); // Auto-play the first channel
                        }, 2000);
                    }, 3000);
                }

                // ✅ HIDE SETTINGS TAB ✅
                let generalSettings = document.getElementById("main_settings");
                if (generalSettings) {
                    generalSettings.style.display = "none";
                }

                let settingsTab = document.getElementById("settings_general_tab");
                if (settingsTab) {
                    settingsTab.onclick = function () {
                        alert("Access Restricted!");
                        return false;
                    };
                }

            } else {
                console.log("⛔ Access Denied");

                // ❌ SHOW DEVICE ID FOR APPROVAL ❌
                document.body.innerHTML = `
                    <div style="text-align:center; padding:20px;">
                        <h1>Access Denied</h1>
                        <p>Your device is not approved.</p>
                        <p><strong>Device ID:</strong> <span style="color:red;">${deviceId}</span></p>
                        <p>Please send this Device ID to the admin for approval.</p>
                    </div>
                `;
            }
        })
        .catch(error => console.error("❌ Error checking approval:", error));
});
