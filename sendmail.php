<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
// require 'PHPMailer/src/SMTP.php';
$msg = '';
date_default_timezone_set('Etc/UTC');
$mail = new PHPMailer;

$mail->CharSet = 'UTF-8';
        //Server settings
    // $mail->SMTPDebug = 2;                                 // Enable verbose debug output
    // $mail->isSMTP();                                      // Set mailer to use SMTP
    // $mail->Host = 'mail.ukraine.com.ua';  // Specify main and backup SMTP servers
    // $mail->SMTPAuth = true;                               // Enable SMTP authentication
    // $mail->Username = 'test@divclass.org';                 // SMTP username
    // $mail->Password = 'qwerty1ff';                           // SMTP password
    // $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
    // $mail->Port = 25;                                    // TCP port to connect to


$mail->setFrom('test@divclass.org', 'First Last');
$mail->addAddress('1unitedcrew@gmail.com', 'Bilinskyi');

$mail->isHTML(true); 

$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$text = $_POST['text'];

$msg = '';
if (array_key_exists('file', $_FILES)) {
    // First handle the upload
    // Don't trust provided filename - same goes for MIME types
    // See http://php.net/manual/en/features.file-upload.php#114004 for more thorough upload validation
    $uploadfile = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['file']['name']));
    if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadfile)) {
        // Upload handled successfully
        // Now create a message


        $mail->Subject = 'PHPMailer file sender';
        $mail->Body = "Телефон {$_POST['phone']}";
        // Attach the uploaded file
        $mail->addAttachment($uploadfile, $_FILES['file']['name']);
        if (!$mail->send()) {
            $msg .= "Mailer Error: " . $mail->ErrorInfo;
        } else {
            $msg .= "Message sent!";
        }
    } else {
        $msg .= 'Failed to move file to ' . $uploadfile;
        $mail->Subject = 'Just Phone';
        $mail->Body = "Телефон {$_POST['phone']}";
        if (!$mail->send()) {
            $msg .= "Mailer Error: " . $mail->ErrorInfo;
        } else {
            $msg .= "Message sent!";
        }
    }
} elseif (array_key_exists('phone', $_POST)) {
    $mail->Subject = 'Заявка';
    $mail->Body = "$name<br>$phone";
    if (!$mail->send()) {
        $msg .= "Mailer Error: " . $mail->ErrorInfo;
    } else {
        $msg .= "Message sent!";
    }
}




?>
