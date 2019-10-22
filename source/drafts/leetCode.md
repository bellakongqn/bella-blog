---
title: leetCode
tags:
    - js
categories: js
---

### 反转整数 123->321  -123->-321 10.21
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

### 判断一个数是否为回文数 101=101 √  201≠102 × 10.22
1.数字->字符串 a.toString()
2.数字->字符串->数组->反转->字符串 a.toString().split('').reverse().join("")
3.判断两个字符串是否相等

### 罗马数字转整数 IVVVV=19=(5-1)+5+5+5=19
1.避免使用switch来判断赋值，首先使用一个对象将罗马数字对应的值存储起来 hash['I']=1;
2.对罗马数字进行遍历（一般情况下大数在前，小数在后，当小数在前大数在后时，需要用大数减去小数）：
  首先判断当前是不是为最后一个数字
  是：后一个数则为0
  否：判断后一个数是否大于前一个数
     是：用大数减去小数，计算出当下数组的和，🐖：并循环+1  sum+=nextItem-item; i++;
     否：加上当下的数字；循环不用+1 sum+=item;

### 最长公共前缀 ["flower","flow","flight"]->"fl"
1.首先判断数组是否为空 如果为空 则最长公共前缀为"",不为空再进行下列操作
2.找出字符串数组中的最短字符串长度 采用数组的reduce方法
  var minLen = strs.reduce(function( pre , item ){
    return Math.min(pre, item.length)
  },Number.MAX_VALUE)
  pre->前一个返回值或者初始值
  Number.MAX_VALUE->表示js中的最大数，这里表示初始值，用来取第一个字符串长度
3.遍历字符串数组，取第一个字符串的第一个字符，判断是否每一个字符串第一个字符均为它，采用数组的every()方法
```
  for(var i=0;i<minLen;i++){
     var s=strs[0][i]
     var f = strs.every(function(item){
        return item[i]===s;
     })
     if(f){
          ans+=s;
     }else{
          break;
     }
  }
```
### 有效的括号[{([)}]=>false ()=>true 栈(后进先出) push() pop() peek()
1.先将括号之间的管理用对象存储 target['('] = ')'
2.循环字符串
3.初始化一个空数组a
  a为空:将字符串数组的元素存入a,跳出本次循环 a['(']
  a不为空:判断字符串数组中的本次值,是否于上一个值对应 s[i] === target[sta[sta.length - 1]
    相等:去除a的最后一项 a.pop()
    不想等:将本次值存入a a['(','{']
 
### 合并两个有序链表 1->2->4, 1->3->4 ==> 1->1->2->3->4->4
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
*/
 定义:链表的值指向