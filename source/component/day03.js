import React,{Component} from 'react'
import {FlatList, Platform,Animated,Easing,Image,RefreshControl,ScrollView,StatusBar,StyleSheet,TabBarIOS,Text,TouchableHighlight,TouchableOpacity,View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import FacebookTabBar from './facebookTabBar'
import styles from './style/day03'
import ScrollableTabView from 'react-native-scrollable-tab-view';
import Util from '../util'
import Refresh from './refresh'
const AnimatedIcon=Animated.createAnimatedComponent(Icon)
let arr=[]
for(var i=0;i<20;i++){
	arr.push({key:i,text:'这是测试列表'+i})
}
function ItemSeparator(){
	return(
		<View style={{borderBottomWidth :1,borderBottomColor:'#ddd'}}></View>
	)
}
class FlatListTest extends Component{
	constructor(){
		super()
		this.state={
			data:arr,
			refreshing:false,
			loadMoreText:'上拉加载更多',
		}
	}
	shouldComponentUpdate(nextprops,nexstate){
 		return  this.state!==nexstate
 	}
	renderItem({item}){
		return(
			<TouchableHighlight style={{height:30,justifyContent:'center'}}>
				<Text>{item.text}</Text>
			</TouchableHighlight>
		)
	}
	onRefresh(){//下拉刷新
		this.setState({
			refreshing:true
		})
		setTimeout(()=>{
			this.setState({
				refreshing:false
			})
		},1000)
	}
	onEndReached(){//上拉加载
		this.setState({
			loadMoreText:'正在加载...'
		})
		setTimeout(()=>{
			const len=this.state.data.length;
			let data=[];
			for(let i=len;i<len+20;i++){
				data.push({key:i,text:'这是测试列表'+i});
				
			}
			this.setState({
				loadMoreText:'上拉加载更多',
				data:[...this.state.data].concat(data)
			})
		},2000)
	}
	render(){
		return(
		
				<FlatList onRefresh={()=>this.onRefresh()} refreshing={this.state.refreshing} ItemSeparatorComponent={ItemSeparator}
				data={this.state.data} renderItem={this.renderItem}
				onEndReachedThreshold={0.1} onEndReached={()=>this.onEndReached()}
				ListFooterComponent={<View style={{alignItems:'center'}}><Text>{this.state.loadMoreText}</Text></View>}
				
				/>
				
			
			
		)
	}
}

class Entrance extends Component{
	constructor(){
		super();
		this.state={
			transfromAnim:new Animated.Value(1),
			opacityAnim:new Animated.Value(1)
		}
	}
	componentDidMount(){
		Animated.parallel([//同时执行多个动画
			Animated.timing(this.state.opacityAnim,{
				toValue:0,
				duration:1800,
				easing:Easing.elastic(1),
				delay:1200
			}),
			Animated.timing(this.state.transfromAnim,{
				toValue:50,
				duration:2200,
				easing:Easing.elastic(1),
				delay:1000
			}),
		]).start();
		let timer=setTimeout(()=>{
			timer=null;
			clearTimeout(timer)
			this.props.hide && this.props.hide()
		},2500)
	}
	render(){
		return (
			<Animated.View style={[styles.entrance,{opacity:this.state.opacityAnim}]}>
					<AnimatedIcon size={60} style={[styles.twitter,{transform:[{scale:this.state.transfromAnim}]}]} name="logo-twitter"></AnimatedIcon>
			</Animated.View>
		)
	}
}
 
 class TwitterPost extends Component{
 	constructor(){
 		super();
 		this.state={
 			isRefreshing:false
 		}
 	}
 	shouldComponentUpdate(nextprops,nexstate){
 		return  this.state!==nexstate
 	}
 	 _onRefresh() {
	    this.setState({
	      isRefreshing: true,
	    });
	    setTimeout(() => {
	      this.setState({
	        isRefreshing: false
	      });
	    }, 1000);
	  }
 	render(){
 		setTimeout(()=>{
 		//	alert(this.props.time)
 		},this.props.time)
 		
 		 return(
	      	<ScrollView style={{ flex: 1}}
      refreshControl={
          <RefreshControl
            refreshing={this.state.isRefreshing}
            onRefresh={()=>this._onRefresh()}
            tintColor="#ddd"/>}>
            <View  style={{paddingTop:20}} >
            		<Image source={require('./img/day3.png')} style={{width:Util.size.width, height:Util.size.height-110}}></Image>
             <Image source={require('./img/day3.png')} style={{width:Util.size.width, height:Util.size.height-110}}></Image>
            </View>
            
      </ScrollView>
	    )
 		
 	}
 }

class TwitterTab extends Component{
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
		
		const androidTabView=<View style={styles.container}>
								   <View style={styles.navbg}></View>
								   <View style={styles.navAndroid}>
								   		<View style={styles.logoContainer}>
								   			<Icon name="logo-twitter" color="#fff" size={27}/>
								   			<Text style={styles.title}>{this.state.title}</Text>
								   		</View>
								   		<View style={styles.iconContainer}>
								   			<Icon name="ios-search" color="#fff" size={25}/>
								   			<Icon name="ios-create-outline" color="#fff" size={25}/>
								   		</View>
								   </View>
								    <ScrollableTabView  tabBarPosition='bottom' style={{backgroundColor:'#fefefe'}}
							           onChangeTab={(obj)=>this._updateTitle(obj)} scrollWithoutAnimation={true}
							            renderTabBar={() => <FacebookTabBar  titles={this.title}/>}>
							            <FlatListTest tabLabel="ios-home" time={200} />
							            <Refresh tabLabel="ios-notifications" time={1900}/>
							            <TwitterPost tabLabel="ios-mail" time={2500}/>
							            <TwitterPost tabLabel="ios-person" time={5000}/>
							        </ScrollableTabView>
							</View>
		return Platform.os=== "ios"?<View></View>:androidTabView;
	}
}

export default class  extends Component{
	constructor(){
		super()
		this.state={
			show:true
		}
	}
	componentDidMount(){
		StatusBar.setHidden(false)
	}
	hideIcon(){
		this.setState({show:false})
	}
	render(){
		
		let entrance=this.state.show?<Entrance hide={()=>{this.hideIcon()}}/>:<TwitterTab/>;
		return(
				<View style={{flex:1}}>
						{entrance}
						
				</View>
				
			
		)
	}
}
