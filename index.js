#!/usr/bin/env node

/**
 * @Author zlx
 * @Date 2018/1/30 上午10:21
 */

var UID = "UAD9D6399A";
var KEY = "ywcnpsuzecuqf4ez";
var LOCATION = "Beijing"; // 除拼音外，还可以使用 v3 id、汉语等形式
var Api = require("./lib/index");
var all = require("optimist").argv.a || false; // 3天天气all

var Spinner = require("cli-spinner").Spinner;
var spinner = new Spinner("努力查询中... %s");
var chalk = require("chalk");
var api = new Api(UID, KEY);
var color = "white";
var inputCity = require("optimist").argv._[0];
var getIP = require("./lib/getIp");
// get local city
getIP()
  .then(function(resp) {
    if (resp && typeof resp === "string") {
      try {
        resp = JSON.parse(resp);
        var data = resp.data;
        var city = inputCity || data.city; // local city
        getWeather(city);
      } catch (err) {
        console.log(err);
      }
    }
  })
  .catch(function(err) {
    var city = inputCity || LOCATION; // default city
    getWeather(city);
  });

var getWeather = function(city) {
  api
    .getWeatherNow(city, all, function() {
      spinner.setSpinnerString("|/-\\");
      spinner.start();
    })
    .then(function(data) {
      spinner.stop(true);
      var color_output = chalk.keyword(color);
      if (data.results[0].daily) {
          var result = data.results[0].daily;
          var str = '\r\n';
          result.forEach(d => {
              str += `${d.date}日 \t 白天：${d.text_day} \t 晚间：${d.text_night} \t 气温：${d.high} ~ ${d.low} \t 风向：${d.wind_direction}\r\n`
          })
        console.log(
          color_output(
            `${data.results[0].location.name}近三天的天气为：${str}`
          )
        );
      } else {
        var result = data.results[0];
        console.log(
          color_output(
            `${result.location.name}现在的天气为：${
              result.now.text
            }，实时气温：${result.now.temperature}摄氏度。`
          )
        );
      }
    })
    .catch(function(err) {
      console.log(err.error.status);
      spinner.stop(true);
    })
    .done();
};
