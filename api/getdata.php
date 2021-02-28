<?php
   $con =mysqli_connect('localhost' , 'wang' , '123456' , 'test');
 
   $start = $_GET['start'];
   $len = $_GET['len'];
  
   $s = ($start-1)*$len;
  
   $sql = "SELECT * FROM `aaa` LIMIT $s,$len";

   $res = mysqli_query($con,$sql);

   if(!$res){
       die('数据库链接错误' . mysqli_error($con));
   }

   $dataArr = array();
   $row = mysqli_fetch_assoc($res);
   while($row){
       array_push($dataArr,$row);
       $row = mysqli_fetch_assoc($res);
   }

   $sql2 = "SELECT COUNT(*) `count` FROM `aaa`";
   $res2 = mysqli_query($con,$sql2);
 
   if (!$res2) {
    die('数据库链接错误' . mysqli_error($con));
   }
   $row2 = mysqli_fetch_assoc($res2);

   echo json_encode(array(
    "total" => $row2['count'],
    "list" => $dataArr,
    "code" => 1,
    "message" => "获取列表数据成功"
  ));
?>