<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT, GET, POST");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../models/Profiles.php");
require_once("../models/Users.php");



$target_dir = 'C:\xampp\htdocs/BeautySalon/backend/uploads/';
$data = json_decode(file_get_contents("php://input"));
$path = explode('/', $_SERVER['REQUEST_URI']);
//var_dump($path);
//$userId = $data->userId;
$userId = intval($path[5]);
//echo $userId;
$profileModel = new Profiles();
$profile = $profileModel-> getProfileByUserId($userId);
//var_dump($profile);
$oldImage = $profile['image'];
$id = $profile['id'];
 if(unlink($target_dir.$oldImage)){
    $userModel = new Users();
    $user = $userModel->getUserById($userId);
    $profileIdInUser = $user['profileId'];
    if(!is_null($profileIdInUser))
    {
        $updateUser= $userModel->setNullProfileId($userId);
        if($updateUser)
        {
            $deleteProfile = $profileModel->deleteProfile($id);
            if($deleteProfile){
                 echo json_encode(["status"=>"Valid", "message"=>"Profile deleted"]);
            }else{
                 echo json_encode(["status"=>"Invalid", "message"=>"Profile not deleted"]);
            }

        }else{
            echo json_encode(["status"=>"Invalid", "message"=>"User not updated"]);
        }
    }else{
        $deleteProfile = $profileModel->deleteProfile($id);
            if(deleteProfile){
                 echo json_encode(["status"=>"Valid", "message"=>"Profile deleted"]);
            }else{
                 echo json_encode(["status"=>"Invalid", "message"=>"Profile not deleted"]);
            }
    }
 }

?>