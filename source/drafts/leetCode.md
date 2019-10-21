---
title: leetCode
tags:
    - js
categories: js
---

### 反转整数
利用数组反转的特性 reverse()
1.将整数转化为数组 
  arr= x.toString().split('') 
  123 => "123" =>["1","2","3"] 
  -123=>"-123"=>["-","1","2","3"]
2.判断数组正负 
  x<0 数组去头反转
  x>0 正常反转
3.进行反转->转换为数字
  x<0  ans = Number(arr.shift().reverse().join('')) 
  x>0  ans = Number(arr.reverse().join(''))
4.判断反转后的数字是否仍在整数范围 : 
  负值: - (1 << 30) * 2  正值:(1 << 30) * 2 - 1
  超出范围则返回0
  未超出范围则判断原值正负 x>0 ans x<0 -ans