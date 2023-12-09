<?php
// Checks if the form is submitted.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve which datas?
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];
    
    // Email who, what?
    $to = "aydinardayalcin@gmail.com"; // Replace with your email address
    $subject = "New Porfolio Contact Form from $name";
    $headers = "From: $email";
    $message = "Name: $name\nEmail: $email\nMessage:\n$message";

    // Send the email if everything is filled.
    if (mail($to, $subject, $message, $headers)) {
        // Email sent successfully
        echo "Thank you, $name. Your message has been sent successfully.";
    } else {
        // Email send failed.
        echo "Sorry, there was an error sending your message.";
    }
} else {
    // Failsafe. If the form is not submitted, return an error message.
    echo "Error: Form not submitted.";
}
?>