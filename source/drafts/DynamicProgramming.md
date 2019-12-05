---
title: leetCode
tags:
    - DynamicProgramming
categories: DynamicProgramming
---

动态规划

----------

动态规划定义（https://blog.csdn.net/zw6161080123/article/details/80639932）

1.爬楼梯
假设你正在爬楼梯。需要 n 阶你才能到达楼顶。
每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？
<!-- more -->
到达第三阶的方式有两种：从第一阶直接到第三阶；从第二阶到第三阶段，即：dq[3]=dp[2]+dp[1]
依次类推到达第i阶段：dp[i] = dp[i-1]+dp[i-2] 只跟第i-1阶和第i-2阶有关
解析：
![](/assets/climbStairs.png)
算法：
```
var climbStairs = function(n) {
    if(n===1) return 1;
    if(n===2) return 2;
    let dp =[];
    dp[0] =1;
    dp[1] =2;
    for(let i=2;i<n;i++){
        dp[i] = dp[i-1]+dp[i-2];
    }
    return dp[n-1];
};
```
动态规划原理：
![](/assets/clim.png)

2.打家劫舍
你是一个专业的小偷，计划偷窃沿街的房屋。每间房内都藏有一定的现金，影响你偷窃的唯一制约因素就是相邻的房屋装有相互连通的防盗系统，如果两间相邻的房屋在同一晚上被小偷闯入，系统会自动报警。给定一个代表每个房屋存放金额的非负整数数组，计算你在不触动警报装置的情况下，能够偷窃到的最高金额。

解析：
判断一个房偷与不偷只与前一个房间有关 当只要一个房间时：最大值为nums[0];当存在两个房间时为nums[0]和nums[1]中的较大值，当为3个以上时有两种方案 偷不偷 不偷不，即res[i-2]+nums[i]与res[i-1]的较大值
用数组res保存前i个元素能得到的最大金额，有1个元素时能得到的最大金额为nums[0]，有两个元素时的最大值为nums[0]和nums[1]之间的最大值，有i个元素时能得到的最大金额为res[i-2]+nums[i]和res[i-1]的最大值。

算法
```
var rob = function(nums) {
  if (nums.length === 0) {
    return 0;
  }else if(nums.length===2) {
      return Math.max(nums[0],nums[1])
  } 
  else {
    let dp = [];
    dp[0] = nums[0];
    let max=dp[0];
    for (let i = 1; i < nums.length; i++) {
      if (i === 1){
            dp[i] = Math.max(nums[0],nums[1]);
      }else {
          dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
      }
      max = dp[i];
    }
    return max;
  }
};
```
3.粉刷房子
假如有一排房子，共 n 个，每个房子可以被粉刷成红色0、蓝色1或者绿色2这三种颜色中的一种，你需要粉刷所有的房子并且使其相邻的两个房子颜色不能相同。
当然，因为市场上不同颜色油漆的价格不同，所以房子粉刷成不同颜色的花费成本也是不同的。每个房子粉刷成不同颜色的花费是以一个 n x 3 的矩阵来表示的。
例如，costs[0][0] 表示第 0 号房子粉刷成红色的成本花费；costs[1][2] 表示第 1 号房子粉刷成绿色的花费，以此类推。请你计算出粉刷完所有房子最少的花费成本。

当前房子的最小花费为 min( cost[i][0]+min(cost[i-1][1],cost[i-1][2]), 
                        cost[i][1]+min(cost[i-1][0],cost[i-1][2], 
                        cost[i][2]+min(cost[i-1][0],cost[i-1][1])
                    )

dp[i][j] += min(dp[i - 1][(j + 1) % 3], dp[i - 1][(j + 2) % 3]);

算法
```
var minCost = function(costs){
    const len = costs.length
    for (int i = 1; i < len; ++i) {
        for (int j = 0; j < 3; ++j) {
            costs[i][j] += min(costs[i - 1][(j + 1) % 3], costs[i - 1][(j + 2) % 3]);
        }
    }
    return min(cost[len-1][0],cost[len-1][1],cost[len-1][2])
}
```

4.栅栏涂色
有一个栅栏有n个栏杆,每个栏杆可以被涂成k个颜色中的一个.你必须要在保证最多相邻的两个栏杆是同一个颜色的情况下涂完所有的栏杆.你需要返回你涂完栏杆的所有方式的总数
提示:n和k都是非负的整数

第三根柱子要不和第一根柱子不是一个颜色,要不和第二根柱子不是一个颜色,所以和第一根柱子颜色不一样的概率是k-1乘以第一根柱子的概率
和第二根柱子颜色不一样的概率是k-1乘以第二根柱子的概率,同时如果和第一根柱子颜色相同,则已经包含在与第二根柱子颜色不同里面,反之亦然,所以相加就是总的概率

5.最大子序列和
给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
算法
```
var maxSubArray = function(nums) {
  var maxn = -Number.MAX_VALUE;
  var sum = 0;
  nums.forEach(function(item, index, array) {
    sum += item;
    if (sum > maxn)
      maxn = sum;
    if (sum < 0)
      sum = 0;
  });
  return maxn;
};
```