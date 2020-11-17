(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

//openWeatherAPIより天気情報(5日間3時間おき)を取得
let getFromAPI = function (api_type, area_id,callback) {
     const fetch = require('node-fetch');
     const url_base = 'https://api.openweathermap.org/data/2.5/';
     let url_pram = '?id=' + area_id + '&units=metric&appid=b2deb02248945235bb20563e4ac91ed7';
     let url = url_base + api_type + url_pram;
     fetch(url).then((res)=> {
               return res.json()
     })
     .then(function(jsonData){
          // JSONデータを扱った処理など
           data = jsonData 
     })
     .then(() => {
          callback(data)
     })
}

const getWeather = function(data) {
     let forecasts = data.list;
     let day = 0;
     let number = 1;
     forecasts.forEach((forecast) => {
          //予報日時(unix→JST)
          let datetime = new Date(forecast.dt * 1000);
          let year = datetime.getFullYear();
          let month = datetime.getMonth()+1;
          if(day !== datetime.getDate()) {
               day = datetime.getDate();
               let date = '<div>' + year + '年' + month + '月' + day + '日'+'</div>';
               let date_number = "#date" + number;
               document.querySelector(date_number).innerHTML += date;
          }

          //JST時時間
          let hour = ( datetime.getHours()   < 10 ) ? '0' + datetime.getHours()   : datetime.getHours();
          let min  = ( datetime.getMinutes() < 10 ) ? '0' + datetime.getMinutes() : datetime.getMinutes();
          let time = hour + ':' + min;

          //予報天気情報
          let weather = forecast.weather[0].description;

          //アイコン取得
          let icon = forecast.weather[0].icon;
          let icon_tab = '<img src="https://openweathermap.org/img/wn/' + icon + '@2x.png">'

          
          let inner = '<div>' + time + weather + icon_tab + '</div>';
          let box_number = "#box" + number;
          document.querySelector(box_number).innerHTML += inner;

          if(inner.substr(5,5) === "21:00") {
               number += 1;
          }
     })
}

getFromAPI('forecast', 1850144,getWeather);


},{"node-fetch":2}],2:[function(require,module,exports){
(function (global){(function (){
"use strict";

// ref: https://github.com/tc39/proposal-global
var getGlobal = function () {
	// the only reliable means to get the global object is
	// `Function('return this')()`
	// However, this causes CSP violations in Chrome apps.
	if (typeof self !== 'undefined') { return self; }
	if (typeof window !== 'undefined') { return window; }
	if (typeof global !== 'undefined') { return global; }
	throw new Error('unable to locate global object');
}

var global = getGlobal();

module.exports = exports = global.fetch;

// Needed for TypeScript and Webpack.
if (global.fetch) {
	exports.default = global.fetch.bind(global);
}

exports.Headers = global.Headers;
exports.Request = global.Request;
exports.Response = global.Response;
}).call(this)}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
