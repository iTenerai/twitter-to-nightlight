chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log('Message received:', message);  // Log the message object
    if (message.type === "sendRequest") {

        const xhttp = new XMLHttpRequest();
        xhttp.onloadstart = function () {
            console.log(prefix + "Sending repost data to Nightlight");
        };
        xhttp.onload = function () {

            sendResponse({ success: true, message: data['message'] });

            console.log('Response Text:', this.responseText);  // Log the full response text

            var data;
            try {
                data = JSON.parse(this.responseText);
            } catch (error) {
                console.log("Error parsing JSON response:", error);
                return;
            }

            if (data['status'] == 0) {
                console.log(prefix + "Repost failed: ", data['message']);
                alert("Repost failed: " + data['message']);
                sendResponse({ success: false, message: data['message'] });
            }
            else if (data['status'] == 1) {
                console.log(prefix + "Repost successful");
                alert("Repost successful");
                sendResponse({ success: true, message: "Repost successful" });
            }
        };

        xhttp.onerror = function () {
            console.error("Error occurred while sending the request");
            sendResponse({ success: false, message: "Request failed" });
        };

        xhttp.open("GET", message.requestURL);  // Use message.requestURL
        console.log('Opening request to:', message.requestURL);  // Log when the request is opened
        xhttp.send();
        return true; // Keep the message channel open for async response
    }
});
