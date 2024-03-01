<?php   

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../models/Users.php"); 

$userModel = new Users();
$allUsers = $userModel->getAllUsers();
if(!empty($allUsers)){
 echo json_encode(['status'=>'Valid',"userList"=>$allUsers]);
               
return;
}else{
    echo json_encode(['status'=>'Invalid',"userList"=>[]]);
}