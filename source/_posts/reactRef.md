---
title: React Ref 受控组件与不受控组件
tags:
    - React
categories: React
---

Refs 是一个 获取 DOM节点或 React元素实例的工具。在 React 中 Refs 提供了一种方式，允许用户访问DOM 节点或者在render方法中创建的React元素。

<!-- more -->

当ref属性用于普通 HTML 元素
1. 用法1---字符串
```
<input  type ="text" ref="input"/> 
```
    // 获取值的方法为
    this.refs.input.value

    // dom操作方法 选中 聚焦
    this.refs.input.select()
    this.refs.input.focus()

🐖：this.refs.input可以访问到该组件实例，其实就是dom元素节点。这种方式基本不推荐使用，或者在未来的react版本中不会再支持该方式，但是可以了解一下。

2. 用法2---回调函数
```
<input  type ="text" ref={(input) => {this.input =  input}}/> 
```
    // 获取值的方法为
    this.input.value

    // dom操作方法 选中 聚焦
    this.input.select()
    this.input.focus()

🐒：回调函数就是在dom节点或组件上挂载函数，函数的入参是dom节点或组件实例，达到的效果与字符串形式是一样的，都是获取其引用。

3. 用法3---React.createRef()
```
 <input  type ="text" ref={this.myRef} />
```
    首先要在constructor进行设置

```
constructor() {
        super()
        this.myRef = React.createRef();
    }
```
    // 获取值的方法为
    this.myRef.current.value

    // dom操作方法 选中 聚焦
    this.input.current.select()
    this.input.current.focus()


🐇：在React 16.3版本后，使用此方法来创建ref。将其赋值给一个变量，通过ref挂载在dom节点或组件上，该ref的current属性将能拿到dom节点或组件的实例。
    当ref属性用于普通 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性。
    当ref属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性。

🥚：不能在函数组件上使用 ref 属性，因为他们没有实例。(但在函数式组件内部可以使用React Hooks 使用ref,后期更新)

----------------------

受控组件

在HTML中，表单元素（如 input、textarea、select）之类的表单元素通常可以自己维护state，并根据用户的输入进行更新。而在React中，可变状态（mutable state）通常保存在组件的 state 属性中，并且只能通过 setState()来更新。我们将 React的state作为唯一的数据源，通过渲染表单的React组件来控制用户输入过程中表单发送的操作。
这个“被React通过此种方式控制取值的表单输入元素”被成为受控组件。

不受控组件

从字面意思来理解：不被React组件控制的组件。在受控制组件中，表单数据由 React组件处理。其替代方案是不受控制组件，其中表单数据由DOM本身处理。文件输入标签就是一个典型的不受控制组件，它的值只能由用户设置，通过DOM自身提供的一些特性来获取。

受控组件和不受控组件最大的区别就是前者自身维护的状态值变化，可以配合自身的change事件，很容易进行修改或者校验用户的输入。

在React中 因为 Refs的出现使得 不受控制组件自身状态值的维护变得容易了许多，接下来我们就重点介绍一下 Refs在组件的使用方式。

refs 通常适合在一下场景中使用：

  - 对DOM 元素焦点的控制、内容选择或者媒体播放；
  - 通过对DOM元素控制，触发动画特效；
  - 通第三方DOM库的集成。

在组件中使用React.createRef()

父组件
```
class ParentComp extends React.Component {
  constructor(props) {
    super(props);
    // 创建ref 指向 ChildrenComp 组件实例
    this.textInput = React.createRef();
  }

  componentDidMount() {
    // 调用子组件 focusTextInput方法 触发子组件内部 文本框获取焦点事件
    this.textInput.current.focusTextInput();
  }

  render() {
    return (
      <ChildrenComp ref={ this.textInput } />
    );
  }
}
```

子组件代码

```
class ChildrenComp extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }
  focusTextInput() {
    this.inputRef.current.focus();
  }
  render(){
    return(
      <div>
        <input type='text' value='父组件通过focusTextInput()方法控制获取焦点事件' ref={ this.inputRef }/>
      </div>
    )
  }
}
```

如何将DOM 通过Refs 暴露给父组件

在极少数情况下，我们可能希望在父组件中引用子节点的 DOM 节点（官方不建议这样操作，因为它会打破组件的封装），用户触发焦点或者测量子DOM节点的大小或者位置。虽然我们可以通过向子组件添加 ref的方式来解决，但这并不是一个理想的解决方案，因为我们只能获取组件实例而不是 DOM节点。并且它还在函数组件上无效。

在react 16.3 或者更高版本中，我们推荐使用 ref 转发的方式来实现以上操作。

Ref forwarding 是一种自动将ref 通过组件传递给其子节点
````
class TestComp extends React.Component {
  clickEvent() {
    if (ref && ref.current) {
      ref.current.addEventListener('click', () => {
        console.log('hello click!')
      });
    }
  }
  componentDidMount() {
    console.log('当前按钮的class为：', ref.current.className); // btn
    this.clickEvent(); // hello click!
  }
  render() {
    return (
      <div>
        <BtnComp ref={ref}>点击我</BtnComp>
      </div>
    );
  }
}
```

子组件
```
const ref = React.createRef();
const BtnComp = React.forwardRef((props, ref) => {
  return (
    <div>
      <button ref={ref} className='btn'>
        { props.children }
      </button>
    </div>
  )
});
```

使用的组件BtnComp 可以获取对底层 button DOM 节点的引用并在必要时对其进行操作，就像正常的HTML元素 button直接使用DOM一样。
第二个ref参数仅在使用React.forwardRef 回调 定义组件时存在。常规函数或类组件不接收ref参数，并且在props中也不提供ref。

Ref转发不仅限于DOM组件。您也可以将refs转发给类组件实例。

高阶组件中的refs(待学更)

参考博客：
[https://blog.csdn.net/zhang_xin_new/article/details/91458022](https://blog.csdn.net/zhang_xin_new/article/details/91458022)
[https://juejin.im/post/5c9d783cf265da60d0005390](https://juejin.im/post/5c9d783cf265da60d0005390)


