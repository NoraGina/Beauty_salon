<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../models/PricesList.php");

$priceListModel = new PricesList();
$priceList = $priceListModel->getAllPriceList();
if(is_array($priceList) ){
        	echo json_encode(["status"=>"Valid","priceList"=>$priceList]);
			return;
    }else{
        echo json_encode(["status"=>"Invalid","priceList"=>[]]);
			return;
    }