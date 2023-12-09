document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact-form");
    const statusMessage = document.getElementById("status-message");

    form.addEventListener("submit", function (e) {
        e.preventDefault(); // "Trys to" Prevent the form from submitting via the browser.

        const name = document.getElementById("contactname").value;
        const email = document.getElementById("contactemail").value;
        const message = document.getElementById("contactmessage").value;

        // Perform basic ass client-side validation and make sure they fill in all the fields.
        if (!name || !email || !message) {
            statusMessage.innerHTML = "Please fill in all fields.";
            return;
        }

        // Create a FormData object to send form data via "AJAX".
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("message", message);

        // Send a POST request to the PHP script using "AJAX".
        fetch("contact.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.text())
            .then((data) => {
                // Display the server's response message to check and know if it was succesful.
                statusMessage.innerHTML = data;
                // Clear the form fields if the message was sent successfully.
                if (data.includes("successfully")) {
                    form.reset();
                }
            })
            .catch((error) => { //Failsafe. If anything goes wrong.
                statusMessage.innerHTML = "An error occurred while sending the message.";
                console.error("Error:", error);
            });
    });
});