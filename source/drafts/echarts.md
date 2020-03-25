---
title: Echarts图表的使用
tags:
    - echarts
categories: echarts

---
#### Echarts的使用

---------

echarts在React中的应用

①：首先安装echarts  npm install echarts
<!-- more -->
②：引入所需图注等  
    ```
    //不是按需加载的话文件太大
    //import echarts from 'echarts'
    //下面是按需加载
    import echarts from 'echarts/lib/echarts'
    //导入柱状图等
    import 'echarts/lib/chart/bar';
    // 引入提示框和标题组件
    import 'echarts/lib/component/tooltip';
    import 'echarts/lib/component/title';
```
③：初始化echarts
   必须在组件加载完成之后才能初始化图表，因为在组件加载后生成dom节点，这个时候canvas才能根据id去绘制图表
   即在componentDidMount() {}中或之后调用初始化方法,也可以直接将初始化方法写在componentDidMount中，但是因为componentDidMount只在也组件第一次加载完成时才会调用，后期图表数据源更换时重新渲染会造成bug,所以建议将初始化方法拆出
   ```
    componentDidMount() {
        this.initCharts()
    }
    initCharts = () =>{
        const myChart = echarts.init(document.getElementById('box'));
        // ....
    }
   ```
④：设计数据格式展示图表
  ![](/assets/post-img/option.png)
  因为要与后台对接，所以需要设计一下对接的数据格式
  ```
  const data={
    'Mon':120, 
    'Tue':200,
    'Wed':150,
    'Thu':80,
    'Fri': 70,
    'Sat':110, 
    'Sun':130,
  }
  ```

  然后对数据进行处理展示
  ![](/assets/post-img/deal-data.png)


工作上遇到的需求：直方图
echarts本身不支持直方图,查资料之后引入echarts-stat库来解析数据进行展示，
引用ecStat.js处理数据时，有时出现以下错误，暂时没找到解决方法
 ![](/assets/post-img/error.png)

放弃引入库，自定义数据拼接方法
![](/assets/post-img/edata.png)

然后根据[官网上](https://www.echartsjs.com/examples/zh/editor.html?c=bar-histogram)进行渲染

总体代码
```
/* eslint-disable no-plusplus */
/* eslint-disable no-const-assign */
/* eslint-disable prefer-destructuring */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable func-names */
import React, { Component } from 'react';
import echarts from 'echarts';
// 测试数据
// const girth = [8.3, 8.6, 8.8, 10.5, 10.7, 10.8, 11.0, 11.0, 11.1, 11.2]
export default class BarTrue extends Component {

    componentDidMount() {
        const {list} = this.props
        this.ininCharts(list)
    }

    componentDidUpdate() {
        const {list} = this.props
        this.ininCharts(list)
    }


    ininCharts=(list)=>{
        const myChart = echarts.init(document.getElementById('histogram'));
        // 自定义拼装数据方式
        const edata = [];
        const minValue = Math.min.apply(null,list);
        const scopeMin = minValue;
        const maxValue = Math.max.apply(null,list);
        const scopeMax = maxValue
        const interval = (scopeMax-scopeMin)/10;
        let tmin = scopeMin;
        while(tmin < scopeMax){
            const x0 = tmin; 
            const x1 = tmin+interval;
            let samplenum = 0;
            for(let i=0;i<list.length;i++){
                if((scopeMin === x0 && list[i] < x0) || (x0 <= list[i] && x1 > list[i])
                    ||(scopeMin === x1 && list[i] > x1)) {
                    samplenum++;                
                }
            }
            tmin += interval;
            edata.push([x0, x1, samplenum]);
        }

        const renderItem = (params, api)=>{
            const yValue = api.value(2);
            const start = api.coord([api.value(0), yValue]);
            const size = api.size([api.value(1) - api.value(0), yValue]);
            const style = api.style();
        
            return {
                type: 'rect',
                shape: {
                    x: start[0] + 1,
                    y: start[1],
                    width: size[0] - 2,
                    height: size[1],
                },
                style,
            };
        }
        myChart.setOption({
            title: {
                text: 'Histogram Statistics',
                left: 'center',
                top: 10,
            },
            color: ['rgb(25, 183, 207)'],
                grid: {
                    top: 80,
                    containLabel: true,
                },
                xAxis: [{
                    type: 'value',
                    min: scopeMin,
                    max: scopeMax,
                    interval,
                }],
                yAxis: [{
                    type: 'value',
                }],
                series: [{
                    name: 'height',
                    type: 'custom',
                    renderItem,
                    label: {
                        normal: {
                            show: true,
                            position: 'insideTop',
                        },
                    },
                    encode: {
                        x: [0, 1],
                        y: 2,
                        tooltip: 2,
                        label: 2,
                    },
                    data:edata,
                }],
        })

    }

    render(){
        return(
            <div id="histogram" style={{height: 400 }} />
        )
    }
}
```

折线图多条markLine
```
myChart.setOption({
            xAxis: {
                type: 'category',
                data:xAxis,
            },
            yAxis: {
                type: 'value',
                max:300,
                splitLine:{
                    show:false,
                },
            },
            series: [{
                data: list,
                type: 'line',
                itemStyle : { normal: {label : {show: true}}},
                markLine: {
                    symbol:"none",
                    data: [
                        {type: 'average', name: '平均值'},
                        {silent:false, lineStyle: {type:"solid",color:"#2f4554"},yAxis: line[0] },
                        {silent:false, lineStyle: {type:"dashed",color:"#7DD43C"},yAxis: line[1] },
                        {silent:false, lineStyle: {type:"dashed",color:"#7DD43C"},yAxis: line[2] },
                        {silent:false, lineStyle: {type:"solid",color:"#2f4554"},yAxis: line[3] },
                    ],
                },
            }],
        });
```


