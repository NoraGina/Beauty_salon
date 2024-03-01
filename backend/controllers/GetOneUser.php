<?php   

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../models/Users.php");

$path = explode('/', $_SERVER['REQUEST_URI']);

$userId = intval($path[5]);

$userModel = new Users;
$foundUser = $userModel->getUserById($userId);
if(!empty($foundUser)){
    echo json_encode(["status"=>"Valid","userList"=>$foundUser, "message"=>"User founded"]);
}else{
     echo json_encode(["status"=>"Invalid","userList"=>[], "message"=>"User founded"]);
}
