import {StyleSheet} from 'react-native';
import Util from '../../util'
export default StyleSheet.create({
	container:{
		flex:1,
		backgroundColor:'#fff',
	},
	entrance:{
		position:'absolute',
		top:0,left:0,
		height:Util.size.height,
		width:Util.size.width,
		backgroundColor:'#1b95e0',
		alignItems:'center',
		justifyContent:'center',
		zIndex:10
	},
	twitter:{
		color:'#fff',
		position:'relative',
		top:-20,
		textAlign:'center'
	},
	navAndroid:{
    backgroundColor:"#3195d7",
    width:Util.size.width,
    height:55,
    flexDirection:"row",
    justifyContent:"space-between",
    paddingTop:15,
    paddingLeft:20,
    paddingRight:10,
  },
  title:{
    color:"#fff",
    fontSize:20,
    paddingLeft: 10
  },
  iconContainer:{
    flexDirection:"row",
    justifyContent:"space-between",
   	width:60
  },
  logoContainer:{
  
    flexDirection:"row",
    justifyContent:"flex-start"
  },
})
