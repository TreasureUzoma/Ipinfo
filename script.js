function isValidIP(ip) {
    const ipv4Pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    const ipv6Pattern = /([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}|::|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(1[0-9]{2}|[1-9]?[0-9]){1,2})\.){3}(25[0-5]|(1[0-9]{2}|[1-9]?[0-9]){1,2})|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(1[0-9]{2}|[1-9]?[0-9]){1,2})\.){3}(25[0-5]|(1[0-9]{2}|[1-9]?[0-9]){1,2})$/;
    
    return ipv4Pattern.test(ip) || ipv6Pattern.test(ip);
}

function getIPInfo() {
    var ipAddress = document.getElementById("ipInput").value;
    
    if (!isValidIP(ipAddress)) {
        document.getElementById("ipInfo").innerHTML = "<p>Error: Invalid IP address format</p>";
        return;
    }

    fetch("https://ipapi.co/" + ipAddress + "/json/")
        .then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.json();
        })
        .then(data => {
            if (data.error) {
                throw new Error(data.error);
            }
            var info = `
                <p style="margin-bottom: 25px;"><b>Result:</b></p>
                <p>IP: <span>${data.ip}</span></p>
                <p>Country: <span>${data.country_name}</span></p>
                <p>Region Code: <span>${data.region_code}</span></p>
                <p>Region: <span>${data.region}</span></p>
                <p>Timezone: <span>${data.timezone}</span></p>
                <p>ISP: <span>${data.org}</span></p>
                <p>Latitude: <span>${data.latitude}</span></p>
                <p>Longitude: <span>${data.longitude}</span></p>
            `;
            document.getElementById("ipInfo").innerHTML = info;
        })
        .catch(error => {
            document.getElementById("ipInfo").innerHTML = `<p>Error: ${error.message}</p>`;
        });
}

document.getElementById("check-my-ip").addEventListener("click", function () {
    async function getPublicIP() {
        try {
            const response = await fetch("https://api.ipify.org?format=json");
            const data = await response.json();
            return data.ip;
        } catch (error) {
            console.error("Error fetching public IP:", error);
            return null;
        }
    }
    
    getPublicIP().then(publicIP => {
        if (publicIP) {
            document.getElementById("ipInput").value = publicIP;
            console.log("Public IP:", publicIP);
            getIPInfo();
        }
    });
});
