<?php   

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: PUT, GET, POST");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../models/Profiles.php");
require_once("../models/Departments.php");
require_once("../models/Users.php");



$target_dir = 'C:\xampp\htdocs/BeautySalon/backend/uploads/';
  if($_FILES['file'] )
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
               
              
              $phone = $_POST['phone'];
              $userId =$_POST['userId'];
              $about = $_POST['about'];
              $departmentId = $_POST['departmentId'];
              $name = $_POST['userName'];
              $hasPortofolio = 0;
              $departmentModel = new Departments;
              
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
                $profileModel = new Profiles;
                $newProfile =  $profileModel->addProfile($userId, $departmentId, $phone, $profileImgName, $about, $hasPortofolio );
                if($newProfile)
                {
                  $usersModel = new Users();
                  $lastProfile = $profileModel->getLastProfile();
                  $profileId = $lastProfile['id'];
                  
                  $updateUser = $usersModel->updateUserSetProfileId($userId, $profileId);
                  if($updateUser)
                  {
                    echo json_encode(["status"=>"Valid", "message"=>"New profile has been created successfully"]);
                  }else{
                    echo json_encode(["status"=>"Invalid", "message"=>"User not updated!"]);
                  }
                  
                }else{
                  echo json_encode(["status"=>"Invalid", "message"=>"Something went wrong!"]);
                }
              }else{
                echo json_encode(["status"=>"Invalid", "message"=>"File no move_uploaded_file!"]);
                
              }

            }
          }    