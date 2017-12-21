import React,{Component} from 'react'
import {View,Text,Image,StyleSheet,Slider,StatusBar,TouchableHighlight,ScrollView} from 'react-native'
import GL from 'gl-react'
import {Surface} from 'gl-react-native'
import Util from '../util'

const shaders = GL.Shaders.create({
  helloGL: {
	 frag: `
		precision highp float;
		varying vec2 uv;
		uniform float blue;
		void main () {
		  gl_FragColor = vec4(uv.x, uv.y, blue, 1.0);
		}`
  },
  saturation: {
    frag: `
		precision highp float;
		varying vec2 uv;
		uniform sampler2D image;
		uniform float factor;
		
		void main () {
		  vec4 c = texture2D(image, uv);
		  // Algorithm from Chapter 16 of OpenGL Shading Language
		  const vec3 W = vec3(0.2125, 0.7154, 0.0721);
		  gl_FragColor = vec4(mix(vec3(dot(c.rgb, W)), c.rgb, factor), c.a);
		}
    `
  }
});

const HelloGL= GL.createComponent(
  ({ blue }) =>
  <GL.Node
    shader={shaders.helloGL}
    uniforms={{ blue }}
  />,
  { displayName: "HelloGL" });
  
  const Saturation=GL.createComponent(
  ({ factor, image }) =>
  <GL.Node
    shader={shaders.saturation}
    uniforms={{ factor, image }}
  />,
{ displayName: "Saturation" });

export default class GLLearn extends Component{
	constructor(){
		super()
		this.state={
			value:0,
			saturationFactor:3
		}
	}
	render(){
		const {value,saturationFactor}=this.state
		return(
			<View style={{flex:1}}>
			 <Slider maximumValue = {1}  value = {0}
	          onValueChange={(value) => this.setState({value: value})} />
	          <Surface width={Util.size.width} height={200} backgroundColor={'transparent'} setZOrderOnTop={true}>
				  <HelloGL  blue={value} />
				</Surface>
				<Slider maximumValue = {1}  value = {1}
	          onValueChange={(saturationFactor) => this.setState({saturationFactor:saturationFactor*3})} />
				<Surface width={Util.size.width} height={200} backgroundColor={'transparent'} setZOrderOnTop={true}>
				  <Saturation
				  factor={saturationFactor}
				  image="http://i.imgur.com/iPKTONG.jpg"
				/>
				</Surface>
				
			</View>
			   
		)
	}
}




