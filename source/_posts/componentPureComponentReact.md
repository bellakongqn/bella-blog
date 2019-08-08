---
title: React Component 与 PureComponentReact 区别
tags:
    - React
categories: React
---

 Component 与 PureComponentReact 它们几乎完全相同，但是PureComponent通过prop和state的浅比较来实现shouldComponentUpdate，某些情况下可以用PureComponent提升性能.Component默认的情况下其shouldComponentUpdate方法并不进行新旧props与state的对比。
<!-- more -->

 浅比较（shallow comparison）:
 对于基本类型(primitives）例如数字或者布尔值，来说，浅拷贝将会检查其值是否相同，例如1与1相等，true与true相等。

 对于引用类型的变量，例如复杂的javascript对象或者数组，来说，浅拷贝将仅仅检查它们的引用值是否相等。这意味着，对于引用类型的变量来说，如果我们只是更新了其中的一个元素，例如更新了数组中某一位置的值，那么更新前后的数组仍是相等的。

 Component shouldComponentUpdate 来做性能优化

 ```
 class CounterButton extends React.Component {
 constructor(props) {
  super(props);
  this.state = {count: 1};
 }
 
 shouldComponentUpdate(nextProps, nextState) {
  if (this.props.color !== nextProps.color) {
   return true;
  }
  if (this.state.count !== nextState.count) {
   return true;
  }
  return false;
 }
 
 render() {
  return (
   <button
    color={this.props.color}
    onClick={() => this.setState(state => ({count: state.count + 1}))}>
    Count: {this.state.count}
   </button>
  );
 }
}
 ```

 使用PureComponent提升性能

 如下显示的是一个IndexPage组件，设置了一个state是isShow，通过一个按钮点击可以改变它的值
 结果是：初始化的时候输出的是constructor，render，
 而第一次点击按钮，会输出一次render，即重新渲染了一次，界面也会从显示false变成显示true，
 但是当这个组件是继承自PureComponent的时候，再点击的时，不会再输出render，即不会再重新渲染了，
 而当这个组件是继承自Component时，还是会输出render，还是会重新渲染，
 这时候就是PureComponent内部做了优化的体现，同理也适用于string，number等基本数据类型，因为基本数据类型，值改变了就算改变了。

 ```
 import React, { PureComponent, Component } from 'react';

// export default class Component1 extends PureComponent{
  export default class Component1 extends Component{
     constructor() {
        super();
        this.state = {
        isShow: false
        };
        console.log('constructor');
    }

    changeState = () => {
      this.setState({
        isShow: true
      })
    };
    render() {
      console.log('render');
      return (
        <div>
          <button onClick={this.changeState}>点击</button>
          <div>{this.state.isShow.toString()}</div>
        </div>
      );
    }
}
 ```

 - 当这个this.state.arr是一个数组时，且这个组件是继承自PureComponent时，初始化依旧是输出constructor和render，但是当点击按钮时，界面上没有变化，也没有输出render，证明没有渲染，但是我们可以从下面的注释中看到，每点击一次按钮，我们想要修改的arr的值已经改变，而这个值将去修改this.state.arr,但是因为在PureComponent中浅比较这个数组的引用没有变化所以没有渲染，但是实际上this.state.arr已经更新了，只是没有渲染，表现出来给用户看到

 - 当这个组件是继承自Component的时候，初始化依旧是输出constructor和render，但是当点击按钮时，界面上出现了变化，即我们打印处理的arr的值输出，而且每点击一次按钮都会输出一次render，证明已经重新渲染，this.state.arr的值已经更新，所以我们能在界面上看到这个变化

 - 使用扩展运算符会产生新数组，使this.state.arr的引用发生了变化，所以初始化的时候输出constructor和render后，每次点击按钮都会输出render，界面也会变化，不管该组件是继承自Component还是PureComponent的

 ```
 import React, { PureComponent, Component } from 'react';
// class IndexPage extends PureComponent {
class IndexPage extends Component {
    constructor() {
      super();
      this.state = {
        arr: ['1'],
        obj: {
          name: "zlq"
        }
      };
      console.log('constructor');
    }
    //PureComponent中页面会警告,不建议在PureComponent中使用
    // shouldComponentUpdate(){
    //   return false;
    // }
    changeState = () => {
      let { arr } = this.state;
      arr.push('2') 
      var obj = {
        name: "zl"
      }
      this.setState({
        // obj
        // obj:{name:"Z"}
        arr // pureComponent下不会重新render 
        // arr: [...arr, '2']
      })

      // 通过传入之前的state来改变
      // this.setState(prevState => ({
       // arr: [...prevState.arr, 'bella'],
      // }));
      console.log(this.state.arr)
    };
    render() {
      console.log('render');
      let { arr, obj } = this.state
      return (
        <div>
          <button onClick={this.changeState}>点击</button>
          <div>
            {arr.map((item) => (
              <p>{item}</p>
            ))}
            {obj.name}
          </div>
        </div>
      );
    }
  }
  
  export default IndexPage;
 ```

 PureComponent不仅会影响本身，而且会影响子组件，所以PureComponent最佳情况是展示组件

 ```
 //父组件
import React, { PureComponent, Component } from 'react';
import Example from "../components/Example";

class IndexPage extends PureComponent{
  constructor() {
    super();
    this.state = {
      person: {
        name: 'sxt'
      }
    };
    console.log('constructor');
  }
  changeState = () => {
    let { person } = this.state;
    person.name = 'sxt2';
    this.setState({
      person
    })
  };
  render() {
    console.log('IndexPage render');
    const { person } = this.state;
    return (
      <div>
        <button onClick={this.changeState}>点击</button>
        <Example person={person} />
      </div>
    );
  }
}
//子组件
import React, { Component } from 'react';
class Example extends Component {
  render() {
    console.log('example render');
    const { person } = this.props;
    return(
      <div>
        {person.name}
      </div>
    );
  }
}
 ```

1. 我们让IndexPage组件里面包含一个子组件Example来展示PureComponent是如何影响子组件的

2. 父组件继承PureComponent，子组件继承Component时：
下面的结果初始化时输出为constructor，IndexPage render，example render，但是当我们点击按钮时，界面没有变化，因为这个this.state.person对象的引用没有改变，只是改变了它里面的属性值所以尽管子组件是继承Component的也没有办法渲染，因为父组件是PureComponent，父组件根本没有渲染，所以子组件也不会渲染

3. 父组件继承PureComponent，子组件继承PureComponent时：因为渲染在父组件的时候就没有进行，相当于被拦截了，所以子组件是PureComponent还是Component根本不会影响结果，界面依旧没有变化

4. 父组件继承Component，子组件继承PureComponent时：结果和我们预期的一样，即初始化是会输出constructor，IndexPage render，example render，但是点击的时候只会出现IndexPage render，因为父组件是Component，所以父组件会渲染，但是当父组件把值传给子组件的时候，因为子组件是PureComponent，所以它会对prop进行浅比较，发现这个person对象的引用没有发生变化，所以不会重新渲染，而界面显示是由子组件显示的，所以界面也不会变化

5. 父组件继承Component，子组件继承Component时：初始化是会输出constructor，IndexPage render，example render，当我们第一次点击按钮以后，界面发生变化，后面就不再改变，因为我们一直把它设置为sxt2，但是每点击一次都会输出IndexPage render，example render，因为每次不管父组件还是子组件都会渲染

6. 如果state和prop一直变化的话，还是建议使用Component，进行浅比较也是需要时间。并且PureComponent的最好作为展示组件,

！！！！它既没有子组件，也没有依赖应用的全局状态。

7. 继承自Component的组件，若是shouldComponentUpdate返回false，就不会渲染了，
继承自PureComponent的组件不用我们手动去判断prop和state，所以在PureComponent中使用shouldComponentUpdate会有如下警告:
IndexPage has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.

参考博客：
[https://www.jianshu.com/p/b7733dc8f826](https://www.jianshu.com/p/b7733dc8f826)
[https://www.jianshu.com/p/690444f9f2dc](https://www.jianshu.com/p/690444f9f2dc)
[https://www.jb51.net/article/143497.htm](https://www.jb51.net/article/143497.htm)
[https://habr.com/en/company/redmadrobot/blog/318222/](https://habr.com/en/company/redmadrobot/blog/318222/)






