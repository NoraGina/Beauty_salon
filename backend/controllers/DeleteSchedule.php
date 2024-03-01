<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../models/Schedules.php");

$path = explode('/', $_SERVER['REQUEST_URI']);
//$userId = $data->userId;
//echo ($path[6]);
$id = intval($path[5]);
//echo $userId;
$scheduleModel= new Schedules();
$deletedSchedule = $scheduleModel->deleteSchedule($id);

if($deletedSchedule){
        echo json_encode(["status"=>"Valid", "message"=>"Schedule has been deleted"]);
    }else{
        echo json_encode(["status"=>"Invalid", "message"=>"Schedule has  not been deleted"]);
    }

?>