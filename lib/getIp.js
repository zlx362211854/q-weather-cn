var request = require("request-promise");
var url = "http://ip.taobao.com/service/getIpInfo.php?ip=myip";
var getIP = function() {
  return request({
    url
  });
};
module.exports = getIP;
