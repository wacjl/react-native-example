import React,{Component} from 'react'
import {Platform,ScrollView,FlatList,StausBar,Text,TouchableHighlight,View} from 'react-native';

import styles from './style/day01'


class WatchFace extends Component{
	static propTypes={
		sectionTime:React.PropTypes.string.isRequired,
		totalTime:React.PropTypes.string.isRequired,
	}
	render(){
		return (
			<View style={styles.watchFaceContainer}>
				<Text style={styles.sectionTime}>{this.props.sectionTime}</Text>
				<Text style={styles.totalTime}>{this.props.totalTime}</Text>
			</View>
		)
	}
}
class WatchControl extends Component{
	constructor(props){
		super(props)
		this.state={
			watchOn:false,
			startBtnText:'启动',
			starBtnColor:'green',
			stopBtnText:'计次',
			underlayColor:'#fff'
		}
	}
	
	record=()=>{
		this.props.record && this.props.record(this.state.stopBtnText==='计次')
	}
	start=()=>{
	
		let startBtnText=this.state.startBtnText
		const json=startBtnText==='启动'?{startBtnText:'停止',starBtnColor:'red',start:true,stopBtnText:'计次',}
										:{startBtnText:'启动',starBtnColor:'green',start:false,stopBtnText:'复位',};
		this.setState({
			...json
		})
		this.props.start&&this.props.start(json.start)
	}
	render(){
		return(
			<View style={styles.watchControlContainer}>
				<View style={{flex:1,alignItems:'flex-start'}}>
					<TouchableHighlight onPress={this.record} style={styles.btnStop} underlayColor='#eee'>
						<Text style={styles.btnStopText}>{this.state.stopBtnText}</Text>
					</TouchableHighlight >
				</View>
				<View style={{flex:1,alignItems:'flex-end'}}>
					<TouchableHighlight  onPress={this.start} style={styles.btnStart} underlayColor="#eee">
						<Text style={Object.assign({},styles.startBtnText,{color:this.state.starBtnColor})}>{this.state.startBtnText}</Text>
					</TouchableHighlight >
				</View>
			</View>
		)
	}
}
 
class WatchRecordItem extends React.PureComponent{
	render(){
		const rowData=this.props.data
		return(
			 <View style={styles.recordItem}>
	            
	            <View style={{alignItems: "center",flexDirection:'row'}}>
	              <Text style={styles.recordItemTitle}>{rowData.title}</Text>
	              <Text style={styles.recordItemTime}>{rowData.time}</Text>
	            </View>
          </View>
		)
	}
}
export default class extends Component{
	 static navigationOptions = {
	    title: '计数器'
	  };
	constructor(){
		super()
		this.state={
			 totalTime: "00:00.00",
	         sectionTime: "00:00.00",
	         recordCounter: 0,
	         record:[{title:'1dasd',time:'99'}]
		}
	}
	componentWillUnmount() {
    this.timer && clearInterval(this.timer);
 	 }
	cuntTime=(time)=>{
		let minute = Math.floor(time/(60*1000)),
		second = Math.floor((time-6000*minute)/1000),
		milSecond = Math.floor((time%1000)/10);
		return {minute,second,milSecond}
	}
	lessTen=(data)=>{
		return Number(data)<10?'0'+data:data
	}
	start=(flag)=>{
		//alert(flag)
		this.totalTime=this.totalTime || new Date().getTime();
		this.lastRecordTime=this.lastRecordTime||new Date().getTime();
		if(flag){
			this.timer=setInterval(()=>{
				let totalTime=this.cuntTime(new Date().getTime()-this.totalTime),
		       
		         sectionTime=this.cuntTime(new Date().getTime()-this.lastRecordTime);
		        this.setState({
		        	totalTime:this.lessTen(totalTime.minute)+':'+this.lessTen(totalTime.second)+":"+this.lessTen(totalTime.milSecond),
		        	sectionTime:this.lessTen(sectionTime.minute)+':'+this.lessTen(sectionTime.second)+":"+this.lessTen(sectionTime.milSecond)

		        })
			},1000)
		}else{
			clearInterval(this.timer);
			this.timer=null;
		}
		
	}
	record=(flag)=>{
		if(flag){//计数
			let recordCounter=this.state.recordCounter++;
			let record=this.state.record;
			let sectionTime=this.state.sectionTime;
			this.lastRecordTime=new Date().getTime();
			
			this.setState({
				record:[...record,{title:'第'+recordCounter+'次计数',time:sectionTime}],
				sectionTime:'00:00.00'
			})
		}else{
			this.lastRecordTime=null;
			this.totalTime=null;
			this.setState({
				 totalTime: "00:00.00",
		         sectionTime: "00:00.00",
		         recordCounter: 0,
		         record:[{title:'1dasd',time:'99'}]
			})
		}
		
	}
	render(){
		return(
			<View style={styles.watchContainer}>
				<WatchFace totalTime={this.state.totalTime} sectionTime={this.state.sectionTime}/>
				<WatchControl start={this.start} record={this.record}/>
				
					<FlatList style={{height:200}} keyExtractor={(item,index)=>index} data={this.state.record} renderItem={({item,index})=><WatchRecordItem  data={item}/>}/>
			
				
			</View>
		)
	}
}
