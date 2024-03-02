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
$id = intval($path[5]);

$userId =$_POST['userId'];
$profileId = $_POST['profileId'];
$title = $_POST['title'];
$description = $_POST['description'];
$name = $_POST['userName'];
$oldImage = $_POST['oldImage'];
 if(isset($_FILES['file']) )
 {
    $avatar_name = $_FILES["file"]["name"];
    $avatar_tmp_name = $_FILES["file"]["tmp_name"];
    $error = $_FILES["file"]["error"];
    if($error > 0)
    {
         echo json_encode(["status"=>"Invalid",  "message" => "Error uploading the file!"]);
    }else
    {
        $titleToAdd = $title."-".$name;
        $imgEx = pathinfo($avatar_name, PATHINFO_EXTENSION);
        $imgExLc = strtolower($imgEx);
        $uniq = uniqid();
        $substrUniq= substr($uniq, -6); 
        $imgString = sanitaze($title);
        $upload_name = $imgString."-".$name."-".$substrUniq.".".$imgExLc;
        $portofolioImgName = preg_replace('/\s+/', '-', $upload_name);
        $targetFile = $target_dir.$portofolioImgName;
        if(move_uploaded_file($avatar_tmp_name , $targetFile))
        {
            $portofolioModel = new Portofolios();
            $updatedPortofolio=  $portofolioModel->updatePortofolio($titleToAdd, $portofolioImgName, $description, $id);
            if($updatedPortofolio)
            {
                unlink($target_dir.$oldImage);
                 echo json_encode(["status"=>"Valid", "message"=>"The portofolio has been updated successfully"]);
            }else
            {
                echo json_encode(["status"=>"Invalid", "message"=>"The portofolio has  not been updated successfully"]);
            }
        }else{
            echo json_encode(["status"=>"Invalid", "message"=>"The portofolio has  not been move successfully"]);
        }
    }
 }
function checkAccents($str){
        $accented_array = array('Ă'=>'A', 'Â'=>'A', 'ă'=>'a', 'â'=>'a', 'Î'=>'I', 'î'=>'i', 'ș'=>'s', 'Ș'=>'S', 'ț'=>'t','Ț'=>'Ț','?'=>'','-'=>'', '/'=>'','('=>'',')'=>'' );
        foreach($accented_array as $letter){
            if (stripos($str, $letter)) {
                return true;
            }
        }
        
    }
    function dashToCamelCase($string, $capitalizeFirstCharacter = false) {
        $strNoAccents = replace_accents($string);
    
            $str = str_replace(' ', '', ucwords(str_replace('_', ' ',  $strNoAccents)));
        if (!$capitalizeFirstCharacter) {
           $str = lcfirst($str);
        }
        return $str;
    }
     function replace_accents($str) {
        $accented_array = array('Ă'=>'A', 'Â'=>'A', 'ă'=>'a', 'â'=>'a', 'Î'=>'I', 'î'=>'i', 'ș'=>'s', 'Ș'=>'S', 'ț'=>'t','Ț'=>'Ț','?'=>'','-'=>'', '/'=>'','('=>'',')'=>'');

        $required_str = strtr( $str, $accented_array );
        return $required_str;
    }
function noDiacritsToCamelCase($string, $capitalizeFirstCharacter = false) {
        if(strpos($string,' ')){
            $str = str_replace(' ', '', ucwords($string));
            if (!$capitalizeFirstCharacter) {
            $str = lcfirst($str);
            }
            return $str;
        }elseif(strpos($string,'-')){
            $str = str_replace('-', '', ucwords(str_replace('_','',$string)));
            if (!$capitalizeFirstCharacter) {
            $str = lcfirst($str);
            }
            return $str;
        }
       
    }
function sanitaze($string){
        $newString ="";
        if(str_word_count($string)> 1){
            if(checkAccents($string)){
                $newString= dashToCamelCase($string);
                return $newString;
            }else{
               $newString=noDiacritsToCamelCase($string);
               return $newString;
            }
            
        }else{
            if(checkAccents($string)){
                $newString = strtolower($this->replace_accents($string));
                return $newString;
            }else{
               $newString = strtolower($string);
               return $newString;
            }
        }
        return $newString;
    }

function stringMaker($str){
    $str = replace_accents($str);
    if ($str == trim($str) && preg_match('/\s/',$str)) {
        return str_replace(' ', '_', $str);
    }
    return $str;
}
?>