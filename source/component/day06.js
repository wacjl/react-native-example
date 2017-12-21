import React,{Component} from 'react';
import {Image,StyleSheet,Text,NativeModules,StatusBar,TouchableHighlight,PanResponder,LayoutAnimation,ScrollView,View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './style/day06'
import Util from '../util'
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
function MenuItem(props){
	return(
		<TouchableHighlight underlayColor="#ddd" onPress={()=>{alert(props.text)}}>
				<View style={styles.itemContainer}>
					<Icon style={styles.icon} name={props.name} size={18}/>
					<Text style={styles.text}>{props.text}</Text>
				</View>
		</TouchableHighlight>
	)
}

class Menu extends Component{
	constructor(){
		super();
		this.menu=[
			{text:'你的地点',name:'map-marker'},
			{text:'你的贡献',name:'pencil-square'},
			{text:'离线区域',name:'product-hunt'},
			{text:'实时路况',name:'road'},
			{text:'公交路线',name:'bus'},
			{text:'骑车线路',name:'bicycle'},
			{text:'卫星图像',name:'photo'},
			{text:'地形',name:'tree'},
		]
	}
	
	render(){
		let arr=[];
		this.menu.map((item,index)=>{
			arr.push(<MenuItem {...item} key={index}/>)
		})
		return(
			<View style={{flex:1}}>
				
				<Image resizeMode ="stretch" source={require('./img/userHead.png')} style={styles.userHead}/>
				<ScrollView style={styles.menuContainer}>
						{arr}
				</ScrollView>
	       </View>
		)
	}
}

export default class extends Component{
	constructor(){
		super();
		this.state={
			drop:false
		}
	}
	componentWillMount(){
		this.left=-Util.size.width*0.7;
		this.minLeft=-Util.size.width*0.7;
		this.minOpacity=0.2;
		this.maxOpacity=0.8;
		this.sideMenuStyles={
			style:{
				left:this.left
			}
		}
		this.dropStyles={
			style:{
				opacity:this.minOpacity
			}
		}
		this.panResponder=PanResponder.create({
			//成为响应者
			 onStartShouldSetPanResponder: (evt, gestureState) => true,
		      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
		      onMoveShouldSetPanResponder: (evt, gestureState) => true,
		      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			//开始手势操作
			onPanResponderGrant:(e,gs)=>{
				this.setState({
					drop:true
				})
				
			},
			//移动
			onPanResponderMove:(e,gs)=>{
				const flag=this.left+gs.dx>this.sideMenuStyles.style.left
				this.sideMenuStyles.style.left=this.left+gs.dx;
				let dropStyle=this.dropStyles.style;
				if(flag>0 && Math.abs(gs.dx)>5){
					dropStyle.opacity+=0.04;
				}else{
					dropStyle.opacity-=0.02;
				}
				dropStyle.opacity=dropStyle.opacity>this.maxOpacity?this.maxOpacity:
								  dropStyle.opacity<this.minOpacity?this.minOpacity:dropStyle.opacity;	
				
				
				this.updateNativeStyles()
			},
			onPanResponderTerminationRequest:()=>true,
			//用户放开所有触摸点
			onPanResponderRelease:(e,gs)=>{
				this.sideMenuStyles.style.left=this.left+gs.dx;
				let dropStyle=this.dropStyles.style;
				
				let style=this.sideMenuStyles.style;
				if(style.left<0.5*this.minLeft){
					style.left=this.minLeft;
					dropStyle.opacity=this.minOpacity
				}else{
					style.left=0;
					dropStyle.opacity=this.maxOpacity
				}
				
			    this.left=style.left;
			    
				this.updateNativeStyles(true)
			},
			//另一个组件成为响应者
			onPanResponderTerminate:(e,gs)=>{
				
			}
			
		})
	}
	updateNativeStyles(flag){
		const style =this.sideMenuStyles.style;
		
		if(style.left>0){
			style.left=0;
			
		}else if(style.left<=this.minLeft){
			style.left=this.minLeft
			flag && this.setState({
				drop:false
			})
		}
		
			flag && LayoutAnimation.easeInEaseOut()
		
		this.sideMenu && this.sideMenu.setNativeProps(this.sideMenuStyles);
		this.drop && this.drop.setNativeProps(this.dropStyles);
		
	}
	dropClick(){
		this.sideMenuStyles.style.left=this.minLeft;
		this.left=this.minLeft;
		this.dropStyles.style.opacity=this.minOpacity;
		this.updateNativeStyles(true)
	}
	render(){
		return(
			<View style={{flex:1}}>
					<StatusBar translucent ={true} backgroundColor="transparent"/>
					<View style={{flex:1}}><Text>这是测试拖动页面</Text></View>
					{this.state.drop?<View onStartShouldSetResponder={()=>true} onResponderGrant={()=>{this.dropClick()}} style={styles.drop} ref={(drop)=>{this.drop=drop}}></View>:<View></View>}
					<View style={styles.sideMenu} {...this.panResponder.panHandlers} ref={(sideMenu)=>{this.sideMenu=sideMenu}}>
						<Menu />
					</View>
			</View>
		)
	}
}

