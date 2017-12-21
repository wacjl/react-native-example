import React,{Component} from 'react'
import {Image,Text,ImageBackground,StyleSheet,ScrollView,TouchableWithoutFeedback,TouchableHighlight,StatusBar,Animated,Easing,View} from 'react-native'
import Util from '../util'

function AnimatedImage(props){
	return (
		<Animated.View style={[styles.animateContainer,props.styles]}>
			<Image style={styles.animateImage} source={props.source}></Image>
			<Text style={styles.text}>{props.text}</Text>
		</Animated.View>
	)
}
export default class Main extends Component{
	constructor(){
		super()
		this.state={
			shift:new Animated.Value(-Util.size.width/3),
			show:true
		}
	}
	menuePopIn(){
		this.setState({show:!this.state.show})
		Animated.timing(this.state.shift,{
			toValue:0,
			duration:200,
			delay:100,
			easing:Easing.elastic(1)
		}).start()
	}
	menuePopOut(){
		
		Animated.timing(this.state.shift,{
			toValue:-Util.size.width/3,
			duration:200,
			delay:50,
			easing:Easing.elastic(1)
		}).start()
		setTimeout(()=>{
			this.setState({show:!this.state.show})
		},245)
		
	}
	render(){
		let arr=[];
		const left=this.state.shift;
		[
			{text:'text',source:require('./img/tumblr-text.png'),styles:{left:left}},
			{text:'audio',source:require('./img/tumblr-audio.png'),styles:{right:left}},
			{text:'chat',source:require('./img/tumblr-chat.png'),styles:{left:left}},
			{text:'link',source:require('./img/tumblr-link.png'),styles:{right:left}},
			{text:'photo',source:require('./img/tumblr-photo.png'),styles:{left:left}},
			{text:'quote',source:require('./img/tumblr-quote.png'),styles:{right:left}}
		].map((item,index)=>{
			arr.push(<AnimatedImage {...item} key={index}/>)
		})
		return(
			<View style={{flex:1}}>
				
				{
					this.state.show?
					<ScrollView style={{flex:1}}>
					<TouchableWithoutFeedback onPress={()=>{this.menuePopIn()}}>
						<Image style={styles.img} source={require('./img/tumblr.png')}></Image>
					</TouchableWithoutFeedback>
					</ScrollView>
					:<ImageBackground style={{flex:1}} source={require('./img/tumblrblur.png')}>
						<View style={{alignItems:'center',flexDirection:'row',flexWrap:'wrap',flex:1,justifyContent:'center'}}>
							{arr}
							<TouchableHighlight  underlayColor="rgba(0,0,0,0)" onPress={()=>{this.menuePopOut()}}>
								<Text style={styles.dismiss}>NeverMind</Text>
							</TouchableHighlight>
						</View>
					</ImageBackground >
				}
			</View>
		)
	}
}

const styles=StyleSheet.create({
		img:{
			width:Util.size.width,
			height:Util.size.width*1.76,
			resizeMode:'contain'
		},
		animateContainer:{
			width:parseInt(Util.size.width/2),
			height:130,
			alignItems:'center',
			marginTop:20
		},
		animateImage:{
			width:120,
			height:100
		},
		text:{
			color:'#fff',
			fontSize:18
		},
		 dismiss:{
		    textAlign:"center",
		    color:"rgba(255,255,255,0.2)",
		    fontWeight:"700",
		    backgroundColor: "transparent"
		  },
})