<?php
class DBModel
{
    protected $conn;

    public function db(){
        $this->conn = new mysqli('localhost', 'myuser1', '123', 'php_react');
        if($this->conn->connect_error){
            die('Connection error!');
        }
        return $this->conn;
    } 
}
?>