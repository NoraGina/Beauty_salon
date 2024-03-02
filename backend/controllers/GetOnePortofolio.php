<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../models/Portofolios.php"); 

$path = explode('/', $_SERVER['REQUEST_URI']);
//var_dump($path) ;
$id = intval($path[5]);

$portofolioModel = new Portofolios();
$portofolio = $portofolioModel->getPortofolioById($id);
if(!empty($portofolio))
        {
            echo json_encode(["status"=>"Valid","portofolio"=>$portofolio, "message"=>"Portofolio founded"]);
        }else{
             echo json_encode(["status"=>"Invalid","portofolio"=>[], "message"=>"No portofolio founded"]);
        }

?>