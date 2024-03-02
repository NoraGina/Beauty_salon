<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../models/Departments.php"); 

$path = explode('/', $_SERVER['REQUEST_URI']);
//var_dump($path) ;
$id = intval($path[5]);
$departmentModel = new Departments();
$department= $departmentModel->getDepartmentById($id);
if(!empty($department)){
    echo json_encode(["status"=>"Valid","departmentList"=>$department, "message"=>"Department founded"]);
        }else{
             echo json_encode(["status"=>"Invalid","departmentList"=>[], "message"=>"No department founded"]);
        }
