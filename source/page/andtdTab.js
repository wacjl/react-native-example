import React from 'react';
import Tabs  from 'antd-mobile/lib/tabs';

import Badge  from 'antd-mobile/lib/badge';


import {View,Text,Button} from 'react-native'

const TabPane = Tabs.TabPane;

function callback(key) {
  console.log('onChange', key);
}
function handleTabClick(key) {
  console.log('onTabClick', key);
}
class TabExample extends React.PureComponent{
	constructor(){
		super()
		this.state={
			activeKey:'1'
		}
	}
	render(){
	//	alert(this.props.navigation.state.params.name)
	 const { navigate } = this.props.navigation;
		return(
			 <View style={{flex:1}}>
			  <Button
        title="Go to Jane's Main"
        onPress={() =>
          navigate('Main', { name: 'Jane' })
        }
      />
    <Tabs defaultActiveKey={this.props.navigation.state.params.name} onChange={callback} onTabClick={handleTabClick}>
      <TabPane tab='sds' key="1">
      
      	<Text>{this.props.navigation.state.params.name}</Text>
      </TabPane>
     <TabPane tab='sdsrrr' key="2">
      
      	<Text>dada</Text>
      </TabPane>
    </Tabs>
  
  </View>
		)
	}
}

export default TabExample
