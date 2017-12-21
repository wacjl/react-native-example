import React,{Component} from 'react';
import {Button,Text,View,ScrollView} from 'react-native'
import SplashScreen from 'rn-splash-screen';

export class MainScreen extends React.Component {
  static navigationOptions = {
    title: '主页',
  };
  componentDidMount(){
  	setTimeout(()=>{
  		SplashScreen.hide()
  		
  	},1000)
  }
  render() {
  	 const { navigate } = this.props.navigation;
  	let arr=[];
  
  	let tip=[{id:'Day01',info:'计数器'},{id:'Day02',info:'天气预报'},
				  	{id:'Day03',info:'动画加底部导航'},{id:'Day05',info:'手势系统'},
				  	{id:'Day06',info:'侧滑导航'},{id:'Day07',info:'上下滑动改变页头'},
				  	{id:'Day08',info:'Tumblr menu animation'},{id:'Day09',info:'WebGL'},
				  	{id:'Day10',info:'Camera'},{id:'Day11',info:'滑动卡片'},
				  	{id:'Day12',info:'手势密码'},{id:"Day13",info:'拖拽内容'},
				  	{id:'Day14',info:'指纹'},{id:'Day15',info:'Google Now'},
				  	{id:'webview',info:'测试webview'},
				  	{id:'TextInputR',info:'textInput'}
  	];
      tip.forEach((item,index)=>{
  		const title="Go To "+item.id+' '+item.info;
  		arr.push(
  			<Button
        title={title} key={index}
        onPress={() =>navigate(item.id, { name: '1' })}
       />
  		)
  	})
   
    return (
    	<ScrollView>
    			<Button
        title="Go to Jane's profile"
        onPress={() =>navigate('Profileqq', { name: '1' })}
      />
       {arr}
      <Button
        title="Go to Jane's profile"
        onPress={() =>navigate('Profileqq', { name: '2' })}
      />
    	</ScrollView>
      
    );
  }
}
export class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: '子窗口1',
  };
  render() {
    const { navigate } = this.props.navigation;
   alert(JSON.stringify(this.props.navigation.state.params))
   return (
   	
      <Button
        title="Go to Jane's Main"
        onPress={() =>
          navigate('Main', { name: 'Jane' })
        }
      />
     
    );
  }
}
