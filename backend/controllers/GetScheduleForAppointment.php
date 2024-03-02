<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../models/Schedules.php");

$path = explode('/', $_SERVER['REQUEST_URI']);

$getId = intval($path[5]);
//$userId = $_POST['userId'];
//echo $getId;
 if(isset($getId) && is_numeric($getId))
 {
    $scheduleModel = new Schedules();
    $lastSchedule = $scheduleModel->getLastDateByUserId($getId);
    //var_dump ($lastSchedule);
    $lastDate= $lastSchedule['date'];
    $currentDate =date('Y-m-d');
    //echo "<br>";
   //echo $lastDate;
   // echo "<br>";
   // echo $currentDate;
   // echo "<br>";
    $schedules = $scheduleModel->getAvaibleScheduleByProfileId($getId, $currentDate, $lastDate);
   // var_dump($schedules);
    if(!empty($schedules)){
         echo json_encode(['status'=>'Valid',"schedulesList"=>$schedules]);
               

    }else{
        echo json_encode(['status'=>'Invalid',"message"=>"No schedules"]);
    }
 }
?>