import React from 'react';
import {TouchableNativeFeedback,Text,StyleSheet,View,TouchableOpacity } from 'react-native';
import Button  from 'antd-mobile/lib/button';
import Flex from 'antd-mobile/lib/flex'
const onPress=()=>{
		alert('onPress')
	}
export default  function(){
	
	return(
		<TouchableOpacity  onPress={onPress} underlayColor='#ff0' style={{flex:1}}>
				<View  style={{flex:1,padding:50}} onStartShouldSetResponder={function(){alert(2);return false;}} onResponderTerminationRequest={function(){alert(1);return true;}}>
				 
			     <Text >dasdasdasdasdasd</Text>
			      <Text>dasdasdasdasdasd</Text>
			   
					
					
				</View>
				
		</TouchableOpacity>
	)
}
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