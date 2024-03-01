<?php
require_once('DbModel.php');

class Appointments extends DbModel
{
     protected $profileId;
    protected $scheduleId;
    protected $customerName;
    protected $customerEmail;
    protected $appointmentDate;
    protected $appointmentTime;
    protected $services;

     public function __construct($aProfileId=2, $aScheduleId=1, $aCustomerName="Ali",
      $acustomerEmail="a@ns", $aAppointmentDate="2024", $aAppointmentTime="7:00", $aServices="Tuns"){
        $this->profileId = $aProfileId;
        $this->scheduleId=$aScheduleId;
        $this->customerName = $aCustomerName;
        $this->customerEmail = $acustomerEmail;
        $this->appointmentDate = $aAppointmentDate;
        $this->appointmentTime = $aAppointmentTime;
        $this->services = $aServices;
     }


    //add first appointment without customer
    public function addFirstAppointment($scheduleId,$profileId, $appointmentTime)
    {
        $sql = "INSERT INTO `appointments` (`scheduleId`, `appointmentTime`) VALUES(?, ?)";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("is", $scheduleId, $appointmentTime);
       
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }

    //Add appointment
    public function addAppointment($profileId, $scheduleId,$customerName, $customerEmail, 
    $appointmentDate, $appointmentTime, $services)
    {
        $sql = "INSERT INTO `appointments` (`profileId`,`scheduleId`, `customerName`, `customerEmail`,
         `appointmentDate`,`appointmentTime`, `services`) VALUES(?, ?, ?, ?, ?, ?, ?)";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("iisssss", $profileId, $scheduleId, $customerName, $customerEmail, $appointmentDate, $appointmentTime, $services);
       
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }
    //Get All appointments by profileId
    public function getAllAppointmentsByProfileId($profileId)
    {
        $sql = "SELECT * FROM `appointments` WHERE `profileId`=?";
         $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("i", $profileId);
            $myPrep->execute();
            $result = $myPrep->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);;
        
         }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
         }
    }
    //Appointments for staff
    public function getAppointmentsForStaff($profileId)
    {
        $sql = "SELECT `users`.userName, `profiles`.`departmentId`, `appointments`.`id`, 
        `appointments`.`profileId`, `appointments`.`scheduleId`, `appointments`.`customerName`, 
        `appointments`.`customerEmail`, `appointments`.`appointmentDate` ,
        `appointments`.`appointmentTime`, `appointments`.`services`
         FROM `users` INNER JOIN `profiles` ON `users`.`id`= `profiles`.`userId` 
         INNER JOIN `appointments` ON `profiles`.`id` =`appointments`.`profileId` 
          WHERE `appointments`.`profileId` =?;";
         $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("i", $profileId);
            $myPrep->execute();
            $result = $myPrep->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);;
        
         }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
         }
    }
    
}