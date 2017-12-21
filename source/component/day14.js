import React from "react"
import  TouchID from 'react-native-touch-id'
import {View,Text,TouchableHighlight,Alert} from 'react-native'
//or import TouchID from 'react-native-touch-id'

export default class YourComponent extends React.Component {
  _pressHandler() {
  	const optionalConfigObject = {
		  title: "Authentication Required",
		  color: "#e00606"
		}
  	console.log(TouchID)
  
  }

  render() {
    return (
      <View>
       
        <TouchableHighlight onPress={this._pressHandler}>
          <Text>
            Authenticate with Touch ID
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
};