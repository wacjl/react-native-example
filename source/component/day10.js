import React,{Component} from 'react';
import {Image,ScrollView,StyleSheet,StatusBar,CameraRoll,Text,TextInput,TouchableHighlight,View} from 'react-native'
import Util from '../util'
import Icon from 'react-native-vector-icons/Ionicons';

class FunctionView extends Component{
	constructor(){
		super();
		this.state={
			images:[]
		}
	}
	componentDidMount() {
    const fetchParams = {
      first: 6,
    };
    CameraRoll.getPhotos(fetchParams).done((data) => this.storeImages(data), (err) => this.logImageError(err));
  }

  storeImages(data) {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: images,
    });
  }

  logImageError(err) {
    console.log(err);
  }
	render(){
		return(
			<View style={styles.functionContainer}>
				<View style={styles.functionIconContainer}>
					<View style={styles.functionIcon}>
						<Icon name="ios-alarm" size={23} color="#8899a5"/>
						<Icon name="md-camera" size={23} color="#8899a5"></Icon>
			            <Icon name="md-image" size={23} color="#8899a5"></Icon>
			            <Icon name="md-pie" size={23} color="#8899a5"></Icon>
					</View>
					<View style={styles.functionBtn}>
						<Text style={styles.text}>{this.props.numOfText}</Text>
						<TouchableHighlight style={this.props.numOfText==140?styles.btn:styles.activeBtn}>
			              <Text style={this.props.numOfText==140?styles.btnText:styles.activeBtnText}>发推</Text>
			            </TouchableHighlight>
					</View>
				</View>
				<ScrollView style={styles.scrollView}>
					<View style={styles.imageGrid}>
						<View style={styles.imageIcon}>
			            <Icon name="ios-camera" size={80} color="#2aa2ef"></Icon>
			          </View>
			          <View style={styles.imageIcon}>
			            <Icon name="ios-videocam" size={80} color="#2aa2ef"></Icon>
			          </View>
			            { this.state.images.map((image,index) => <View key={index} style={styles.imageIcon}><Image   style={styles.image} source={{ uri: image.uri }} /></View>) }
					</View>
			          
		         </ScrollView>
			</View>
		)
	}
}
export default class extends Component{
  constructor() {
    super();
    this.state = {
      numOfText:140,
    };
  }
  
  componentDidMount() {
    //StatusBar.setBarStyle(0);
  }

  _updateTextNum(text) {
    let remain = 140 - text.length;
    this.setState({
      numOfText:remain,
    });
  }

  render() {
    return(
      <View style={styles.container}>
     
        <TextInput 
          ref="textarea"
          style={styles.textArea}
          maxLength={140}
          multiline={true}
          placeholder="有什么新鲜事？"
          editable ={false}
          selectionColor="#2aa2ef"
          placeholderTextColor="#ced8de" underlineColorAndroid="transparent"
          onChangeText={(text) => this._updateTextNum(text)}></TextInput>
        <FunctionView numOfText={this.state.numOfText}></FunctionView>
      </View>
    )
  }
}
const styles=StyleSheet.create({
	scrollView: {
    
 	height:200,
 	
  },
	container:{
    paddingTop:30,
    height:Util.size.height,
    backgroundColor: "#ffffff"
  },
  icon:{
    width:30,
    height:30,
    borderRadius:5,
  },
  iconContainer:{
    paddingLeft:15,
    paddingRight:15,
    flexDirection:"row",
    justifyContent:"space-between",
  },
  textArea:{
    height:335,
   padding: 0,
    fontSize:20,
    textAlignVertical: 'top'
  },
  functionContainer:{
    
    width:Util.size.width,
    position:"absolute",
    bottom:0,
    left:0,
    borderTopWidth:1,
    borderTopColor:"#a0adb7"
  },
  functionIconContainer:{
    height:50,
    alignItems:"center",
    justifyContent:"space-between",
    flexDirection:"row",
    borderBottomWidth:1,
    borderBottomColor:"#ccd6dd"
  },
  functionIcon:{
    width:210,
    flexDirection:"row",
    justifyContent:"space-around"
  },
  functionBtn:{
    width:110,
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
  },
  btn:{
    height:35,
    width:60,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:6,
    borderColor:"#ccd6dd",
    borderWidth:1
  },
  activeBtn:{
    height:35,
    width:60,
    alignItems:"center",
    justifyContent:"center",
    borderRadius:6,
   backgroundColor:"#2aa2ef"
  },
  text:{
    color:"#ccd6dd",
    fontSize:18
  },
  btnText:{
    color:"#ccd6dd",
    fontSize:14
  },
  activeBtnText:{
    color:"#fff",
    fontSize:14
  },
  imageGrid:{
    flexDirection:"row",
    flexWrap:"wrap",
  	paddingBottom:70
  },
  imageIcon:{
    width: Util.size.width/3,
    
    alignItems:"center",
    justifyContent:"center",
    borderRightColor:"#ddd",
    borderBottomColor:"#ddd",
    borderRightWidth:1,
    borderBottomWidth:1
  },
  image:{
    width: Util.size.width/3,
    height:113,
    
  }
})
