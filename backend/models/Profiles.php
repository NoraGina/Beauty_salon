<?php
require_once('DbModel.php');
class Profiles extends DbModel
{
    protected $userId;
    protected $departmentId;
    protected $phone;
    protected $image;
    protected $about;
    protected $hasPortofolio;
    
    public function __construct($uUserId=1, $uDepartmentId=1, $uPhone="070", 
                    $uImage='dfddfsff', $uAbout='cust', $uHasPortofolio=1)
    {
       $this->userId=$uUserId;
        $this->departmentId = $uDepartmentId;
        $this->phone = $uPhone;
        $this->image = $uImage;
        $this->about =$uAbout;
        $this->hasPortofolio = $uHasPortofolio;
         
    }

       //add new profile
    public function addProfile($userId, $departmentId, $phone, $image, $about, $hasPortofolio )
    {
        
        $sql = "INSERT INTO `profiles`(`userId`, `departmentId`, `phone`,  `image`, `about`,`hasPortofolio`) VALUES (?, ?, ?, ?, ?,?);";
        // prepared statements
        $myPrep = $this->db()->prepare($sql);
        // s - string, i - integer, d - double, b - blob
        if($myPrep){
            $myPrep->bind_param("iisssi", $userId, $departmentId, $phone,  $image, $about, $hasPortofolio);
       
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
        
        
        
        // $myPrep->close();
    }

    //Get one profile inner user
    public function getProfileForAdminAndStaff($userId){
        $sql = "SELECT `users`.`fullName`, `users`.`userName`, `users`.`email`, `profiles`.`id`, 
        `profiles`.`userId`,`profiles`.`image`,`profiles`.`phone`, `profiles`.`about`, 
        `profiles`.`departmentId`, `departments`.`name` FROM `users` 
        INNER JOIN `profiles` ON `users`.`id` = `profiles`.`userId` INNER JOIN `departments` ON `profiles`.`departmentId` = `departments`.`id` WHERE `profiles`.`userId` = ?; ";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("i", $userId);
            $myPrep->execute();
            $result = $myPrep->get_result();
            return $result->fetch_assoc();
        }
    }

    //get profileId
    public function getProfileId($userId)
    {
        $sql = "SELECT id FROM `profiles` WHERE userId=?;";
        $stmt = $this->db()->prepare($sql);
        if($stmt){
            $stmt->bind_param("i", $userId);
            $stmt->execute();
        $rdv_verif = $stmt->get_result()->fetch_row()[0];
        return $rdv_verif;
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
        
    }

    // get last profile
    public function getLastProfile(){
        $sql ="SELECT * FROM `profiles` ORDER BY id DESC LIMIT 1;";
        $result = $this->db()->query($sql);
        return $result->fetch_assoc();
    }

    // get last profile
    public function getProfileByUserId($userId){
        $sql ="SELECT * FROM `profiles` WHERE userId =$userId;";
        $result = $this->db()->query($sql);
        return $result->fetch_assoc();
    }

    //Delete profile
    public function deleteProfile($id)
    {
        $sql = "DELETE  FROM `profiles` WHERE `id` = ?";
        $myPrep = $this->db()->prepare($sql);
        if ($myPrep) {
            $myPrep->bind_param("i", $id);
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }

    //update profile with image
    public function updateProfileWithImage($departmentId, $phone, $image, $about, $userId)
    {
        $sql = "UPDATE `profiles` SET `departmentId` = ?,  `phone` = ?,`image` = ?, `about` = ?  WHERE `profiles`.`userId` = $userId";
        $myPrep = $this->db()->prepare($sql);
         if($myPrep)
        {
            $myPrep->bind_param("isss", $departmentId, $phone, $image, $about);
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }

     //update profile without image
    public function updateProfileWithoutImage($departmentId, $phone,  $about, $userId)
    {
        $sql = "UPDATE `profiles` SET `departmentId` = ?,  `phone` = ?,`about` = ?  WHERE `profiles`.`userId` = $userId";
        $myPrep = $this->db()->prepare($sql);
         if($myPrep)
        {
            $myPrep->bind_param("iss", $departmentId, $phone,  $about);
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }

    //update hasPortofolio
    public function updateHasPortofolio( $id)
    {
         $sql = "UPDATE `profiles` SET `hasPortofolio` = IF(hasPortofolio!= 1, 1, hasPortofolio) WHERE `profiles`.`id` = ?";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("i", $id);
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }
     //update hasPortofolio to false
    public function updateHasPortofolioFalse( $id)
    {
         $sql = "UPDATE `profiles` SET `hasPortofolio` = 0 WHERE `profiles`.`id` = ?";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("i", $id);
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }

    //get all profiles for team
    public function getAllProfilesForTeam()
    {
        $sql ="SELECT `users`.`fullName`, `users`.`userName`, `users`.`email`, `profiles`.`id`, 
        `profiles`.`userId`,`profiles`.`image`,`profiles`.`phone`, `profiles`.`about`, 
        `profiles`.`departmentId`,`profiles`.`hasPortofolio`,`departments`.`name`
        FROM `users` INNER JOIN `profiles` ON `users`.`id` = `profiles`.`userId` 
        INNER JOIN `departments` ON `profiles`.`departmentId` = `departments`.`id`;";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            
            $myPrep->execute();
            $result = $myPrep->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }

    }

    //Get all profiles by shift and date
    public function getProfilesByShidtAndDate($shift, $date)
    {
        $sql ="SELECT `users`.`fullName`, `users`.`userName`, `users`.`email`, `profiles`.`id`, 
        `profiles`.`userId`,`profiles`.`image`,`profiles`.`phone`, `profiles`.`about`, 
        `profiles`.`departmentId`,`profiles`.`hasPortofolio`,`departments`.`name`, 
        `schedules`.`date`, `schedules`.`shift`, `schedules`.`scheduleAppointments` 
        FROM `users` INNER JOIN `profiles` ON `users`.`id` = `profiles`.`userId` 
        INNER JOIN `departments` ON `profiles`.`departmentId` = `departments`.`id` 
        INNER JOIN `schedules` ON `schedules`.`userId`= `profiles`.`userId` 
        WHERE `schedules`.`shift` = ? AND `schedules`.`date` = ?;";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("is", $shift, $date);
            $myPrep->execute();
            $result = $myPrep->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }

}