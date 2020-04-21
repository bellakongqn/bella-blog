---
title: what is the exact difference between currenttarget property and target property
date: 2020-04-21 14:49:21
tags:
    - js
categories: js
---
<b>target</b> is the element that triggered the event (e.g., the user clicked on)
<b>currentTarget</b> is the element that the event listener is attached to.

<!-- more -->

```
<div id="1">1 click me
  <div id="2">2 click me as well</div>
</div>
<div id="result">
  <div>result:</div>
</div>
```
```
window.onload = function() {
  var resultElem = document.getElementById('result')
  document.getElementById('1').addEventListener(
    'click',
    function(event) {
      resultElem.innerHTML += ('<div>target: ' + event.target.id + '</div>')
      resultElem.innerHTML += ('<div>currentTarget: ' + event.currentTarget.id + '</div>')
    },
    false
  )
}
```
点击展示
1 click me
2 click me as well
result:
target: 1
currentTarget: 1
target: 2
currentTarget: 1
因为
2 is the element that originated the event
1 is the element that listened to the event