<?php
require_once('DbModel.php');
class PricesList extends DbModel
{
    protected $departmentId;
    protected $serviceName;
    protected $price;

    public function __construct($pDepartmentId=1, $pServiceName="Tuns", $pPrice=50.00)
    {
        $this->departmentId = $pDepartmentId;
        $this->serviceName = $pServiceName;
        $this->price=$pPrice;
    }

    public function getPricesListByDepartmentId($departmentId)
    {
         $sql = "SELECT `prices_list`.`id`, `prices_list`.`departmentId`, `prices_list`.`serviceName`, `prices_list`.`price`, `departments`.`name` FROM `prices_list` INNER JOIN `departments` ON `prices_list`.departmentId = `departments`.id WHERE `prices_list`.`departmentId` = ?; ; ";
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("i", $departmentId);
            $myPrep->execute();
            $result = $myPrep->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        }
    }

     public function getPricesListByDepId($departmentId){
        $sql = "SELECT * FROM `prices_list` WHERE `departmentId` = ? ; ";
        $myPrep = $this->db()->prepare($sql);
        $myPrep = $this->db()->prepare($sql);
        if($myPrep){
            $myPrep->bind_param("i", $departmentId);
            $myPrep->execute();
            $result = $myPrep->get_result();
            return $result->fetch_all(MYSQLI_ASSOC);
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }

    public function newPriceList($departmentId, $serviceName, $price)
    {
        $sql ="INSERT INTO `prices_list` ( `departmentId`, `serviceName`, `price`) VALUES (?, ?, ?);";
         $myPrep = $this->db()->prepare($sql);
         if($myPrep){
            $myPrep->bind_param("isd", $departmentId, $serviceName, $price);
       
            return $myPrep->execute();
        }else{
            echo "Error: " . $sql . "<br>" . $this->db()->error;
        }
    }

    //Get all 
     public function getAllPriceList()
    {
        $sql = "SELECT *  FROM `prices_list` ;";
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