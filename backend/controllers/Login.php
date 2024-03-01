 <?php   
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Headers: Content-Type");

require_once("../models/Users.php"); 
 
        
   $data = json_decode(file_get_contents('php://input'));
   
$password = $data->password;
$userName = $data->userName;


    $user = new Users();
    $newUser = $user->getOneUserByUserName($data->userName);
  
     $password2 = $newUser['hashedPassword'];
    
    if(password_verify($password, $password2)){
        $viewjson["id"] = $newUser['id'];
        $viewjson["fullName"] = $newUser['fullName'];
        $viewjson["email"] = $newUser['email'];
        $viewjson["userName"] = $newUser['userName'];
        $viewjson["role"] = $newUser['role'];
        
        $json_array["userdata"] = $viewjson;
     $data=["status"=>"Valid","userlist"=>$json_array, "message"=>"Successfuly loggedin"];
      echo json_encode($data);
		return;
    }else{
        echo json_encode(["status"=>"Invalid","userlist"=>[], "message"=>"Wrong password"]);
        
		return;
    }
 