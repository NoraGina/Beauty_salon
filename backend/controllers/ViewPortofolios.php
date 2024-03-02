<?php   

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require_once("../models/Portofolios.php");
$path = explode('/', $_SERVER['REQUEST_URI']);
//var_dump($path) ;
$id = intval($path[5]);
$portofolioModel = new Portofolios();
$portofolios=$portofolioModel->getPortofolioByProfileId($id);
if(!empty($portofolios)){
 echo json_encode(['status'=>'Valid',"portofolios"=>$portofolios]);
               
return;
}else{
    echo json_encode(['status'=>'Invalid',"posrtofolios"=>[]]);
}