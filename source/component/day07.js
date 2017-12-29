import React,{Component} from 'react'
import { Platform,Image,PanResponder,RefreshControl,FlatList,StatusBar,StyleSheet,Text,TouchableHighlight,TouchableOpacity,View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FacebookTabBar from './facebookTabBar'
import styles from './style/day03'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Util from '../util'
import myStyle from './style/day07';
import SegmentedControlTab  from 'react-native-segmented-control-tab'

 
 class TwitterPost extends Component{
 	constructor(){
 		super();
 		this.scale=1;
	 	this.bannerTop=0;
	 	this.iconTop=95;
	 	this.opacity=0;
	 	this.previousTop=0;
	 	this.minTop=-192;
	 	this.userStyle={style:{}}
 		this.state={
 			isRefreshing:false,
 			index:0,
 			bannerTop:this.bannerTop,
 			iconTop:this.iconTop,
 			scale:this.scale,
 			opacity:this.opacity,
 		}
 	}
 	updatePosition(){
 		this.user && this.user.setNativeProps(this.userStyle)
 	}
 	endMove(evt, gs) {
 		if(this.userStyle.style.top<=-62.5){
 			this.opacity=1;
 			this.setState({
 				opacity:this.opacity
 			})
 		}else{
 			this.scale=1;
 			this.iconTop=95;
	     	this.opacity=0;
	     	this.bannerTop=0;
	     	this.setState({
	     		bannerTop:this.bannerTop,
	 			iconTop:this.iconTop,
	 			scale:this.scale,
	 			opacity:this.opacity,
	     	})
 		}
		this.previousTop = this.userStyle.style.top;
	}
 	componentWillMount(){
 		this.panResponder=PanResponder.create({
 			onStartShouldSetPanResponder:()=>true,
 			onStartShouldSetPanResponderCapture:()=>false,
 			onMoveShouldSetPanResponder:(evt,gs)=>{
 				
 				return false
 			},
 			onPanResponderGrant:()=>{},
 			onPanResponderMove:(evt,gs)=>{
 			if(this.a && this.a.index!==0 )return;
 				let top=this.previousTop+gs.dy;
 				this.userStyle.style.top=top
 				this.scale=1+top/162.5;
 				this.iconTop=95+top;
 				this.bannerTop=top;
 				this.opacity=0;
 				
 				if(top<-62.5){
 					this.scale=0.6;
 					this.iconTop=48;
 					this.bannerTop=-62.5;
 					
 					this.opacity=Math.pow((-top-62.5)/129.5,0.5)
 				}
 				if (top>0) {
		       		  this.userStyle.style.top = 0;
		       		  this.bannerTop=0;
			          this.scale = 1;
			          this.iconTop = 95
			          this.opacity=0
		       	};
		       	if (this.userStyle.style.top < this.minTop) {
		       		  this.userStyle.style.top = this.minTop;
			          this.opacity = 1;
			          this.iconTop=48;
			          // this._scrollEnabled = true;
		       	};
		       	 this.setState({
		          // scrollEnabled: this._scrollEnabled,
		          scale: this.scale,
		          iconTop: this.iconTop,
		          bannerTop: this.bannerTop,
		          opacity: this.opacity
		        });
				this.updatePosition();
 			},
 			onPanResponderTerminationRequest: (evt, gestureState) => true,
	        onPanResponderRelease: (evt, gestureState) => {
	        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
	        // 一般来说这意味着一个手势操作已经成功完成。
	       // if(this.a.index!==0 )return;
	        this.endMove(evt, gestureState)
	       },
	        onPanResponderTerminate: (evt, gestureState) => {
	        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
	        //if(this.a.index!==0 )return;
	         this.endMove(evt, gestureState)
	       }
 			
 		})
 	}
 	onViewableItemsChanged(info){
 		//alert(JSON.stringify(info.viewableItems[0]))
 		this.a=info.viewableItems[0]
 	}
 	render(){
 		 return(
	    	<View style={myStyle.userContainer} ref={(user)=>{this.user}} {...this.panResponder.panHandlers}>
	    		<View style={myStyle.userPanel}>
	    			<Image style={[myStyle.banner,{top: this.state.bannerTop, opacity:1-this.state.opacity}]} source={require('./img/userHead.png')}></Image>
	    			<View style={{position:"absolute",alignItems:'center',justifyContent:'center', width:Util.size.width,height:62.5,left:0,   top: this.state.bannerTop+62.5,opacity:this.state.opacity, backgroundColor:"green",}}>
	    					   <Text style={{fontSize:20, fontWeight:"500",color:"#fff"}}>Github</Text>
	    			</View>
         
	    			<View style={[myStyle.iconContainer,{top:this.state.iconTop,transform:[{scale:this.state.scale}]}]}>
	    				<Image  style={[myStyle.icon,{resizeMode:"contain"}]} source={require('./img/userHead.png')}></Image>
	    			</View>
	    			<View style={myStyle.other,{top:this.state.bannerTop+125}}>
	    				<View style={myStyle.userControl}>
	    					<TouchableHighlight style={[myStyle.controlIcon,{alignItems:'center'}]} underlayColor="#ddd"  onPress={()=>true}>
	    							<Icon name="ios-settings" color="#8999a5" size={20}/>
	    					</TouchableHighlight>
	    					<TouchableHighlight style={myStyle.controlBtn} underlayColor="#ddd" onPress={()=>true}>
	    							<Icon name="ios-people" color="#8999a5" underlayColor="#ddd"size={20}/>
	    					</TouchableHighlight>
	    					<TouchableHighlight style={myStyle.controlBtn2}  underlayColor="#ddd" onPress={()=>true}>
	    							<Text style={styles.controlBtnText}>编辑个人资料</Text>
	    					</TouchableHighlight>
	    			   </View>
	    			   <View style={myStyle.userInfo}>
	    			   		<Text style={myStyle.userInfoName}>Github</Text>
	    			   		  <Text style={myStyle.userInfoAccount}>@Github</Text>
				            <View style={myStyle.userInfoFollow}>
				              <Text style={myStyle.userInfoFollowing}><Text style={styles.fontEm}>183</Text> 正在关注</Text>
				              <Text style={myStyle.userInfoFollower}><Text style={styles.fontEm}>830k</Text> 关注者</Text>
				            </View>
	    			   </View>
	    			   <SegmentedControlTab 
					    titles={["First", "Second", "Third"]}
					    selectedIndex={this.state.index}
					    stretch
					    onTabPress={index => this.setState({ index })}
						/>
						<FlatList keyExtractor={(item,index)=>index}
						  data={[{key: './img/tumblr.png'},{key: './img/tumblr.png'}, {key: './img/tumblr.png'}]}
						  renderItem={({item,index}) =>index===0?<Text></Text>:  <Image resizeMethod ="resize" style={{width:Util.size.width, height:Util.size.width*1.76,resizeMode :'contain'}} source={require('./img/tumblr.png')}></Image>}
						/>
					
				
	    			</View>
	    			
	    			
	    		</View>
	    	</View>
	    )
 		
 	}
 }

export default class  extends Component{
	constructor(){
		super()
		this.state={
			title:'主页',
			selectedTab:'主页'
		}
		this.title=['主页','通知','私信','我的']
	}
	_updateTitle(obj){
		//alert(JSON.stringify(obj))
		this.setState({
			title:this.title[obj.i]
		})
	}
	render(){
		
		const androidTabView=<View style={myStyle.twitterContainer}>
									<StatusBar translucent ={true} backgroundColor="transparent"/>
								  
								    <ScrollableTabView  tabBarPosition='bottom' 
							           onChangeTab={(obj)=>this._updateTitle(obj)}
							            renderTabBar={() => <FacebookTabBar  titles={this.title}/>}>
							            <TwitterPost tabLabel="ios-home"  />
							            <TwitterPost tabLabel="ios-notifications" />
							            <TwitterPost tabLabel="ios-mail" />
							            <TwitterPost tabLabel="ios-person" />
							        </ScrollableTabView>
							</View>
		return Platform.os=== "ios"?<View></View>:androidTabView;
	}
}


