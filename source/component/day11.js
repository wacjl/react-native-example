import React from 'react';
import {StyleSheet, Text, View, Image,TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import SwipeCards from 'react-native-swipe-cards';
import Util from '../util'

let cards=[
		{img:require('./img/timg.jpg'),name:'1'},
		{img:require('./img/timg1.jpg'),name:'2'},
		{img:require('./img/timg2.jpg'),name:'3'},
		{img:require('./img/timg3.jpg'),name:'4'},
	]
class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
  	const {left,top,zIndex}=this.props;
    return (
      <View style={[styles.cardStyle,this.props.cardStyle,{left,top,zIndex}]}>
        <Image style={styles.thumbnail} resizeMode="stretch" source={ this.props.img} />
        <Text style={styles.text}>This is card {this.props.name}</Text>
      </View>
    )
  }
}
class NoMoreCards extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.noMoreCards}>
        <Text>No more cards</Text>
      </View>
    )
  }
}
export default class App extends React.Component {
  constructor(props) {
    super(props);
    var scards=[...cards].reverse()
    scards.splice(scards.length-1,1)
    this.state = {
      cards,
      scards,
      outOfCards: false
    }
  }

  handleYup (card) {
    console.log("yup")
  }

  handleNope (card) {
    console.log("nope")
  }

  cardRemoved (index) {
  	var scards=[...this.state.scards];
  	 scards.splice(scards.length-1,1)
	this.setState({
		scards,
	})

  }
  refresh(){
  	 var scards=[...cards].reverse()
    scards.splice(scards.length-1,1)
  	this.setState({cards:[...cards],scards})
  }
  render() {
  
  	const {scards}=this.state
  
  	//alert(JSON.stringify(scards))
  	const img=scards.map((item,index)=>{
  		index=scards.length-index+1
  		return <Card key={index} {...item}  left={(Util.size.width-Util.scaleSize(520))/2+index*4} top={Util.scaleSize(Util.scaleSize(96)+index*4)}  cardStyle={styles.scard} />
  	})
    return (
      <View style={{flex:1,backgroundColor:"#fff"}}>
      		
      		<View style={{zIndex:110,width:Util.size.width,height:Util.scaleSize(600)}}>
      			<SwipeCards cards={this.state.cards}   
	      			renderCard={(card)=><Card {...card} cardStyle={styles.card}/>}
	      			 renderNoMoreCards={() => <NoMoreCards />}
	      			 showYup={false} showNope={false} showMaybe={false}
	      			 onClickHandler={()=>{}}
	      			 cardRemoved={(index)=>this.cardRemoved(index)}
      				handleNope={(card)=>{this.handleNope(card)}}
      				smoothTransition={true}
      			/>
      		</View>
      		
      		<View style={{zIndex:100,position:'absolute',width:Util.size.width,height:Util.scaleSize(600)}}>
      			{img}
      		</View>
      		<View style={styles.iconContainer}>
      			
      				<TouchableHighlight underlayColor="#eee" onPress={()=>{this.refresh()}} style={{borderRadius:25}}>
      					<View style={[styles.smallIcon,styles.icon]}>
      					 <Icon name="ios-refresh" color="#fdcd6d" size={30}></Icon>
      					</View>
      				</TouchableHighlight>
      			
      			<View style={[styles.largeIcon,styles.icon]}>
      				<Icon name="md-close" color="#fc6c6e" size={45}></Icon>
      			</View>
      			<View style={[styles.largeIcon,styles.icon]}>
      				<Icon name="md-heart" color="#52cb93" size={45}></Icon>
      			</View>
      			<View style={[styles.smallIcon,styles.icon]}>
      				<Icon name="ios-pin" color="#318ff6" size={30}></Icon>
      			</View>
      		</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
	iconContainer:{
		flexDirection :'row',
		flexWrap :'nowrap',
		alignItems :'center',
		justifyContent :'center',
		marginBottom:50
	},
   icon:{
  		borderColor:'#f5f5f5',
		borderWidth:5,
		alignItems :'center',
		justifyContent :'center',
		marginLeft:2,
		marginRight:2,
		marginTop:2,
		marginBottom:2
   },
	smallIcon:{
		width:50,
		height:50,
		borderRadius:25
	},
	largeIcon:{
		width:80,
		height:80,
		borderRadius:40,
	},
	cardStyle:{
		 alignItems: 'center',
	    borderRadius: 5,
	    overflow: 'hidden',
	    borderColor: 'grey',
	    backgroundColor: 'white',
	    borderWidth: 1,
	    elevation: 1,
	},
	scard:{
	   	position:'absolute',
	   	left:Util.scaleSize((Util.size.width-320)/2),
	   	zIndex:1,
	   	top:Util.scaleSize(50)
	},
  card: {
   	position:'relative',
   	zIndex:100
  },
  thumbnail: {
    width: Util.scaleSize(500),
    height: Util.scaleSize(400),
  },
  text: {
    fontSize: 20,
    paddingTop: 10,
    paddingBottom: 10
  },
  noMoreCards: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})