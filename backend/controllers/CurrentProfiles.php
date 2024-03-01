<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../models/Profiles.php"); 
//$path = explode('/', $_SERVER['REQUEST_URI']);
$path = $_SERVER['REQUEST_URI'];
//var_dump($path);
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

$today = date('Y-m-d');
$curentHour = date('H:i',time() + 3600);

$time1 = strtotime('07:00');
$time2 = strtotime('12:59');
$time3 = strtotime('13:00');
$time4 = strtotime('19:00');
$time5 = strtotime('24:00');
$curentHourstr = strtotime($curentHour);

$currentShift ="";

$profileModel = new Profiles();

$todayTimestamp = strtotime($today);
$todayDay = date('D', $todayTimestamp);
if(in_array($today, $freeDays))
{
    $today = formatDate($today, $freeDays);
    $shift = 1;
    if($todayDay =="Sun")
    {
        $today= formatDate($today, $freeDays);
         $shift = 1;
        
    }
}else{
    
    if($todayDay == "Sun"){
        $today = formatDate($today, $freeDays);
        $today = date('Y-m-d', strtotime("+ 1 days"));
        $shift =1;
        
    }else if($todayDay =="Sat")
    {
        if($curentHourstr >= $time1 && $curentHourstr<=$time2 )
            {
                $shift = 1;
            }else{
                $today = date('Y-m-d', strtotime("+2 days"));
                $today = formatDate($today, $freeDays);
                $shift = 1;
            }
    }else{
        if($curentHourstr >= $time1 && $curentHourstr<=$time2 )
        {
            $shift = 1;
        }else if($curentHourstr >= $time3 && $curentHourstr<=$time4)
        {
            $shift = 2;
        }else if($curentHourstr > $time4 && $curentHourstr <= $time5){
            $today = date('Y-m-d', strtotime("+1 days"));
            $today = formatDate($today, $freeDays);
            if($todayDay =="Sun")
            {
                $today = formatDate($today, $freeDays);
                $shift = 1;
            }else if($todayDay =="Sat")
            {
                $today = formatDate($today, $freeDays);
                $shift = 1;
            }
        }
        else{
                // $today = date('Y-m-d', strtotime("+1 days"));
                $today = formatDate($today, $freeDays);
                if($todayDay =="Sun")
                {
                $today = formatDate($today, $freeDays);
                $today = date('Y-m-d', strtotime("+ 1 days"));
                $shift =1;
                }else if($todayDay =="Sat")
                {
                    if($curentHourstr >= $time1 && $curentHourstr<=$time2 )
                    {
                        $shift = 1;
                        }else{
                            $today = date('Y-m-d', strtotime("+2 days"));
                            $today = formatDate($today, $freeDays);
                            $shift = 1;
                        }
                    }else{
                        $shift = 1;

                    }
            }
            $shift = 1;
    }
}
$currentShift = intval($shift);
/*if(in_array($today, $freeDays))
{
    
    $today = formatDate($today, $freeDays);
    $shift = 1;
}else
    {
     if($todayDay == "Sun")
     {
        $today= date('Y-m-d', strtotime("+ 1 days"));
        if(!in_array($today, $freeDays))
        {
            $shift = 1;
             echo "Day: ".$todayDay;
        }else
        {
            $today= date('Y-m-d', strtotime("+ 1 days"));
            if(!in_array($today, $freeDays))
            {
            $shift = 1;
            }else
            {
                $shift = 1;
            }
        }   
      
     }else if($todayDay == "Sat")
        {
            if($curentHourstr >= $time1 && $curentHourstr<=$time2 )
            {
                $shift = 1;
            }else{
                $today= date('Y-m-d', strtotime("+ 2 days"));
                if(!in_array($today, $freeDays)){
                    $shift = 1;
                }else{
                    $today = date('Y-m-d', strtotime("+1 days));
                    $shift = 1;
                }
                
            }
        }else{
            if($curentHourstr >= $time1 && $curentHourstr<=$time2 ){
            $shift = 1;
            }else if($curentHourstr >= $time3 && $curentHourstr<=$time4){
            $shift = 2;
            }else{
            $shift = 1;
            }
        }
   
   
}
 $currentShift = intval($shift);
*/
$profiles = $profileModel->getProfilesByShidtAndDate($currentShift, $today);
if(!empty($profiles)){
 echo json_encode(['status'=>'Valid',"profiles"=>$profiles]);
               
return;
}else{
    echo json_encode(['status'=>'Invalid',"profiles"=>[]]);
}


function formatDate($todayForArray, $holidays)
 {
   $todayForArray = date('Y-m-d');

    $todayTimestamp = strtotime($todayForArray);
    $todayDay = date('D', $todayTimestamp);
  
    do {
        
        if (!in_array($todayForArray, $holidays) ) break;
        $todayForArray= date('Y-m-d', strtotime("+ 1 days"));
    }
    while (true);
    return $todayForArray;
}


?>