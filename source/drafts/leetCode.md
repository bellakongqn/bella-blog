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
 
### 合并两个有序链表 1->2->4, 1->3->4 ==> 1->1->2->3->4->4 10.23
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
*/
1.将两个链表数存入数组 a.push(new ListNode(l1.value)); l1=l1.next
2.将数组进行排序 a.sort()
3.输入链表 a[0]

### 原地删除排序数组中的重复项 o(1) [1,1,2] 修改结束返回新的长度2，并且原数组的前两个元素被修改为1，2=》[1,2,2]
1.从数组末位开始遍历数组，定义一个数纪录数组长度 ans=0 如果当前为数组最后一项：ans+1;
  //从末位开始原因是因为会原地删除数组元素，导致数组长度改变
2.判断当前项是否后一项相等
  是：数组splice(i,1) 删除当前项
  否：数组长度+1 ans+1
3.返回数组长度数字
    [1,1,2] i=3 
    for (var i = nums.length; i--; ) {
      // 判断i--是否为true;i-1=2
      // i-1=0是条件为false
      // 循环里i=2
    }
    等价于
    for (var i = nums.length-1; i>=0; i--) {

    }

### 移除元素 原地移除所有数值等于 val 的元素，返回移除后数组的新长度。nums = [3,2,2,3], val = 3,=》[2,2]
1.从后开始遍历数组，定义数组长度 ans=0
2.判断元素是否与给定值相等
  相等：删除元素-》nums.splice(i,1)
  不相等： 数组长度+1=》ans+1

### 实现strStr() 给定一个 haystack 字符串和一个 needle 字符串，在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回 -1 haystack = "hello", needle = "ll" 输出: 2
1.使用字符串的indexOf方法  var s= haystack.indexOf(needle) 存在返回开始位置;不存在返回-1;空字符串返回0
2.或者使用search()方法 用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串

### 搜索插入位置 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。 [1,3,5,6], 5=》2  [1,3,5,6], 7=》4
1.判断数组中是否包含该元素 indexOf 包含返回位置，不包含返回-1
2.若返回-1,是否小于第一项 return 0;|是否大于最后一项 return nums.length
3.遍历数组 target>nums[i]&&target<nums[i+1] =>return i+1

### 报数序列是一个整数序列，按照其中的整数的顺序进行报数 4-》1211 10.24

### 最大子序和 找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。 [-2,1,-3,4,-1,2,1,-5,4]->6

### 给定一个仅包含大小写字母和空格 ' ' 的字符串，返回其最后一个单词的长度
1.将字符串根据空格进行分隔 s.split(" ")=》["hello","world"]
2.判断最后数组最后一个是否为单词 
  否：返回0；
  是：返回字符串长度

错误❌：当最后一个单词后面+空格时 导致错误
1.将字符串去除所有空格，然后将原有空格用空格代替（采用正则），然后转换成数组 
  trim()  s.replace(/\s/g, " "); split(" ")
2.判断处理后数组是否为空数组 是返回0
3.否：返回最后一个单词长度

### 加一 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一 [1,2,3]=》[1,2,4]
1.将数组最后一项替换成+1 ❌：9+1=10,需要放两个位置存储
2.将数组转换成数字+1再转换成数组 ❌：超出整数范围
3.~是按位取反
  新建一个数组存放
  从数组最后一位开始+1，
  循环数组
  得到的数sum对10取余得到的值存入新建数组最后一位（13或者3存入的均为3）
  然后将sum整除10得到前一位应该增加的数字，
  继续循环
  ❓：add = ~~(sum / 10) 按位取反 ？？？ 不执行按位取反会导致多一个0
  🐖：1/10≠0=0.1 将其变为0

### 二进制求和 返回他们的和（用二进制表示） a = "11", b = "1"=》"100"
1.将字符串转为数组并reverse() 🐖：反转是因为当长度不一样，无法从最后一位开始计算，反转之后从第一位开始计算
2.判断数组当前位置是否都有值，sum=有值+当前值，无值+0，再加上从前一位进上来的数add
3.新建数组c[i]当前位为：sum&1 若为1则为1 若为2则为0 2&1=0 1&1=1
4.sum为2 则add=1;否则add=0
5.将数组c反转并转换为字符串输出

### x的平方根 其中 x 是非负整数。 由于返回类型是整数，结果只保留整数的部分，小数部分将被舍去。8-》2 1-》1 10.25
1.循环0-x允许等于x,因为存在1&0两种特殊情况
2.判断i*i与 i*i<x&&(i+1)*(i+1)>x的情况，返回i

