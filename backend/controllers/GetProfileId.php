<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../models/Profiles.php"); 

$path = explode('/', $_SERVER['REQUEST_URI']);
//var_dump($path) ;
$userId = intval($path[5]);
//echo $userId;

        $profileModel = new Profiles;
        $profile = $profileModel->getProfileId($userId);
        //var_dump($profile);
        if(!empty($profile))
        {
            echo json_encode(["status"=>"Valid","profile"=>$profile, "message"=>"Profile founded"]);
        }else{
             echo json_encode(["status"=>"Invalid","profile"=>" ", "message"=>"No profile founded"]);
        }
    

?>