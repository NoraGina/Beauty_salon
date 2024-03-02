<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../models/Appointments.php");

$path = explode('/', $_SERVER['REQUEST_URI']);

$profileId = intval($path[5]);

if(isset($profileId) && is_numeric($profileId))
 {
    $appointmentModel = new Appointments();
    $appointments = $appointmentModel->getAppointmentsForStaff($profileId);
    if($appointments)
    {
        echo json_encode(['status'=>'Valid',"appointments"=>$appointments, "message"=>"Appointments exist"]);
               
return;
    }else{
        echo json_encode(['status'=>'Invalid', "appointments"=>[], "message"=>"No schedules"]);
    }
    
 }