<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../models/Schedules.php");
$data = json_decode(file_get_contents('php://input'), true);
    
    $userId = $data['userId'];
    $profileId = $data['profileId'];
    $selecteDate = $data['selectedDate'];
    $shift = intval($data['shift']);
    $userName = $data['userName'];
    $status = $data['status'];
    $start="";
    $end ="";
    $appointments=0;
    //$scheduleOwner = $userName."_".$startDate;
     $scheduleModel = new Schedules();
if($shift == 1){
        
        $start ="07:00:00";
        $end = "13:00:00";
    }else{
        
        $start ="13:00:00";
        $end = "19:00:00";
    }
    
    if($status == "weekly"){
        $freeDays = array(
    date('2024-01-01'),
    date('2024-01-02'),
    date('2024-01-06'),
    date('2024-01-07'),
    date('2024-01-24'),
    date('2024-05-01'),
    date('2024-05-03'),
    date('2024-05-05'),
    date('2024-05-06'),
    date('2024-06-01'),
    date('2024-06-23'),
    date('2024-06-24'),
    date('2024-08-15'),
    date('2024-11-30'),
    date('2024-05-03'),
    date('2024-12-01'),
    date('2024-12-25'),
    date('2024-12-26'),
    date('2025-01-01'),
    date('2025-01-02'),
    );
        $todayTimestamp = strtotime($selecteDate);
        $todayDay = date('D', $todayTimestamp);
        $daysToAdd ="";
        if($shift == 1){
            $daysToAdd = addDaysShift1($todayDay);
        }else{
            $daysToAdd = addDaysShift2($todayDay);
        }
        $mod_date = strtotime($selecteDate.$daysToAdd);
        $endDate = date("Y-m-d",$mod_date);
        $weekDays= date_range($selecteDate, $endDate);
        $workDays = skipHolidays($weekDays, $freeDays);
         $newSchedule = array();
        foreach($workDays as $dateValue){
            $scheduleOwner = $userName."_".$dateValue;
            $newSchedule= $scheduleModel->addSchedule($userId, $profileId, $dateValue, $shift, $start, $end, $appointments, $scheduleOwner);
    
            }
        if($newSchedule){
        echo json_encode(['status'=>'Valid',"message"=>"Schedule was created successfully!", "option"=>"weekly"]);
                    
        } else {
        echo json_encode(['status'=>'Invalid',"message"=>"Could not add to the database!"]);
        
        }

    }else{
         $scheduleOwner = $userName."_".$selecteDate;
        $schedule = $scheduleModel->addSchedule($userId, $profileId, $selecteDate, $shift, $start, $end, $appointments, $scheduleOwner);
        if($schedule){
        echo json_encode(['status'=>'Valid',"message"=>"Schedule was created successfully!", "option"=>"daily"]);
                    
        } else {
        echo json_encode(['status'=>'Invalid',"message"=>"Could not add to the database!"]);
        
        }
    }
  


     

function addDaysShift1($todayDay)
{
    $days ="";
   
        switch($todayDay)
        {
                case "Mon":
                $days ="+ 5 days";
                break;
                case "Tue";
                $days = "+ 4 days";
                break;
                case "Wed";
                $days = "+ 3 days";
                break;
                case "Thu";
                $days = "+ 2 days";
                break;
                case "Fri";
                $days ="+ 1 days";
                break;
                default;
                $days ="+ 5 days";
        
        }
        return $days;
    
}
function addDaysShift2($todayDay)
{
    $days ="";
        switch($todayDay)
        {
            case "Mon":
            $days ="+ 4 days";
            break;
            case "Tue";
            $days ="+ 3 days";
            break;
            case "Wed";
            $days = "+ 2 days";
            break;
            case "Thu";
            $days ="+ 1 days";
            break;
            
            default;
            $days ="+ 4 days";
            
        }
        return $days;
}
function date_range($first, $last) {
     $step = '+1 day';
      $output_format = 'Y-m-d';
    $dates = array();
   // $first = date('Y-m-d');
    $current = strtotime($first);
    $last = strtotime($last);
    //$currentDate =date('Y-m-d');
    while( $current <= $last ) {
        
       $dates[] = date($output_format, $current);
        $current = strtotime($step, $current);
        
    }

    return $dates;
}
function skipHolidays($arr, $holidays)
 {
    
    $workDays = array();
   for($i = 0; $i<count($arr);$i++){
   
        if(!in_array($arr[$i], $holidays)){
            $workDays[]  = $arr[$i];
        }
            

        
        
   }
   return $workDays;
}

?>