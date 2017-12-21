import React,{Component} from 'react'
import {View,WebView} from 'react-native'
import Util from '../util'
const html =`
	<!DOCTYPE html>\n
<html>
  <head>
    <title>Hello Static World</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=320, user-scalable=no">
    <link href='./test.css' rel="stylesheet" type="text/css"/>
    <style type="text/css">
      body {
        margin: 0;
        padding: 0;
        font: 62.5% arial, sans-serif;
        background: #ccc;
      }
      h1 {
        padding: 45px;
        margin: 0;
        text-align: center;
        color: #33f;
      }
    </style>
  </head>
  <body>
    <h1>Hello Static World</h1>
    <h3 class="test">test css</h3>
  </body>
</html>
`

export default class extends Component{
	componentDidMount(){
		this.getData()
		
	}
	 async  getData(){
		var data=await  Util.post('http://172.18.0.112:8083/login',{name:'test',pwd:'test11'})
		alert(JSON.stringify(data))
	}
	render(){
		return(
			<View style={{flex:1}}>
				<WebView startInLoadingState ={true} source={{uri:'https://www.baidu.com/'}}/>
			</View>
		)
	}
}
