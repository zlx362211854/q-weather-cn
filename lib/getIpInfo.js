var request = require('request-promise');
var getIpInfo = function(ip, cb) {
  var url = "http://ip.taobao.com/service/getIpInfo.php?ip=" + ip;
  return request({
    url
  })
};

module.exports = getIpInfo;