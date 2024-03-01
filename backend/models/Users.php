<?php
require_once('DbModel.php');
class Users extends DbModel{
    protected $fullName;
    protected $userName;
    protected $email;
    protected $hashedPassword;
    protected $role;
    protected $uniqueNumber;
    

    public function __construct($uFullName="A", $uUserName='D', $uEmail='email', 
                    $uHash='dfddfsff', $uRole='cust', $uUniqueNumber="214sa")
    {
       $this->fullName=$uFullName;
        $this->userName = $uUserName;
        $this->email = $uEmail;
        $this->hashedPassword = $uHash;
        $this->role =$uRole;
        $this->uniqueNumber =$uUniqueNumber;
         
    }
 //function get one user user   
     public function getOneUserByUserName($uName){
        $sql = "SELECT * FROM `users` WHERE `userName` = ? ; ";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("s", $uName);
            $myPrep->execute();
            $result = $myPrep->get_result();
            return $result->fetch_assoc();
        }
    }
    //count user By UserName
    public function countUserByUserName($userName)
    {
        $sql ="SELECT COUNT(`userName`) FROM `users` WHERE userName=$userName;";
        return $this->db()->query($sql);
    }
     //count users
     public function checkIfUserExist($userName){
        $sql = "SELECT * FROM `users`  WHERE `userName` = $userName ; ";
         $myPrep = $this->db()->query($sql);
         if($myPrep){
            
            $result= mysqli_num_rows($myPrep);
            
                return $result;
            
         }
     }
      //add user
    public function addUser($fullName,$user, $email, $hPass, $uRole, $uUniqueNumber )
    {
        
        $sql = "INSERT INTO `users`(`fullName`, `userName`, `email`,  `hashedPassword`, `role`, `uniqueNumber`) VALUES (?, ?, ?, ?, ?, ?);";
        // prepared statements
        $myPrep = $this->db()->prepare($sql);
        // s - string, i - integer, d - double, b - blob
        if($myPrep){
            $myPrep->bind_param("ssssss", $fullName, $user, $email,  $hPass, $uRole, $uUniqueNumber);
       
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
        
        
        
        // $myPrep->close();
    }

    //Get all users
     public function getAllUsers()
    {
        $sql = "SELECT *  FROM `users` ;";
        $myPrep = $this->db()->prepare($sql);
        if ($myPrep) {
           
            $myPrep->execute();
            $result = $myPrep->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }

    }
    //function get one user user   
     public function getUserById($id){
        $sql = "SELECT * FROM `users` WHERE `id`=?; ";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("i", $id);
            $myPrep->execute();
            $result = $myPrep->get_result();
            return $result->fetch_assoc();
        }

     } 

     //set  profileId
    public function updateUserSetProfileId($userId, $profileId)
    {
        $sql = "UPDATE `users` SET `profileId` = IFNULL(NULL, ?) WHERE `users`.`id` = $userId ";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("i", $profileId);
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }
    
    //set Null profileId
    public function setNullProfileId($userId)
    {
        $sql = "UPDATE `users` SET `profileId` = NULL  WHERE `users`.`id` = ? ";
        $myPrep = $this->db()->prepare($sql);
        if ($myPrep) 
        {
            $myPrep->bind_param("i", $userId);
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }

    //Delete user function
    public function deleteUser($id)
    {
         $sql = "DELETE  FROM `users` WHERE `id` = ?";
        $myPrep = $this->db()->prepare($sql);
        if ($myPrep) {
            $myPrep->bind_param("i", $id);
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }

    //update User
    public function updateUser($fullName, $userName, $email,  $hashedPassword, $role,$uniqueNumber, $userId)
    {
        $sql = "UPDATE `users` SET `fullName` = ?, `userName`=?, `email`=?,  `hashedPassword`=?, `role`=?, `uniqueNumber`=? WHERE `users`.`id` = $userId ";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("ssssss", $fullName, $userName, $email, $hashedPassword, $role, $uniqueNumber);
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }

}