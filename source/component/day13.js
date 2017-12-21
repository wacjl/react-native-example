import React,{Component} from 'react'
import {View,ScrollView,Text,Image,StyleSheet,PanResponder,LayoutAnimation,NativeModules} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import IconFA from 'react-native-vector-icons/FontAwesome'
import Util from '../util'

import Data from './datas/day13'
//启动全局动画
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
 UIManager.setLayoutAnimationEnabledExperimental(true);

class SignIcon extends React.PureComponent{
	
	constructor(props){
		super();
		this.state={
			...props,
			backgroundColor:'#fff',
			zIndex:1
		}
		
	}
	componentWillMount(){
		this.panResponder=PanResponder.create({
			//成为响应者
			 onStartShouldSetPanResponder: (evt, gestureState) => true,
		      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
		      onMoveShouldSetPanResponder: (evt, gestureState) => true,
		      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
			//开始手势操作
			onPanResponderGrant:(e,gs)=>{
				
				//alert(JSON.stringify(gs) )
				this.setState({
					backgroundColor:'#ddd'
				})
					const {index,top,left}=this.props;
					this.props.startMove({dx:gs.dx,dy:gs.dy,index,top,left})
			},
			//移动
			onPanResponderMove:(e,gs)=>{
				const {index,top,left}=this.state;
				this.props.move({dx:gs.dx,dy:gs.dy,index,top,left})
				
			},
			onPanResponderTerminationRequest:()=>true,
			//用户放开所有触摸点
			onPanResponderRelease:(e,gs)=>{
				this.setState({
					backgroundColor:'#fff'
				})
				const {index,top,left}=this.state;
				this.state.top=top+gs.dy;
				this.state.left=left+gs.dx;
				this.props.endMove({dx:gs.dx,dy:gs.dy,index,top,left})
			},
			//另一个组件成为响应者
			onPanResponderTerminate:(e,gs)=>{
				
			}
			
		})
	}
	componentWillReceiveProps(nextprops){
		//return 
		if(nextprops.selectedIndexFlag){
			this.state.top=nextprops.top;
			this.state.left=nextprops.left;
			
		}
	}
	render(){
		const {left,top,color,icon}=this.props;
		const {backgroundColor,zIndex}=this.state
		return (
		<View ref={(icons)=>{this.icon=icons}} style={[styles.sigleIconContainer,{left,top,backgroundColor,zIndex}]} {...this.panResponder.panHandlers}>
			{this.props.isFA?<IconFA size={Util.scaleSize(80)} color={color} name={icon}/>:<Icon size={Util.scaleSize(60)}  color={color} name={icon} />}
			<Text>{this.props.title}</Text>
		</View>
		)
	}
}
export default class extends Component{
	constructor(){
		super();
		this.state = {
			days:Data,
			selectedIndex:1,
			opacity:0
		}
	}
	startMove(index){
		this.index=index
		//alert(index)
		this.setState({
			selectedIndex:this.index
		})
	}
	countMoveOnIndex(gs){//计算移动到第几个元素上
		const {index,top,left,dx,dy}=gs;
		var i=Math.round((top+dy)*5/(Util.size.height-Util.scaleSize(180)))
		var j=Math.round((left+dx)*3/Util.size.width);
		i=i<0?0:i>4?4:i;
		j=j<0?0:j>2?2:j;
		//alert(i)
		const indexIcon=i*3+j;
		return {indexIcon,i,j}
	}
	changElem(indexIcon){//改变元素位置
	
				 
		let day=[...this.state.days];//复制一份数据
	   	this.tem=day[this.index];
	   	
	   	if(this.tem){
	   			day.splice(this.index,1)
	   			day.splice(indexIcon,0,this.tem)
	   		}
	   		
				//LayoutAnimation.linear()
			this.setState({
				days:day,
				selectedIndex:indexIcon
			})
	}
	move(gs){
		 let {index,top,left,dx,dy}=gs;
		// alert(this['signleIcon'+index].icon)
		//计算index,
		const {indexIcon}=this.countMoveOnIndex(gs)
		top+=dy;left+=dx;
		//边界判断
		if(top<-40 || top>Util.size.height-Util.scaleSize(180)||left<-40||left>Util.size.width-40  ){
			return;
		}
		this['signleIcon'+index].icon.setNativeProps({style:{top,left}})

		if(indexIcon!=this.index){
			//LayoutAnimation.easeInEaseOut()
			this.changElem(indexIcon);
			this.index=indexIcon;
		}

		

	}
	endMove(gs){
		
		let {index,top,left,dx,dy}=gs;
	
	 	const {indexIcon,i,j}=this.countMoveOnIndex(gs)
	 	//alert(i)
		
		this.changElem(indexIcon);
		LayoutAnimation.easeInEaseOut()
		
			//	
			//alert(i*(Util.size.height-Util.scaleSize(180))/5)
		this['signleIcon'+index].icon.setNativeProps({style:{top:i*(Util.size.height-Util.scaleSize(180))/5,left:j*Util.size.width/3}})
		
		
	}
	
	sigleItem(item,index){
		let i=Math.floor(index/3);
		let j=index%3
		const top=i*(Util.size.height-Util.scaleSize(180))/5;
		const left=j*Util.size.width/3;
			//alert(i)
		return <SignIcon selectedIndexFlag={this.state.selectedIndex!==index}  index={item.key} move={(gs)=>{this.move(gs)}} endMove={(gs)=>{this.endMove(gs)}} startMove={()=>{this.startMove(index)}} ref={(signleIcon)=>{this['signleIcon'+item.key]=signleIcon}} {...item} top={top} left={left} key={item.key} text={'day'+(index+1)}/>
	}
	render(){
		const {selectedIndex,opacity}=this.state
		let datas=this.state.days.map((item,index)=>{
			return this.sigleItem(item,index)
		})
		const tem=datas.splice(selectedIndex,1)[0];
		datas.push(tem)
	//	datas.push(this.sigleItem(this.state.days[selectedIndex],selectedIndex,opacity))
		return (
			
			<View style={styles.container}>
				{datas}
			  </View>
			
			
		)
	}
}
let styles=StyleSheet.create({
	container:{
		height:Util.size.height,
		width:Util.size.width,
		backgroundColor:'#fff',
		position:'relative',
		
	},
	sigleIconContainer:{
		position:'absolute',
		borderTopWidth:1,
		borderColor:"#ddd",
		borderRightWidth:1,
		width:Util.size.width/3,
		height:(Util.size.height-Util.scaleSize(180))/5,
		alignItems:'center',
		justifyContent:'center',
		zIndex:10
	},
	
})
