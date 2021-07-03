<?php 


if (isset($_POST['submit'])) {

    $name = $_POST['name'];
    $subject = $_POST['subject'];
    $emailFrom = $_POST['email'];
    $message = $_POST['message'];

    $mailTo = "cs04141@uoi.gr";
    $headers = "From: ".$emailFrom;
    $body = "You have received a message from ".$name."\n\n".$message;

    mail($mailTo, $subject, $body, $headers);
    //header("Location: index.html?mailsend");

}

?>