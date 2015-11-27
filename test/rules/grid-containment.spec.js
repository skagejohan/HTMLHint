var expect = require('expect.js');
var HTMLHint = require('../../index').HTMLHint;

var ruleId = 'grid-containment';
var ruleOptions = {};

ruleOptions[ruleId] = true;

describe('Rules: ' + ruleId, function() {
  // Only columns can be immediate children of rows
  it('A row class tag with only column children should not result in an error', function() {
    var code = '<div class="row"><div class="col-md-10></div><div class="col-md-2></div></div>';
    var messages = HTMLHint.verify(code, ruleOptions);
    expect(message.length.to.be(0));  
  });
});
