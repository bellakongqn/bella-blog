---
title: React 面试
date: 2019-03-10 12:10:10
tags:
    - React
categories: 面试
---
#### React
----------

React 生命周期
<!-- more -->
1.构造函数，props/state 初始化一些值

2.componentWillMount() 组件即将进行加载的时候，因为componentWillMount是在render之前执行，所以在这个方法中setState不会发生重新渲染，它也只会在挂载过程中被调用一次

3.render()函数进行渲染

4.componentDidMount() 组件已经被渲染到页面中后触发,此时页面中有了真正的DOM的元素，可以进行DOM相关的操作,api请求等

5.componentWillUpdate() 组件即将被更新时触发 ，即将被弃用

6.componentDidUpdate() 组件被更新完成后触发。页面中产生了新的DOM的元素，可以进行DOM操作

7.componentWillUnmount() 组件被销毁时触发。这里我们可以进行一些清理操作，例如清理定时器

8.componentDidUnmount 组件已被销毁
 
构造函数 constructor

```
constructor(props){
    super(...)
}
```
1.使用constructor就必须写super(),它是用来初始化this的，可以绑定事件到this上;

2.在constructor中要使用this.props,就必须给super加参数：super(props);

3.有无constructor()，在render()函数中this.props都是可以使用的;

4.如果用不到constructor(),可以不写，React会默认添加一个空的constructor()。


keys是什么，为什么它们很重要？

每个keys都是独一无二的，在更新的时候比较新的元素树和最前一个的差别，keys更加高效，因为 React 可以使用子元素上的 keys 快速知道元素是新的还是在比较树时才被移动。
所以map的时候一定要加上keys
```
value.map((item, index) => (
            <span key={index}>item</span>
        ))
```

受控组件与非受控组件

[受控组件](https://reactjs.org/docs/forms.html),表单数据由React组件处理。[不受控制组件](https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag)，其中表单数据由DOM本身处理。
受控组件采用setState()来更改状态
```
state={
    username:''
}

changeUsername = (e) =>{
 this,.setState({
     username:e.target.value
 })
}
...
 <input
    type='text'
    value={this.state.username}
    onChange={this.changeUsername} />
```
不受控组件使用ref从Dom获取表单值
```
handleSubmit = () => {
    console.log("Input Value: ", this.input.value)
  }
.........
 <form onSubmit={this.handleSubmit}>
    <label>
        Name:
        input
        type='text'
        ref={(input) => this.input = input} />
    </label>
    <input type="submit" value="Submit" />
</form>
```

Context api
在应用根组件创建Context.Provider, 即需要共享到全局的状态，比如登录的用户信息等
```
export const Username = createContext({
  'bella',
})
```
在子页面中通过Context.Consumer来获取根节点中共享的状态
```
<Username.Consumer>
    {({userName}) =>
    <span>userName</span>
    }
</Username.Consumer>
```

回调渲染
使组件逻辑可复用的另一个好方法是，将你的组件的子元素变成函数。我们可以拿我们的toggle切换用渲染回调模式重写它：
```
export default class Toggle extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            isToggled: typeof props.default === 'boolean' ? props.default : false
        }
    }

    setToggle = (toggle) => {
        if (typeof toggle === 'undefined') {
            this.setState({isToggled: !this.state.isToggled})
        } else if (typeof toggle === 'boolean') {
            this.setState({isToggled: toggle})
        }
    }

    render() {
        return this.props.children({toggle: this.state.isToggled, setToggle: this.setToggle})
    }

}
```
使用组件
```
<Toggle default={true}>
        {
            ({ toggle, setToggle }) => (
            <>
               ......
            </>
        )
    }
</Toggle>
```