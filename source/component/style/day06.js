import {StyleSheet} from 'react-native'
import Util from '../../util'
const width=Util.size.width*0.7
export default StyleSheet.create({
	userHead:{
		width:width,
		height:200
	},
	menuContainer:{
		width:width,
		backgroundColor:'#fff',
		height:Util.size.height-180
	},
	itemContainer:{
		flexDirection :'row',
		padding:10
	},
	icon:{
		marginLeft:10
	},
	text:{
		marginLeft:20
	},
	sideMenu:{
		position:'absolute',
		width:width+50,
		left:-width,
		bottom:0,
		top:0,
		backgroundColor:'transparent',
		zIndex:10
	},
	drop:{
		position:'absolute',
		top:0,
		left:0,
		bottom:0,
		right:0,
		backgroundColor:'#000',
		opacity:0,
		zIndex:1
	}
})
