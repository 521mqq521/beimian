<?php

$conn = new mysqli('localhost','root','root','data');

$result = $conn->query("select * from taobaogoods1");

$conn->query('SET NAMES UTF8');

$arr = array();
for($i=0;$i<$result->num_rows;$i++){
    $arr[$i] = $result->fetch_assoc();
}

echo json_encode($arr);