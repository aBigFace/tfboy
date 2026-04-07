exports.validateChinaPhone = function(t) {
  return !t || !!/^1[3-9]\d{9}$/.test(t)
}, exports.validateEmail = function(t) {
  return !t || !!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(t)
}, exports.validatePhone = function(t) {
  return !t || !!(/^((\+?00[- ]?86[- ]?)|(\+?86[- ]?))?1[2|3|4|5|6|7|8|9]\d{9}$/.test(t) || /^((\+?00[- ]?86[- ]?)|(\+?86[- ]?))?(010|02\d|0[3-9]\d{2,3})[- ]?\d{7,8}([-]\d{1,8})?$/.test(t) || /^((400?\d)|(800?\d))-?(\d{3,4})-?(\d{1,4})([-]\d{1,8})?$/.test(t))
};