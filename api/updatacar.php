<?php
    $id = $_GET['id'];
    $num = $_GET['num'];
    $username = $_GET['username'];

    $con = mysqli_connect('localhost','wang','123456','test');

    $sql = "UPDATE `car` SET `num` = '$num' WHERE `username`= '$username' AND `id` = '$id'";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接失败'  . mysqli_error($con));
    }

    print_r(json_encode(array('code'=>$res,'msg'=>'修改成功'),JSON_UNESCAPED_UNICODE));

?>