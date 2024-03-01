<?php
require_once('DbModel.php');

class Departments extends DbModel
{
    protected $name;

     public function __construct($uName="coff"){
        $this->name = $uName;
     }

    //function get one Department   
     public function getDepartmentById($departmentId){
        $sql = "SELECT * FROM `departments` WHERE `id` = ? ; ";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("i", $departmentId);
            $myPrep->execute();
            $result = $myPrep->get_result();
            return $result->fetch_assoc();
        }
    }

    //Get all departments
     public function getAllDepartments()
    {
        $sql = "SELECT *  FROM `departments` ;";
        $myPrep = $this->db()->prepare($sql);
        if ($myPrep) {
           
            $myPrep->execute();
            $result = $myPrep->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }

    }
}