1.Math.sqrt(x) 平方根函数，然后取整Math.floor(),向下取整，舍弃小数
2.Math.ceil() 向上取整，存在小数+1，Math.round() 四舍五入

### 爬楼梯 需要 n 阶你才能到达楼顶。 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢
动态规划 https://blog.csdn.net/bajin7353/article/details/81836987
1.到达第i阶有多少种爬法，只与第i-1、第i-2阶的爬法数量直接相关，到达第i阶的方式数量 = 到达第i-1阶的方式数量+到达第i-2阶的方式数量
2.a[0]=1,a[1]=1 a[2]=a[0]+a[2]=2以此类推

### 删除排序链表中的重复元素
1.将链表中的元素存入数组
2.数组去重，然后连接为链表
❌：数组去重，不可以Set结构去重，只能循环去重,从末尾开始 i && a[i].val === a[i - 1].val 删除当前项 i是为了保留首项
🐖：判断数组是否为null

### 合并两个有序数组 双指针
1.合并为一个，然后排序

### 相同的树 给定两个二叉树，编写一个函数来检验它们是否相同 递归算法
1.判断当前结点是否为空
2.判断当前结点是否相等，以及左右叶子结点是否相等
```
var isSameTree = function(p, q) {
    if (p === null && q === null) return true;
    if (p === null && q !== null) return false;
    if (p !== null && q === null) return false;
    return (p.val === q.val) && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};
```

### 对称二叉树 检查它是否是镜像对称的。
1.判断根结点是否空 空返回true
2.不为空的时候 定义一个方法，判断左右叶子结点是否为对称结点
3.判断左右叶子结点值是否相等 不相等返回false 否则判断左右叶子结点的叶子结点是否对称 左对右
Symmetric(p.left, q.right) && Symmetric(p.right, q.left);

### 二叉树的最大深度 二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。
1.定义一个数代表深度
2.设计一个函数，来遍历计算深度，接受初始根节点，及深度作为参数
```
var maxn;
function dfs(root, depth) {
  if (!root) {
    maxn = Math.max(maxn, depth);
    return;
  }

  dfs(root.left, depth + 1);
  dfs(root.right, depth + 1);
}
var maxDepth = function(root) {
  maxn = -1;
  dfs(root, 0);
  return maxn;
};
```
### 二叉树的层次遍历||给定一个二叉树，返回其节点值自底向上的层次遍历。 （即按从叶子节点所在层到根节点所在的层，逐层从左向右遍历） 10.29
1.先判断是否为空二叉树
2.将根结点存入数组中, tmp=[root]
3.判断数组长度,将结点的值存入数组,循环计算数组中的元素,res.push(item.val),判断左右叶子结点是否为null, _tmp.push(item.left);
4.ans.push(res);
  tmp = _tmp;
5.递归 最后反转ans

### 将有序数组转换为二叉搜索树 将一个按照升序排列的有序数组，转换为一棵高度平衡二叉搜索树。
二叉搜素树:
（1）若它的左子树不空，则其左子树上任意结点的关键字的值都小于根节点关键字的值。
（2）若它的右子树不空，则其右子树上任意结点的关键字的值都大于根节点关键字的值。
（3）它的左、右子树本身又是一个二叉查找树。
平衡二叉树:左子树和右子树的高度之差的绝对值不超过1
1.递归
2.找到数组中间结点,作为根结点,中间结点左侧为左子树,右侧为右子树,然后继续取中间结点
3.🐖:判断结束标识,是否结点为null,取整Math.round((0+5)/2)=3

### 平衡二叉树  判断它是否是高度平衡的二叉树????。10.30

### 二叉树的最小深度
```
var minDepth = function(root) {
    if(root == null) {
        return 0;
    }
    if(root.left == null && root.right == null) {
        return 1;
    }
    let ans = Number.MAX_SAFE_INTEGER;
    if(root.left != null) {
        ans = Math.min(minDepth(root.left), ans);
    }
    if(root.right != null) {
        ans = Math.min(minDepth(root.right), ans);
    }
    return ans + 1;
};
```
### 路径总和 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。
```
var hasPathSum = function(root, sum) {
    if(root==null) return false
    var t = sum-root.val
    if(root.left===null&&root.right===null){
        return t==0?true:false
    }
    return hasPathSum(root.left,t)||hasPathSum(root.right,t)
};
```

