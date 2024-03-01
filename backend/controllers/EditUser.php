<?php

header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
require_once("../models/Users.php");

$data = json_decode(file_get_contents('php://input'));
   
$fullName = $data->fullName;
$email = $data->email;
$password = $data->password;
$userName = $data->userName;

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$role = $data->role;
$uniq = uniqid();
$uniqueNumber = substr($uniq, -6);
$userId = $data->id;
$userModel = new Users();

$updateUser = $userModel->updateUser($fullName, $userName, $email, $hashedPassword, $role, $uniqueNumber, $userId);
if($updateUser)
{
     $response=(["status"=>"Valid", "message"=>"The user has been updated successfully"]);
}else
{
    $response=(["status"=>"Invalid", "message"=>"The user has been not updated successfully"]);
}
 echo json_encode($response);

?>