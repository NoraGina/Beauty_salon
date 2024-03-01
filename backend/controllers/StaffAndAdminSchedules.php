<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../models/Schedules.php");

$path = explode('/', $_SERVER['REQUEST_URI']);
//var_dump($path);
$userId = intval($path[5]);
//$userId = $_POST['userId'];
//echo $userId;
 if(isset($userId) && is_numeric($userId))
 {
    $scheduleModel = new Schedules();
    $schedules = $scheduleModel->getScheduleByUserId($userId);
    //var_dump($schedules);
    if($schedules){
         echo json_encode(['status'=>'Valid',"schedules"=>$schedules]);
               
return;
    }else{
        echo json_encode(['status'=>'Invalid',"message"=>"No schedules"]);
    }
 }
?>