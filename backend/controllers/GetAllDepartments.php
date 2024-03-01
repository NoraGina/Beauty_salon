<?php   

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");


require_once("../models/Departments.php");


    $departmentModel = new Departments;
    $departments = $departmentModel->getAllDepartments();
    if(is_array($departments) ){
        	echo json_encode(["status"=>"Valid","departmentList"=>$departments]);
			return;
    }else{
        echo json_encode(["status"=>"Invalid","departmentList"=>[]]);
			return;
    }
 