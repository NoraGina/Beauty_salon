<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT, GET, POST");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../models/Profiles.php");
require_once("../models/Portofolios.php");



$target_dir = 'C:\xampp\htdocs/BeautySalon/backend/uploads/';

$path = explode('/', $_SERVER['REQUEST_URI']);
//$userId = $data->userId;
$id= intval($path[5]);
$profileId= intval($path[6]);
$userId = intval($path[7]);

$portofoliosModel = new Portofolios();
$onePortofolio = $portofoliosModel->getPortofolioById($id);

$oldImage = $onePortofolio['image'];

$deletePortofolio = $portofoliosModel->deletePortofolio($id);
if($deletePortofolio)
{
    unlink($target_dir.$oldImage);
    $portofolios = $portofoliosModel->getPortofoliosByUserId($userId);
    $countPortofolio = count($portofolios);
    if($countPortofolio == 0){
        $profileModel = new Profiles();
        $profileModel->updateHasPortofolioFalse($profileId);
        
    }
    echo json_encode(["status"=>"Valid", "message"=>"Portofolio deleted"]);
    
   
}else{
    echo json_encode(["status"=>"Invalid", "message"=>"Portofolio deleted"]);
}

?>