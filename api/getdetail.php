<?php

$con = mysqli_connect('localhost','wang','123456','test');

  $id = $_GET['id'];

  $sql = "SELECT * FROM `aaa` WHERE `id`='$id'";

  $res = mysqli_query($con,$sql);

  if (!$res) {
    die('数据库链接错误' . mysqli_error($con));
  }

  $row = mysqli_fetch_assoc($res);

  echo json_encode(array(
    "code" => 1,
    "message" => "获取商品信息成功",
    "detail" => $row
  ))

?>
