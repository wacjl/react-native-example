import React,{Component} from 'react'
import {View,Text,TouchableHighlight} from 'react-native'
import GiftedListView from 'react-native-gifted-listview'
let arr=[];
for(var i=0;i<20;i++){
	arr.push({key:i,text:'这是测试列表'+i})
}

export default class extends Component{
	constructor(){
		super();
		this.state={
			data:arr
		}
	}
	_onFetch(page = 1, callback, options){
		setTimeout(()=>{
			callback(arr)
			
		},1500)
	}
	_renderRowView(item){
		return(<TouchableHighlight style={{height:30,justifyContent:'center'}}>
					<Text>{item.text}</Text>
				</TouchableHighlight>
			)
	}
	render(){
		return(
			 <GiftedListView
          rowView={this._renderRowView}
          onFetch={this._onFetch}
          firstLoader={true} // display a loader for the first fetching
          pagination={true} // enable infinite scrolling using touch to load more
          refreshable={true} // enable pull-to-refresh for iOS and touch-to-refresh for Android
          withSections={false} // enable sections
          
        />
		)
	}
}
