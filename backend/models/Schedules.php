<?php
require_once('DbModel.php');

class Schedules extends DbModel
{
    protected $userId;
    protected $profileId;
    protected $date;
    protected $shift;
    protected $start;
    protected $end;
    protected $scheduleAppointments;
    protected $scheduleOwner;
    

    public function __construct($uUserId=2, $uProfileId=1, $uDate="2024", $uShift=1, 
    $uStart="7", $uEnd="13", $uScheduleAppointments=0, $uScheduleOwner="C_2024", $uShiftScheduleId=1)
    {
        $this->userId=$uUserId;
        $this->profileId=$uProfileId;
        $this->date=$uDate;
        $this->shift=$uShift;
        $this->start=$uStart;
        $this->end=$uEnd;
        $this->scheduleAppointments=$uScheduleAppointments;
        $this->scheduleOwner=$uScheduleOwner;
        
    }

        //add new schedule
    public function addSchedule($userId, $profileId, $date, $shift, $start, $end, $appointments, $scheduleOwner)
    {
        
        $sql = "INSERT INTO `schedules`(`userId`, `profileId`, `date`,  `shift`, `start`, `end`, `scheduleAppointments`, `scheduleOwner`) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?);";
        // prepared statements
        $myPrep = $this->db()->prepare($sql);
        // s - string, i - integer, d - double, b - blob
        
            $myPrep->bind_param("iisissis", $userId, $profileId, $date, $shift, $start, $end, $appointments, $scheduleOwner);
       
             $myPrep->execute();
        
        return $myPrep->insert_id;
        var_dump($myPrep);
        
        // $myPrep->close();
    }

    //Get schedule by date and  
    public function getScheduleByUserId($userId)
    {
        $sql ="SELECT `users`.`userName`, `schedules`.`id`,`schedules`.`userId`, `schedules`.`profileId`, `schedules`.`date`, `schedules`.`shift`, `schedules`.`start`, `schedules`.`end`, `schedules`.`scheduleAppointments`  FROM  `users` INNER JOIN `schedules` ON `users`.`id` = `schedules`.`userId`  WHERE  `schedules`.`userId` = $userId ORDER BY date DESC LIMIT 30;";
         $result = $this->db()->query($sql);
         if($result){
        return $result->fetch_all(MYSQLI_ASSOC);
            
         }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
         }
    }

    //get last date in schedule by user id
    public function getLastDateByUserId($profileId)
    {
        $sql ="SELECT * FROM `schedules` WHERE `profileId`=$profileId ORDER BY date DESC LIMIT 1;";
         $result = $this->db()->query($sql);
        return $result->fetch_assoc();
    }
//Get avaible appointments by userId
public function getScheduleForAppointments($profileId, $currentDate, $lastDate)
{
    $sql ="SELECT `users`.`userName`, `profiles`.`departmentId`,`profiles`.`image`,
     `schedules`.`id`,`schedules`.`userId`, `schedules`.`profileId`, `schedules`.`date`,
      `schedules`.`start`, `schedules`.`end` 
      FROM `users` 
      INNER JOIN `schedules` ON `users`.`id` = `schedules`.`userId` 
      INNER JOIN `profiles` ON `profiles`.userId= `users`.id 
      WHERE `schedules`.`profileId` = ? AND `schedules`.`scheduleAppointments`< 6
       AND `schedules`.`date` BETWEEN ? AND ?;";

         $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            
            $myPrep->bind_param("iss", $userId, $currentDate, $lastDate);
            $myPrep->execute();
            $result = $myPrep->get_result();
            echo "Error: " . $sql.$this->db()->error;
           
            $final = $result->fetch_all(MYSQLI_ASSOC);
            var_dump($final);
        
         }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
         }
}

    //Get avaible appointments by profileId
