import React,{ Component } from 'react';
import { Platform,ImageBackground,StyleSheet,StatusBar,Text,TouchableHighlight,PanResponder,View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Util from '../util'
class MoveableCircle extends Component{
	
	constructor(){
		super();
		this.state = {
	      color: "rgba(255,255,255,0.7)",
	    };
	    
	}
	
	componentWillMount(){
		this.left=0;
	    this.top=0;
		this.circleStyles={
			style:{
				left:this.left,
				top: this.top
			}
		}
		
		this.panResponder=PanResponder.create({
			//成为响应者
			 onStartShouldSetPanResponder: (evt, gestureState) => true,
		      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
		      onMoveShouldSetPanResponder: (evt, gestureState) => true,
		      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			//开始手势操作
			onPanResponderGrant:(e,gs)=>{
				
				this.setState({
	     			color: "rgba(255,255,255,1)"
				})
			},
			//移动
			onPanResponderMove:(e,gs)=>{
				
				this.circleStyles.style.left=this.left+gs.dx;
				this.circleStyles.style.top=this.top+gs.dy;
				
				this.updateNativeStyles()
			},
			onPanResponderTerminationRequest:()=>true,
			//用户放开所有触摸点
			onPanResponderRelease:(e,gs)=>{
				this.left+=gs.dx;
				this.top+=gs.dy;
				
				this.setState({color: "rgba(255,255,255,0.7)"})
			},
			//另一个组件成为响应者
			onPanResponderTerminate:(e,gs)=>{
				
			}
			
		})
	}
	updateNativeStyles(){
		var style=this.circleStyles.style;
		
		if(style.left<0){
			style.left=0
		} else if(style.left> Util.size.width-100){
			style.left=Util.size.width-100
		} if(style.top<-10){
			style.top=-10
		} else if(style.top>Util.size.height-184){
			style.top=Util.size.height-184
		}
		this.circle && this.circle.setNativeProps(this.circleStyles);
	}
	componentDidMount(){
	//	alert(this.circle.setNativeProps)
		 this.updateNativeStyles()
	}
	render(){
		return(
			<View style={styles.MoveableCircle} {...this.panResponder.panHandlers} ref={(circle)=>{this.circle=circle}}>
				<Icon name="ios-baseball" color={this.state.color} size={120}/>
			</View>
		)
	}
}

export default class extends Component{
	render(){
		return(
			<View style={styles.container}> 
				<ImageBackground  source={require('./img/agrass.png')} style={{flex:1}}>
						<MoveableCircle/>
				</ImageBackground >
				
			</View>
		)
	}
}
const styles=StyleSheet.create({
	container:{
		flex:1
	},
	MoveableCircle:{
	  
	    position:"absolute",
	    left:0,
	     top:0
	},
})















