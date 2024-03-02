<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../models/PricesList.php");
require_once("../models/Departments.php");
$path = explode('/', $_SERVER['REQUEST_URI']);
$getId = intval($path[5]);

$priceListModel = new PricesList();
$priceList = $priceListModel->getPricesListByDepartmentId($getId);
if(!empty($priceList) ){
        	echo json_encode(["status"=>"Valid","priceList"=>$priceList]);
			return;
    }else{
        $departmentModel= new Departments();
        $department = $departmentModel->getDepartmentById($getId);
        echo json_encode(["status"=>"Invalid","priceList"=>$department]);
			return;
    }