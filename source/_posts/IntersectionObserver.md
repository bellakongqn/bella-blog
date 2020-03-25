---
title: IntersectionObserver
date: 2019-12-12 12:10:10
tags:
    - IntersectionObserver
categories: javascript
---

IntersectionObserver:可以自动"观察"元素是否可见，Chrome 51+ 已经支持。由于可见（visible）的本质是，目标元素与视口产生一个交叉区，所以这个 API 叫做"交叉观察器"。
<!-- more -->
### 用法：
var io = new IntersectionObserver(callback, option);// 返回一个观察器实例
>- IntersectionObserver是浏览器原生提供的构造函数，接受两个参数：callback是可见性变化时的回调函数，option是配置对象（该参数可选）。

```
// 开始观察
io.observe(document.getElementById('example'));
// 停止观察
io.unobserve(element);
// 关闭观察器
io.disconnect();
//为所有监听目标返回一个IntersectionObserverEntry对象数组并且停止监听这些目标。
io.takeRecords(); 
```
observe的参数是一个 DOM 节点对象。如果要观察多个节点，就要多次调用这个方法。
io.observe(elementA);
io.observe(elementB);

### option
root
所监听对象的具体祖先元素。如果未传入任何值或值为null，则默认使用viewport。
rootMargin
计算交叉时添加到根(root)边界盒的矩形偏移量， 可以有效的缩小或扩大根的判定范围从而满足计算需要。
thresholds
一个包含阈值的list, 升序排列, list中的每个阈值都是监听对象的交叉区域与边界区域的比率。当监听对象的任何阈值被越过时，都会生成一个通知(Notification)。如果构造器未传入值, 则默认值为0.不仅当目标元素从视口外移动到视口内时会触发回调，从视口内移动到视口外也会。

### callback 参数
目标元素的可见性变化时，就会调用观察器的回调函数callback。
callback一般会触发两次。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）。
```
var io = new IntersectionObserver(
  entries => {
    console.log(entries);
  }
);
```
callback函数的参数（entries）是一个数组，每个成员都是一个IntersectionObserverEntry对象。举例来说，如果同时有两个被观察的对象的可见性发生变化，entries数组就会有两个成员。

### IntersectionObserverEntry 对象
IntersectionObserverEntry对象提供目标元素的信息，一共有六个属性
1.time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒
2.target：被观察的目标元素，是一个 DOM 节点对象
3.rootBounds：根元素的矩形区域的信息，getBoundingClientRect()方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回null
4.boundingClientRect：目标元素的矩形区域的信息
5.intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
6.intersectionRatio：目标元素的可见比例，即intersectionRect占boundingClientRect的比例，完全可见时为1，完全不可见时小于等于0

### 图片懒加载
```
<!DOCTYPE html>
<html>
<head>
	<title></title>
</head>
<style type="text/css">
	.list {
		width: 500px;
		height: 300px;
		margin: 20px;
	}
	.img {
		width: 100%;
		height: 300px;
	}
</style>
<body>
	<div>图片来源于http://www.acgjc.com</div>
	<div class="list">
		<img data-src="http://img.acgjc.com/wp-content/uploads/2019/07/183dc2537018c3e8934c819251c72136-1024x576.jpg" class="img">
	</div>
	<div class="list">
		<img data-src="http://img.acgjc.com/wp-content/uploads/2019/07/90cfb81aebc76a0fad7d311800fdbff2-1024x576.jpg" class="img">
	</div>
	<div class="list">
		<img data-src="http://img.acgjc.com/wp-content/uploads/2019/07/3685ffdd022374d80d5a5b0a1830146c-1024x553.jpg" class="img">
	</div>
	<div class="list">
		<img data-src="http://img.acgjc.com/wp-content/uploads/2019/07/e62c330f09a9c86a6b3471850b22957b-1024x512.jpg" class="img">
	</div>
	<div class="list">
		<img data-src="http://img.acgjc.com/wp-content/uploads/2019/07/c374b5e14e5f36fc76ff6485782fd6d8-1-1024x473.jpg" class="img">
	</div>
	<div class="list">
		<img data-src="http://img.acgjc.com/wp-content/uploads/2018/07/7255d9b1da818860b351d67762b59029-1024x576.png" class="img">
	</div>
	<div class="list">
		<img data-src="http://img.acgjc.com/wp-content/uploads/2018/07/9d94d1b3710caafc47d956c9b78cb636-1024x768.jpg" class="img">
	</div>
	<div class="list">
		<img data-src="http://img.acgjc.com/wp-content/uploads/2018/07/04f614a8a2c31c009dacfa04965474b4-1024x769.jpg" class="img">
	</div>
 
	<script type="text/javascript">
		let imgList = document.querySelectorAll('.img')
 
		let observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.intersectionRatio > 0 && entry.intersectionRatio <= 1) {
					entry.target.src = entry.target.dataset.src
					observer.unobserve(entry.target)
				}
			})
		})
		imgList.forEach(img => {
			observer.observe(img)
		})
	</script>
</body>
</html>
```

react项目中使用
```
export let picLazyLoad = function(){
    let observer = new IntersectionObserver(
        (changes) => {
            changes.forEach((change) => {
                if(change.intersectionRatio > 0){
                    console.log(change.target)
                    var img = change.target;
                    img.src = img.dataset.src;
                    observer.unobserve(img);
                }
            })
        }
    )
    Array.from(document.getElementsByClassName('cover')).forEach((item) => {
        observer.observe(item);
    })
}
```
之后在componentDidMount生命周期中，获取数据之后的回调中去调用该方法。此处一定要在页面渲染之后再调用方法，否则获取不到target
```
componentDidMount = () => {
        let self = this
        this.picLazyLoad()
}
```







