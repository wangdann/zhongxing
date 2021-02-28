<?php
    $id = $_POST['id'];
    $username = $_POST['username'];
    $num=$_POST['num'];

    $con = mysqli_connect('localhost','wang','123456','test');

    $sql = "SELECT *  FROM `car` WHERE `username` = '$username' AND `id` = '$id' ";

    $res = mysqli_query($con,$sql);

    if(!$res){
        die('数据库链接错误' . mysqli_error($con));
    }
    $row = mysqli_fetch_assoc($res);

    if(!$row){
        // 说明不存在 这个用户名对应的这个条goods_id
        // 把这条数据添加到购物车表
        $addSql = "INSERT INTO `car` VALUES (null, '$username', '$id', '$num')";

        $addRes = mysqli_query($con,$addSql);
        if(!$addRes){
            die('数据库链接错误' . mysqli_error($con));
        }
        print_r(json_encode(array('code'=>$addRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE));
    }else{
        $numRes = $num+$row['num'];
        $updat = "UPDATE `car` SET `num` = '$numRes' WHERE `username` = '$username' AND `id` = '$id'";

        $updataRes = mysqli_query($con,$updat);

         if(!$updataRes){
            die('数据库链接错误' . mysqli_error($con));
        }
        print_r(json_encode(array('code'=>$updataRes,"msg"=>"添加成功"),JSON_UNESCAPED_UNICODE));
    }
?>