import React from 'react';
import { PixelRatio } from 'react-native';
import Dimensions from 'Dimensions';
//alert(Dimensions.get('window').width)
//alert(PixelRatio.get())
/**
 * 屏幕工具类
 * ui设计基准,iphone 6
 * width:750
 * height:1334
 */

var screenW = Dimensions.get('window').width;
var screenH = Dimensions.get('window').height;
var fontScale = PixelRatio.getFontScale();
var pixelRatio = PixelRatio.get();

const r2=2;
const w2 = 750/r2;
const h2 = 1334/r2;


function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}
const Util = {
  ratio: PixelRatio.get(),
  pixel: 1 / PixelRatio.get(),
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  setFontSize(size:Number) {
    var scale = screenW / w2;
    size =size * scale * pixelRatio / fontScale;
    return size/r2;
 },
  scaleSize(size) {
    var scale = screenW / w2;
    return size*scale/r2;
 },
 post(url, data, callback) {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
	return fetch(url, fetchOptions).then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }))
   /* fetch(url, fetchOptions)
    .then((response) => {
      return response.json() 
    })
    .then((responseData) => {
      callback(responseData);
    });*/
  },
  key: 'BDKHFSDKJFHSDKFHWEFH-REACT-NATIVE',
};


// import {StyleSheet, Platform} from 'react-native';

// export function create(styles: Object): {[name: string]: number} {
//   const platformStyles = {};
//   Object.keys(styles).forEach((name) => {
//     let {ios, android, ...style} = {...styles[name]};
//     if (ios && Platform.OS === 'ios') {
//       style = {...style, ...ios};
//     }
//     if (android && Platform.OS === 'android') {
//       style = {...style, ...android};
//     }
//     platformStyles[name] = style;
//   });
//   return StyleSheet.create(platformStyles);
// }

export default Util;