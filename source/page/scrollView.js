import React ,{Component}from 'react'
import{ ScrollView, Image, Text, View } from 'react-native'
function ScrollItem (){
	return (
			<Image source={require('../img/data.png')}/>
	)
	
}
class ScrollContainer extends Component{
	constructor(){
		super()
	}
	render(){
		let arr=[];
		for(let i=0;i<15;i++){
			arr.push(<ScrollItem key={i}/>)
		}
		return (
			<ScrollView>
				{arr}
			</ScrollView>
		)
	}
}
export default ScrollContainer