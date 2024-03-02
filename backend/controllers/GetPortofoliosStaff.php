<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../models/Portofolios.php");

$path = explode('/', $_SERVER['REQUEST_URI']);

$userId = intval($path[5]);
//$userId = $_POST['userId'];
if(isset($userId) && is_numeric($userId))
 {
    $portofolioModel = new Portofolios();
    $portofolios = $portofolioModel-> getPortofoliosByUserId($userId);
    if($portofolios)
    {
        echo json_encode(['status'=>'Valid',"portofolios"=>$portofolios, "message"=>"Portofolios exist"]);
               
return;
    }else{
        echo json_encode(['status'=>'Invalid', "portofolios"=>[], "message"=>"No schedules"]);
    }
    
 }