public function getAvaibleScheduleByProfileId($profileId, $currentDate, $lastDate)
{
    $sql ="SELECT `users`.`userName`, `profiles`.`departmentId`,`profiles`.`image`,
     `schedules`.`id`,`schedules`.`userId`, `schedules`.`profileId`, `schedules`.`date`,
      `schedules`.`start`, `schedules`.`end` 
      FROM `users` 
      INNER JOIN `schedules` ON `users`.`id` = `schedules`.`userId` 
      INNER JOIN `profiles` ON `profiles`.userId= `users`.id 
      WHERE `schedules`.`profileId` = ? AND `schedules`.`scheduleAppointments`< 6
       AND `schedules`.`date` BETWEEN ? AND ?;";

         $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            
            $myPrep->bind_param("iss", $profileId, $currentDate, $lastDate);
            $myPrep->execute();
            $result = $myPrep->get_result();
            
           
            return $result->fetch_all(MYSQLI_ASSOC);
            
        
         }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
         }
}
    public function getScheduleByUserIdAndDate($userId, $date)
    {
        $sql ="SELECT * FROM `schedules`  WHERE date=$date AND userId=$userId;;";
        $result = $this->db()->query($sql);
        return $result->fetch_assoc();
    }
     //count schedule
     public function countSchedules($date, $userId){
     
         $sql ="SELECT * FROM  `schedules`  WHERE date=$date AND userId=$userId;";
         $myPrep = $this->db()->query($sql);
         if($myPrep){
            
            $result= mysqli_num_rows($myPrep);
            
                return $result;
            
         }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
         }
     }

     //update schedule
     public function updateSchedule($date, $shift, $start, $end, $id)
     {
         $sql = "UPDATE `schedules` SET `date` = ?, `shift`=?, `start`=?,  `end`=? WHERE `schedules`.`id` = $id ";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("ssss", $date, $shift, $start, $end);
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
     }

     public function deleteSchedule($id)
    {
         $sql = "DELETE  FROM `schedules` WHERE `id` = ?";
        $myPrep = $this->db()->prepare($sql);
        if ($myPrep) {
            $myPrep->bind_param("i", $id);
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }

    //get schedules and appointments for staff
    public function getSchedulesAndAppointmentsForStaff($userId)
    {
        $sql ="SELECT `schedules`.`id`, `schedules`.`userId`, `schedules`.`date`, 
        `appointments_shift_one`.`id`,`appointments_shift_one`.`customerName`, 
        `appointments_shift_one`.`customerEmail`, `appointments_shift_one`.`appointmentTime`
         FROM `schedules` INNER JOIN `appointments_shift_one` 
         ON `schedules`.`id`= `appointments_shift_one`.`scheduleId` WHERE `schedules`.`userId`=$userId 
         UNION
          SELECT `schedules`.`id`, `schedules`.`userId`, `schedules`.`date`, 
         `appointments_shift_two`.`id`,`appointments_shift_two`.`customerName`, 
         `appointments_shift_two`.`customerEmail`, `appointments_shift_two`.`appointmentTime` 
         FROM `schedules` INNER JOIN `appointments_shift_two` 
         ON `schedules`.`id`= `appointments_shift_two`.`scheduleId` WHERE `schedules`.`userId`=$userId;";
    }

    //get schedules and appointments by user id and date for staff
    public function getAppointmentsByUserIdAndDateForStaff($userId, $date)
    {
        $sql ="SELECT `schedules`.`id`, `schedules`.`userId`, `schedules`.`date`,
         `appointments_shift_one`.`id`,`appointments_shift_one`.`customerName`,
          `appointments_shift_one`.`customerEmail`, `appointments_shift_one`.`appointmentTime`
           FROM `schedules` INNER JOIN `appointments_shift_one` 
           ON `schedules`.`id`= `appointments_shift_one`.`scheduleId`
            WHERE `schedules`.`userId`=$userId AND `schedules`.`date`=$date 
            UNION 
            SELECT `schedules`.`id`, `schedules`.`userId`, `schedules`.`date`, 
            `appointments_shift_two`.`id`,`appointments_shift_two`.`customerName`, 
            `appointments_shift_two`.`customerEmail`, `appointments_shift_two`.`appointmentTime`
             FROM `schedules` INNER JOIN `appointments_shift_two`
             ON `schedules`.`id`= `appointments_shift_two`.`scheduleId`
              WHERE `schedules`.`userId`=$userId AND `schedules`.`date`=$date;";
    }

     
//SELECT * FROM `schedules` WHERE userId=2 AND scheduleAppointments<6 AND date BETWEEN '2024-02-01' AND '2024-03-01' ORDER BY date;

    //get max date by userId
    public function getMaxDateByUserId($userId)
    {
        $sql="SELECT MAX(date) FROM `schedules` WHERE userId=$userId;";
        $myPrep = $this->db()->query($sql);
        //display data 
        while($row = mysqli_fetch_array($myPrep)){
            $result = $row['MAX(date)'];
            return $result;
        }
    }

    //get schedules for appointments
    public function getAvaibleSchedules($userId, $startDate, $endDate)
    {
        $sql="SELECT `users`.`fullName`, `users`.`userName`, 
        `profiles`.`userId`, `profiles`.`image`, 
        `schedules`.`id`, `schedules`.`date`, `schedules`.`shift` 
        FROM `users` INNER JOIN `profiles` ON `users`.id=profiles.userId 
        INNER JOIN schedules ON `users`.`id`=`schedules`.`userId` 
        WHERE `schedules`.`userId`=$userId AND schedules.scheduleAppointments <6 
        AND schedules.date BETWEEN $startDate AND $endDate ORDER BY `schedules`.`date`;";
        $result = $this->db()->query($sql);
         if($result){
        return $result->fetch_all(MYSQLI_ASSOC);
            
         }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
         }
    }

    //Get schedule by id
     public function getOneScheduleById($id){
        $sql = "SELECT * FROM `schedules` WHERE `id` = ? ; ";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("i", $id);
            $myPrep->execute();
            $result = $myPrep->get_result();
            return $result->fetch_assoc();
        }
    }
    //update schedule scheduleAppointments
     public function updateScheduleAppointments($scheduleAppointments, $id)
     {
         $sql = "UPDATE `schedules` SET `scheduleAppointments` = ? WHERE `schedules`.`id` = $id ";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("i", $scheduleAppointments);
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
     }

     //get latest date from schedules
     public function getLatestDateByUserId($userId)
     {
        $sql ="SELECT date FROM `schedules` WHERE userId=? ORDER BY date LIMIT 1;";
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

     //clean schedules
     public function cleanSchedules($profileId, $startDate, $endDate)
     {
        $sql = "DELETE FROM schedules WHERE profileId = ? AND date BETWEEN ? AND ?;";
        $myPrep = $this->db()->prepare($sql);
        if ($myPrep) {
            $myPrep->bind_param("iss", $profileId, $startDate, $endDate);
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
     }
}
?>