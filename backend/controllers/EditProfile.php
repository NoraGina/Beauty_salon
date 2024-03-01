<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT, GET, POST");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../models/Profiles.php");

require_once("../models/Departments.php");


$target_dir = 'C:\xampp\htdocs/BeautySalon/backend/uploads/';

$path = explode('/', $_SERVER['REQUEST_URI']);
//$userId = $data->userId;
//var_dump($path);
//$userId = intval($path[5]);

  $departmentId = $_POST['departmentId'];
  $phone = $_POST['phone'];
  $userId = $_POST['userId'];
  $about = $_POST['about'];
  $name = $_POST['userName'];
  $id = $_POST['id'];
  //$userId = $_POST['userId'];
  $oldImage = $_POST['oldImage'];
         
           if(isset($_FILES['file']) )
          {
              $avatar_name = $_FILES["file"]["name"];
              $avatar_tmp_name = $_FILES["file"]["tmp_name"];
              $error = $_FILES["file"]["error"];
              if($error > 0)
            {
               $response = array(
               "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
              );
            }else{
               $departmentModel = new Departments();
               $oneDepartment = $departmentModel->getDepartmentById($departmentId);
               
              $depName = $oneDepartment['name'];
              $imgEx = pathinfo($avatar_name, PATHINFO_EXTENSION);
              $imgExLc = strtolower($imgEx);
              $uniq = uniqid();
              $substrUniq= substr($uniq, -6); 
              $upload_name = $name."-".$depName."-".$substrUniq.".".$imgExLc;
              $profileImgName = preg_replace('/\s+/', '-', $upload_name);
              $targetFile = $target_dir.$profileImgName;
              if(move_uploaded_file($avatar_tmp_name , $targetFile))
              {
                $profileModel = new Profiles();
                $newProfile =  $profileModel->updateProfileWithImage($departmentId, $phone, $profileImgName, $about, $userId);
                if($newProfile)
                {
                  unlink($target_dir.$oldImage);
                  echo json_encode(["status"=>"Valid", "message"=>"The profile has been updated successfully"]);
                }else{
                  echo json_encode(["status"=>"Invalid", "message"=>"Something went wrong whit image!"]);
                }
              }else{
                echo json_encode(["status"=>"Invalid", "message"=>"File no move_uploaded_file!"]);
                return;
              }

            }
          }else{
                $profileModel = new Profiles();
                $newProfile1 = $profileModel->updateProfileWithoutImage($departmentId, $phone,  $about, $userId);
                if($newProfile1 ===TRUE)
                {
                  echo json_encode(["status"=>"Valid", "message"=>"The profile has been updated successfully"]);
                }else{
                  echo json_encode(["status"=>"Invalid", "message"=>"Profile not udpated"]);
                }
          }

?>