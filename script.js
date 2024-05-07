function getIPInfo() {
    var ipAddress = document.getElementById("ipInput").value;
    fetch("https://ipapi.co/" + ipAddress + "/json/")
        .then(response => response.json())
        .then(data => {
            var info = `
                <p><b>Result:</b></p>
                <br><br><br>
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
            document.getElementById("ipInfo").innerHTML = "<p>Error: Invalid IP address</p>";
        });
}
