import {StyleSheet} from 'react-native'
import Util from '../../util'
export default  StyleSheet.create({
	itemWrapper:{
  	backgroundColor: '#fff'
  },
	twitterContainer:{
  	width: Util.size.width,
  	height: Util.size.height,
    backgroundColor:"#fff",
  },
	userContainer:{
		width: Util.size.width,
  	height: Util.size.height-50,
  	backgroundColor:"#fff",
  	position:"absolute",
  	top:0,
  	left:0,
	},
	detailScroll:{
		backgroundColor:"#f5f8fa",
		width: Util.size.width,
  	height: Util.size.height-320,
  
    borderTopWidth:Util.pixel,
    borderTopColor:"#9eacb6"
	},
	userPanel:{
		flex:1,
		height:300,
	},
	banner:{
		width: Util.size.width,
		height:125,
		position:"absolute",
		top:0,
		left:0
	},
  iconContainer:{
    position:"absolute",
    left:10,
    top:95,
    borderWidth:5,
    borderColor:"#fff",
    borderRadius:5,
  },
  icon:{
    width:68,
    height:68
  },
  userControl:{
    height:55,
    width: 200,
    flexDirection:"row",
    alignItems:"center",
    marginLeft:Util.size.width-210,
    justifyContent:"space-between"
  },
  controlBtn:{
    borderColor:"#8999a5",
    borderWidth:1,
    paddingTop:3,paddingLeft:5,paddingBottom:3,paddingRight:5,
    borderRadius:3,
    width:40,
    height:30,
    alignItems:"center",
    justifyContent:"center"
  },
  controlBtn2:{
    borderColor:"#8999a5",
    borderWidth:1,
    paddingTop:3,paddingLeft:5,paddingBottom:3,paddingRight:5,
    borderRadius:3,
    width:120,
    height:30,
    alignItems:"center",
    justifyContent:"center"
  },
  controlIcon:{
    width: 30
  },
  controlBtnText:{
    color:"#8999a5",
    fontSize:14
  },
  other:{
  	position:'absolute',
  	top:125,
  	bottom:50,
  width: Util.size.width
  },
  userInfo:{
    width: Util.size.width-10,
  
    paddingTop:15, paddingLeft:15, paddingBottom:15,
   
    height:90,
  },
  userInfoName:{
    color:"#292f33",
    fontSize:20,
    fontWeight:"500",
    paddingBottom:5
  },
  userInfoAccount:{
    color:"#66757f",
    paddingBottom:5
  },
  userInfoFollower:{
    color:"#95a4ae",
    width:110
  },
  userInfoFollowing:{
    color:"#95a4ae",
    width:110
  },
  userInfoFollow:{
    flexDirection:"row"
  },
  fontEm:{
    color:"#292f33",
    fontWeight:"500"
  },
  segment:{
    position: "absolute",
    top: 263,
    left:0,
    width: Util.size.width-15,
    paddingLeft:15,
    height:40,
  },
});