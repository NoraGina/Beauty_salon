 <?php   

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
 header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once("../models/Users.php"); 

$data = json_decode(file_get_contents('php://input'));
   
$fullName = $data->fullName;
$email = $data->email;
$password = $data->password;
$userName = $data->userName;
$role = $data->role;
$hash = password_hash($password, PASSWORD_DEFAULT);
$uniq = uniqid();
$uniqueNumber = substr($uniq, -6);

$user = new Users();


    $newUser = $user->addUser($fullName,$userName, $email, $hash, $role, $uniqueNumber );
     if($newUser === TRUE){
                echo json_encode(['status'=>'Valid',"message"=>"User was created successfully!"]);
                return;
               } else {
                echo json_encode(['status'=>'Invalid',"message"=>" Something went wrong!"]);
                return;
              }

