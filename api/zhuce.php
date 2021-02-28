<?php
     $username = $_POST['username'];
     $password = $_POST['password'];
     $con = mysqli_connect('localhost','wang','123456','test');
     $sql = "SELECT *  FROM `students` WHERE `username` = '$username' AND `password` = '$password'";
     $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);
    print_r($row);
    if (!$row) {
        $addSql = "INSERT INTO `students` VALUES (null, '$username', '$password' )";
        $addRes = mysqli_query($con,$addSql);
        if(!$addRes){
            die('数据库链接错误' . mysqli_error($con));
        }
        echo json_encode(array(
            "code" => 1,
            "message" => "注册成功"
          ));

    }else{
        echo json_encode(array(
            "code" => 0,
            "message" => "注册失败"
          ));
    }
?>