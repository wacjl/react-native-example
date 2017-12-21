import React, { Component } from 'react';
import { AppRegistry, View ,Text,TextInput,StyleSheet} from 'react-native';
import {StackNavigator} from 'react-navigation'
import ScrollViews from './source/page/scrollView' ;
import FlatListBasics from './source/page/flatList';
import {ProfileScreen,MainScreen} from './source/page/navigation';
import FeedBack from './source/page/feedback';
import TabExample from './source/page/andtdTab';
import TestActivityIndicator from './source/component/ActivityIndicator';
import Day01 from './source/component/day01'
import Day02 from './source/component/day02'
import Day03 from './source/component/day03'
import Day05 from './source/component/day05'
import Day06 from './source/component/day06'
import Day07 from './source/component/day07'
import Day08 from './source/component/day08'
import Day09 from './source/component/day09'
import Day10 from './source/component/day10'
import Day11 from './source/component/day11'
import Day12 from './source/component/day12'
import Day13 from './source/component/day13'
import Day14 from './source/component/day14'
import Day15 from './source/component/day15'
import InputText from './source/component/textInputt'
import WebviewTest from './source/component/webview'
var styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ff0'//黄色
  },
 
  box2:{
    width:50,
    height:50,
    backgroundColor:'#0f0',//绿色
    position :'absolute',
    top:30,//上边距离屏幕上侧30单位
  },
  box3:{
    width:50,
    height:50,
    backgroundColor:'#f0f',//紫色
    position :'absolute',
    right:30,//右边距离屏幕右侧30单位
  },
  
});
class FixedDimensionsBasics extends Component {
	constructor(props){
		super(props)
		this.state={
			text:''
		}
	}
  render() {
    return (
      // 试试去掉父View中的`flex: 1`。
      // 则父View不再具有尺寸，因此子组件也无法再撑开。
      // 然后再用`height: 300`来代替父View的`flex: 1`试试看？
      <View style={styles.container}>
       	<FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
      <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
     </FadeInView>
      
      </View>
    );
  }
};
// 注册应用(registerComponent)后才能正确渲染
// 注意：只把应用作为一个整体注册一次，而不是每个组件/模块都注册
const App = StackNavigator({//创建2个页面跳转
  Main: {screen: MainScreen},
  Profile: {screen: ProfileScreen},
  Profileqq:{screen:TabExample},
  Day01:{screen:Day01},
  Day02:{screen:Day02,navigationOptions:{header:null}},
  Day03:{screen:Day03,navigationOptions:{header:null}},
  Day05:{screen:Day05},
  Day06:{screen:Day06,navigationOptions:{header:null}},
  Day07:{screen:Day07,navigationOptions:{header:null}},
  Day08:{screen:Day08},
  Day09:{screen:Day09},
  Day10:{screen:Day10},
  Day11:{screen:Day11,navigationOptions:{headerTitle:'滑动卡片'}},
  Day12:{screen:Day12,navigationOptions:{headerTitle:'手势密码'}},
  Day13:{screen:Day13,navigationOptions:{headerTitle:'拖拽'}},
  Day14:{screen:Day14,navigationOptions:{headerTitle:'指纹密码'}},
  Day15:{screen:Day15,navigationOptions:{headerTitle:'Google Now'}},
	TextInputR:{screen:InputText,navigationOptions:{headerTitle:'textInput'}},
	webview:{screen:WebviewTest,navigationOptions:{headerTitle:'webview test'}}
});

AppRegistry.registerComponent('testapp', () => App);