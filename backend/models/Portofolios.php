<?php

require_once('DbModel.php');
class Portofolios extends DbModel
{
    protected $userId;
    protected $profileId;
    protected $title;
    protected $image;
    protected $description;
    protected $departmentId;

    public function __construct($pUserId=2, $pProfileId=1, $pTitle="Ali", $pImage="png", $pDescription="Ever", $pDepartmentId=1)
    {
        $this->userId=$pUserId;
        $this->profileId=$pProfileId;
        $this->title=$pTitle;
        $this->image=$pImage;
        $this->description=$pDescription;
        $this->departmentId=$pDepartmentId;

    }

    //add portofolio
    public function addPortofolio($userId, $profileId, $title, $image, $description, $departmentId)
    {
        
        $sql = "INSERT INTO `portofolios`(`userId`, `profileId`, `title`,  `image`, `description`, `departmentId`) VALUES ( ?, ?, ?, ?, ?, ?);";
        // prepared statements
        $myPrep = $this->db()->prepare($sql);
        // s - string, i - integer, d - double, b - blob
        if($myPrep){
            $myPrep->bind_param("iisssi", $userId, $profileId, $title, $image, $description, $departmentId);
       
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
        // $myPrep->close();
    }

    // get last portofolio
    public function getLastPortofolio(){
        $sql ="SELECT * FROM `portofolios` ORDER BY id DESC LIMIT 1;";
        $result = $this->db()->query($sql);
        return $result->fetch_assoc();
    }

    //Get portofolios by userId
    public function getPortofoliosByUserId($userId)
    {
         $sql ="SELECT `users`.`userName`, `departments`.`name`,`portofolios`.`id`,`portofolios`.`userId`, `portofolios`.`profileId`, `portofolios`.`title`, `portofolios`.`image`, `portofolios`.`description` FROM `users` INNER JOIN `portofolios` ON `users`.`id` = `portofolios`.`userId` INNER JOIN `departments` ON `departments`.`id`=`portofolios`.`departmentId` WHERE `portofolios`.`userId` = $userId;"; 
         $result = $this->db()->query($sql);
         if($result){
        return $result->fetch_all(MYSQLI_ASSOC);
            
         }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
         }
    }
    //get portofolio by id
     public function getPortofolioById($id)
    {
        
         $sql ="SELECT `users`.`userName`, `departments`.`name`,`portofolios`.`id`,`portofolios`.`userId`, `portofolios`.`profileId`, `portofolios`.`title`, `portofolios`.`image`, `portofolios`.`description` FROM `users` INNER JOIN `portofolios` ON `users`.`id` = `portofolios`.`userId` INNER JOIN `departments` ON `departments`.`id`=`portofolios`.`departmentId` WHERE `portofolios`.`id` = $id;"; 
         $result = $this->db()->query($sql);
         if($result){
           return  $result->fetch_assoc();

         }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
         }
    }
//get portofolios by profileId
public function getPortofolioByProfileId($profileId)
{
     $sql ="SELECT `users`.`userName`, `departments`.`name`,`portofolios`.`id`,`portofolios`.`userId`, `portofolios`.`profileId`, `portofolios`.`title`, `portofolios`.`image`, `portofolios`.`description` FROM `users` INNER JOIN `portofolios` ON `users`.`id` = `portofolios`.`userId` INNER JOIN `departments` ON `departments`.`id`=`portofolios`.`departmentId` WHERE `portofolios`.`profileId` = $profileId;"; 
         $result = $this->db()->query($sql);
         if($result){
        return $result->fetch_all(MYSQLI_ASSOC);
            
         }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
         }
}

    //update portofolio 
    public function updatePortofolio($title, $image, $description, $id)
    {
        $sql = "UPDATE `portofolios` SET `title` = ?,  `image` = ?, `description` = ?  WHERE `portofolios`.`id` = ?";
        $myPrep = $this->db()->prepare($sql);
         if($myPrep)
        {
            $myPrep->bind_param("sssi", $title, $image, $description, $id);
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }

    //Delete profile
    public function deletePortofolio($id)
    {
        $sql = "DELETE  FROM `portofolios` WHERE `id` = ?";
        $myPrep = $this->db()->prepare($sql);
        if ($myPrep) {
            $myPrep->bind_param("i", $id);
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }
   
}