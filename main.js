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
     let weathers = data.list;
     weathers.forEach((weather) => {
          let temp = weather.main.temp;
          document.querySelector('#weather').innerHTML = temp
          // console.log(temp)
     })
}

getFromAPI('forecast', 1850144,getWeather);

// 'use strict';

// const http = require('http');
// const MY_WEATHER_APIKEY = 'b2deb02248945235bb20563e4ac91ed7';
// const LAT = 33.60639;  //緯度
// const LON = 130.41806;  //経度
// const req = 'http://api.openweathermap.org/data/2.5/weather?lat='+LAT+'&lon='+LON+'&appid='+ MY_WEATHER_APIKEY;

// http.get(req, res => {
//   var body ='';
//   res.setEncoding('utf8');
//   res.on('data', (chunk) => {
//     body += chunk;
//   });
//   res.on('end', () => {
//     res = JSON.parse(body);
//     console.log(res.weather[0].main);
//   });
// })
//   .on('error', e => {
//     console.error(e.message);
// });