#!/usr/bin/env node

/**
 * @Author zlx
 * @Date 2018/1/30 上午10:21
 */

const UID = "UAD9D6399A";
const KEY = "ywcnpsuzecuqf4ez";
var LOCATION = "Beijing"; // 除拼音外，还可以使用 v3 id、汉语等形式
var Api = require('./lib/index');
var city = require('optimist').argv._[0] || LOCATION; // city
var flag = require('optimist').argv.a || false; // 3天天气flag

var Spinner = require('cli-spinner').Spinner;
var spinner = new Spinner('努力查询中... %s');
var chalk = require('chalk');
var api = new Api(UID, KEY);
var color = 'white';
api.getWeatherNow(city, flag, function() {
    spinner.setSpinnerString('|/-\\');
    spinner.start();
}).then(function (data) {
    spinner.stop(true);
    const color_output = chalk.keyword(color);
    if (data.results[0].daily) {
        const result = data.results[0].daily;
        console.log(color_output(
            `${data.results[0].location.name}近三天的天气为：\n
            ${result[0].date}日： 白天：${result[0].text_day}  晚间：${result[0].text_night}  气温：${result[0].high} ~ ${result[0].low}  风向：${result[0].wind_direction}
            ${result[1].date}日： 白天：${result[1].text_day}  晚间：${result[1].text_night}  气温：${result[1].high} ~ ${result[1].low}  风向：${result[1].wind_direction}
            ${result[2].date}日： 白天：${result[2].text_day}  晚间：${result[2].text_night}  气温：${result[2].high} ~ ${result[2].low}  风向：${result[2].wind_direction}`
        ))
    } else {
        const result = data.results[0];
        console.log(color_output(
            `${result.location.name}现在的天气为：${result.now.text}，实时气温：${result.now.temperature}摄氏度。`
        ))
    }
}).catch(function (err) {
    console.log(err.error.status);
    spinner.stop(true);
}).done();