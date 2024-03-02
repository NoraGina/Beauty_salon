<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT, GET, POST");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../models/Appointments.php");
require_once("../models/Schedules.php");  
$appointmentData = json_decode(file_get_contents('php://input'), true);


$profileId =   $appointmentData['profileId'];
$scheduleId =  $appointmentData['scheduleId'];
$customerName = $appointmentData['customerName'];
$customerEmail = $appointmentData['customerEmail'];
$appointmentDate= $appointmentData['appointmentDate'];
$appointmentTime = $appointmentData['appointmentTime'];
$servicesArray =$appointmentData['services'];
$services = implode( ",", $servicesArray);

$appointmentModel = new Appointments();
$newAppointment = $appointmentModel->addAppointment($profileId, $scheduleId,$customerName, $customerEmail, 
    $appointmentDate, $appointmentTime, $services);
if($newAppointment){
    $scheduleModel = new Schedules();
    $oneSchedule = $scheduleModel->getOneScheduleById($scheduleId);
    $scheduleAppointments = $oneSchedule['scheduleAppointments']+1;
    $updateSchedule = $scheduleModel->updateScheduleAppointments($scheduleAppointments, $scheduleId);
        if($updateSchedule){
            echo json_encode(['status'=>'Valid',"message"=>"Appointment was created successfully And schedule updated!"]);
        }else{
            echo json_encode(['status'=>'Invalid',"message"=>" Schedule not updated!"]);
        }


} else {
echo json_encode(['status'=>'Invalid',"message"=>"Something went wrong!"]);

}