### 杨辉三角 杨辉三角||
```
var generate = function(numRows) {
    var ans = [];
    // i<rowIndex+1
    for (var i = 0; i < numRows; i++) {
        if (i === 0) {
          ans[i] = [1];
          continue;
        }
    
        ans[i] = [];
        for (var j = 0; j <= i; j++)
          if (j === 0)
            ans[i][j] = ans[i - 1][j];
          else if (j === i)
            ans[i][j] = ans[i - 1][j - 1];
          else 
            ans[i][j] = ans[i - 1][j - 1] + ans[i - 1][j];
        }
    
  // return ans[rowIndex]
  return ans;
};
```
### 买卖股票的最佳时机 一次交易
1.设置最小值等于数组第一个,最大利润为0
2.循环数组,判断数组两项直接最大的差值
```
var maxProfit = function(prices) {
   if(prices.length==0)return 0;
   var max=0,min=prices[0];
    for(var i=1;i<prices.length;i++){
        var min = Math.min(min,prices[i])
        var max = Math.max(max,prices[i]-min)
    }
    return max
};
```
### 买卖股票的最佳时机|| 多次交易
1.贪心算法，总是做出在当前看来是最好的选择，不从整体最优上加以考虑，也就是说，只关心当前最优解
我们要算的是利润，要有利润，自然要有一次交易。
所以我们就说说prices[1]，即是第一天股票价格。按照贪心策略，不关心以后，我们只关心当前利益。第0天买入，花费prices[0]，第一天卖出，得到prices[1]，那么我们的收获就是profit = prices[1] - prices[0],那么有两种情况
（1）当profit > 0 时，赶紧买入卖出，能赚一笔是一笔，苍蝇再小也是肉嘛
（2）当profit <= 0 时，再买入卖出的话，那就是傻了，白费力气不说，还亏钱
```
var maxProfit = function(prices) {
    var maxPro = 0, tmp = 0;
        for (var i = 1; i < prices.length; i++) {
            tmp = prices[i] - prices[i-1];
            if (tmp > 0)
                maxPro += tmp;
        }
        return maxPro;
};
```

### 回文字符串 "A man, a plan, a canal: Panama" replace() 正则去除符号
```
var isPalindrome = function(s) {
    s = s.replace(/[\W]/g, '');
    s = s.toLowerCase();
    var _s = s.split('').reverse().join('');
    return s === _s;
};
```
### 盛水最多的容器 10.31 给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。
1.双指针法 面积=长*宽，先取最大宽度，那么接下来想得到更大的面积，就是找到一个相对好的长度
2.默认取首尾距离最远，也就是宽度最大的两个高度，作为第一个最大面积，两个指针分别指向两个高度，得到这个面积后，移动较小的指针，需求一个更大的高度，让面积可能变大
```
var maxArea = function(height) {
    var maxAera =0 
    if(height.length<=1) {
        return 0
    }
    var left =0,right=height.length-1
    while(left<right){
        if(height[left]<=height[right]){
            maxAera = Math.max(maxAera, height[left]*(right-left))
            left++
        }else{
            maxAera = Math.max(maxAera, height[right]*(right-left))
            right--
        }
    }
    return maxAera
};
```
### 只出现一次的数字 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。
1.位运算
```
var singleNumber = function(nums) {
    var ans = 0
    for(var i=0;i<nums.length;i++){
        ans^=nums[i]
    }
    return ans
};
```
### 环形链表 给定一个链表，判断链表中是否有环 11.4
1.p1每次走一步，p2每次走两步。
2.若没有环，则两者不会碰到，若有环，则必然会碰到。
```
var hasCycle = function(head) {
     let slow = head, fast = head
     while(fast && fast.next){
          slow = slow.next
          fast = fast.next.next
          if(slow === fast) return true
     }
    return false
}
```
### 最小栈 设计一个支持 push，pop，top 操作，并能在常数时间内检索到最小元素的栈。
1.js中可以用数组实现栈，定义两个数组，一个正常进行push和pop的操作，另一个保存当前栈中的最小值
2.保存当前栈的最小值是为了避免最小值被删除（依次存放多个最小值）
```
var MinStack = function() {
    this.stack = [];
    this.min = [];
};

MinStack.prototype.push = function(x) {
    this.stack.push(x);
    //判断x和min当前栈顶的数哪个小，如果x小则把x推入min的栈顶
    if(this.min.length==0 || this.min[this.min.length-1]>=x){
        this.min.push(x);
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    //this.stack.pop();
    //判断stack中即将弹出的元素和min栈顶的元素是否相等，若相等，则要把min栈顶的元素弹出，防止找不到最小值
    if(this.stack[this.stack.length-1]==this.min[this.min.length-1]){
        this.min.pop();
    }
    this.stack.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length-1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.min[this.min.length-1];//min栈顶保存当前栈中的最小值
};

```
### 相交链表

 
 
  

  
