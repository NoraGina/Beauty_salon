<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../models/Users.php");

$path = explode('/', $_SERVER['REQUEST_URI']);

$userId = intval($path[6]);

$userModel = new Users();
$deletedUser = $userModel->deleteUser($userId);

if($deletedUser){
        echo json_encode(["status"=>"Valid", "message"=>"User has been deleted"]);
    }else{
        echo json_encode(["status"=>"Invalid", "message"=>"User has  not been deleted"]);
   }

?>