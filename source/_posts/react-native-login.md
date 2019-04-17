---
title: Recct-native App 登录|注册
tags:
    - Recct-native
    - login 
    - sign up
    - toggle
    - createSwitchNavigator
categories: React-native
thumbnail: '../assets/post-img/react-native.png'
---
** 登录|注册页设计及它与登陆后首页的变换 **
<!--more-->
----

在登录|注册页和进入app后的首页之间有个切换，RN提供了一种路由切换的方法[createSwitchNavigator](https://reactnavigation.org/docs/en/switch-navigator.html)，
> AuthLoading：系统加载页面，Main：系统主页面，Auth：用户登录注册页，initialRouteName初始页面

```
export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading'
  }
));
````
登录|注册页 AuthStack 在页面内引入Sign In 页
```
import SignInScreen from '../screens/SignInScreen'
const AuthStack = createStackNavigator({ SignIn: SignInScreen });
```
Sign In 页面编写

简单页面编写：react-native 的样式编写采用的是styles,所以选择了将样式写入signIn.js来引入
```
import { SignInStyle } from './style'
.......
<View style={SignInStyle.buttonGroup}>
    <Button
        style={{ ...SignInStyle.buttonStyle, marginRight: 20 }}
        textStyle={SignInStyle.buttonText}
        title="Login"
        onPress={() => { setToggle(true) }}
    />
    <Button
        style={{ ...SignInStyle.buttonStyle, marginRight: 20 }}
        textStyle={SignInStyle.buttonText}
        title="Sign Up"
        onPress={() => { setToggle(false) }}
    />
</View>
```
Sign Up 和 Login 两个按钮之间切换来显示不同的表单，引入组件Toggle
typeof props.default和typeof toggle === 'undefined'是为了设置默认显示的页面为登录
```
import React from 'react'

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
在登录|注册页引入 Toggle组件
```
import React from 'react'
import { View, Text, AsyncStorage, TouchableOpacity, TextInput } from 'react-native'
import { SignInStyle } from './style'
import { Button } from '../../components/Button'
import Toggle from '../../components/Toggle'



export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: '登录 | 注册',
  };

  login = () => {
    fetch('http://192.168.0.101:4000/v1/auth/login')
      .then(data => data.json())
      .then(data => {
        alert(JSON.stringify(data))
      })
      .catch(err => {
        alert(err)
      })
  }

  render() {
    return (
      <View style={SignInStyle.container}>

        <View style={SignInStyle.loginBox}>

          <Toggle default={true}>
            {
              ({ toggle, setToggle }) => (
                <>
                  <View style={SignInStyle.buttonGroup}>

                    <Button
                      style={{ ...SignInStyle.buttonStyle, marginRight: 20 , toggle ? SignInStyle.btnActiveStyle:null}}
                      textStyle={SignInStyle.buttonText}
                      title="Login"
                      onPress={() => { setToggle(true) }}
                    />
                    <Button
                      style={{ ...SignInStyle.buttonStyle, marginRight: 20 , !toggle ? SignInStyle.btnActiveStyle:null }}
                      textStyle={SignInStyle.buttonText}
                      title="Sign Up"
                      onPress={() => { setToggle(false) }}
                    />

                  </View>
                  <View>
                    <View style={SignInStyle.formItem}>
                      <Text>账号:</Text>
                      <TextInput
                        placeholder="请输入账号"
                        value=""
                      />
                    </View>

                    <View style={SignInStyle.formItem}>
                      <Text style={{ borderColor: 'red', borderWidth: 1 }}>密码:</Text>
                      <TextInput
                        style={{ borderColor: 'red', borderWidth: 1 }}
                        placeholder="请输入密码"
                        value=""
                      />
                    </View>
                    {
                        !toggle &&
                        <View style={SignInStyle.formItem}>
                            <Text style={{ borderColor: 'red', borderWidth: 1 }}>密码:</Text>
                            <TextInput
                            style={{ borderColor: 'red', borderWidth: 1 }}
                            placeholder="请确认密码"
                            value=""
                            />
                        </View>
                    }
                    {
                       !toggle && 
                        <Button
                            style={{ ...SignInStyle.loginBtnStyle }}
                            textStyle={SignInStyle.buttonText}
                            title="注册"
                            onPress={() => { this.login()}}
                            />
                    }
                    {
                       toggle &&  
                       <Button
                            style={{ ...SignInStyle.loginBtnStyle }}
                            textStyle={SignInStyle.buttonText}
                            title="登录"
                            onPress={() => { this.login()}}
                            />  
                    }
                    
                  </View>
                </>
          )
        }
          </Toggle>
      </View >
        </View >
      );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Main');
  };
}

```





