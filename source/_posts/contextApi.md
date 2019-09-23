---
title: react Context Api 
tags:
    - react
categories: react
thumbnail: '../assets/post-img/css.jpg'
---

### Context Api 的应用

Context Api 应用场景
为了共享那些对于一个组件树而言是“全局”的数据，例如当前认证的用户、主题或首选语言。使用 context, 我们可以避免通过中间元素传递 props。
<!-- more -->
举例：主题颜色，通过按钮切换来控制主题颜色 
效果图：
![](/assets/post-img/change1.png)
![](/assets/post-img/change2.png)

1.使用React.createContext()来创建一个context
```
export const ThemeContext = React.createContext({
    color: '#f83',
    background: '#EEE'
});

```
2. context 提供Provider、Consumer，Provider就是数据的提供者，Consumer就是数据的使用者
Context.Providerq全代码
```
import React, { Component } from 'react';
import Header from './Header'

// 定义context进行导出，通过import {ThemeContext} from '文件位置'进行引入
export const ThemeContext = React.createContext({
    color: '#f83',
    background: '#EEE'
});
 //  主题数据
 const themes = [
    {
        color: '#f00',
        background: '#efa'
    },
    {
        color: '#06fae5',
        background: '#aae'
    },
    {
        color: '#ef5',
        background: '#cef'
    },
    {
        color: '#fff',
        background: '#000'
    }
];

class ChangeTheme extends Component {
    state = {
        themeIndex: 0
    };
    changeTheme = () => {
        const {themeIndex} = this.state;
        const newIndex = themeIndex < themes.length - 1 ? (themeIndex + 1) : 0;
        this.setState({
            themeIndex: newIndex
        });
    };
    render() {
        const {themeIndex} = this.state;
        return (
            <div className="test-test">
                <ThemeContext.Provider value={{
                    theme: themes[themeIndex],
                    changeTheme: this.changeTheme
                }}>
                    <Header />
                </ThemeContext.Provider>
            </div>
        );
    }
}

export default ChangeTheme;
```


3. Context.Provider包裹的组件内可以获取到context传递的值

```
  <Context.Provider value={{}}></Context.Provider>
```

provider提供的value不存在类型限制，根据自己的需要看如何传值，本例传一个当前的主题themes以及切换主题changeTheme的方法来个consumer使用

4. Provider 包裹的Header组件代码,引入两个子组件ThemedButton|ShowTheme

```
import React, { Component } from 'react';
import ThemedButton from './ThemedButton';
import ShowTheme from './ShowTheme'
class Header extends Component {
    render() {
        return (
            <div>
                 <ThemedButton/>
                 <ShowTheme/>
            </div>
        );
    }
}

export default Header;
```

5. ThemedButton作为consumer来获取context.Provider里传递出的值theme，changeTheme

代码实现


```
import React, { Component } from 'react';
// 引入context 
import {ThemeContext} from './ChangeTheme'

class ThemedButton extends Component {
    render() {
        return (
            <ThemeContext.Consumer>
              {({theme, changeTheme}) => <button onClick={changeTheme} style={{background: theme.background, color: theme.color}}> It's a button. </button>}
           </ThemeContext.Consumer>
        );
    }
}

export default ThemedButton;
```

6. ShowTheme相同 代码实现

```
import React, { Component } from 'react';
import {ThemeContext} from './ChangeTheme'

class ShowTheme extends Component {
    render() {
        return (
            <ThemeContext.Consumer>
                // 可以省略changeTheme ，因为ShowTheme组件内未用到
                {({theme, changeTheme}) => <div>
                    <span>color是：{theme.color}</span>
                    <br/>
                    <span>background是：{theme.background}</span>
                </div>}
            </ThemeContext.Consumer>
        );
    }
}

export default ShowTheme;
```
7. 项目结构
![](/assets/post-img/total.png)
8. 项目地址 https://github.com/bellakongqn/react-dnd-drag-demo.git







