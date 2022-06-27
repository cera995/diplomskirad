<?php


if(!isset($_POST['email']) || !isset($_POST['name']) || !isset($_POST['phone']) || !isset($_POST['adress']))
{
    echo json_encode([
        "success" => false,
        "message" =>  "Niste prosledili sve podatke",
    ]); 
    exit();
}


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'vendor/phpmailer/phpmailer/src/Exception.php';
require 'vendor/phpmailer/phpmailer/src/PHPMailer.php';
require 'vendor/phpmailer/phpmailer/src/SMTP.php';


$mail = new PHPMailer();
$mail->IsSMTP();
$mail->Mailer = "smtp";


$mail->SMTPAuth   = TRUE;
$mail->SMTPSecure = "tls";
$mail->Port       = 587;
$mail->Host       = "smtp.gmail.com";
$mail->Username   = "markocerovicdiplomski2021@gmail.com";
$mail->Password   = "marko2021xx";


$mail->IsHTML(true);
$mail->AddAddress($_POST['email']);
$mail->SetFrom($mail->Username , "Marko Cerovic");
$mail->Subject = "Kontakt sa sajta";


$content = "Pozdrav ".$_POST['name']." uspešno ste obavili kupovinu. <br/>Hrana ce biti isporučena na adresu: ".$_POST['adress'].". <br/>Kontakt telefon: ".$_POST['phone'].". <br/>Srdačan pozdrav.";

$mail->MsgHTML($content);


if(!$mail->Send()) { 


    echo json_encode([
        "success" =>  false,
        "message" =>  "Neuspešno slanje poruke."
    ]); 

} else {
    echo json_encode([
        "success" =>  true,
        "message" =>  "Poruka uspešno poslata."
    ]); 
}