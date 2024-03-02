<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../models/PricesList.php"); 
$data = json_decode(file_get_contents('php://input'));

$departmentId =  $data->departmentId;
$title =  $data->title;
$price =doubleval( $data->price);

$priceListModel = new PricesList();
$newPriceList = $priceListModel->newPriceList($departmentId, $title, $price);
if($newPriceList === TRUE){
echo json_encode(['status'=>'Valid',"message"=>"Price list was created successfully!"]);
return;
} else {
echo json_encode(['status'=>'Invalid',"message"=>" Something went wrong!"]);
return;
}