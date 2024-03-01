<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../models/Profiles.php"); 




$profileModel = new Profiles();

$profiles = $profileModel->getAllProfilesForTeam();
//var_dump($profiles);
if(!empty($profiles)){
 echo json_encode(['status'=>'Valid',"profiles"=>$profiles]);
               
return;
}else{
    echo json_encode(['status'=>'Invalid',"profilea"=>[]]);
}



?>