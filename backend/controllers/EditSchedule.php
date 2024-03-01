<?php
header("Access-Control-Allow-Origin:* ");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
require_once("../models/Schedules.php");

$data = json_decode(file_get_contents('php://input'));

//$id = $data->id;
//$date = $data->selectedDate;
//$shift = $data->intval(shift);
$path = explode('/', $_SERVER['REQUEST_URI']);

$id = intval($path[5]);

$date= $data->date;
$shift =$data->shift;
$start="";
$end ="";
if($shift == 1){
    $start ="07:00:00";
    $end = "13:00:00";
}else{
    $start ="13:00:00";
    $end = "19:00:00";
}

$scheduleModel = new Schedules();
$updatedSchedule = $scheduleModel->updateSchedule($date, $shift, $start, $end, $id);
if($updatedSchedule)
{
     $response=(["status"=>"Valid", "message"=>"The schedule has been updated successfully"]);
}else
{
    $response=(["status"=>"Invalid", "message"=>"The schedule has been not updated successfully"]);
}
 echo json_encode($response);

?>