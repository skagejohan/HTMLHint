var expect = require('expect.js');
var HTMLHint = require('../../index').HTMLHint;

var ruleId = 'grid-containment';
var ruleOptions = {};

ruleOptions[ruleId] = true;

describe('Rules: ' + ruleId, function() {
  // Only columns can be immediate children of rows

  it('A row class tag with a non column div child should result in an error', function() {
    var code = '<div class="row"><div class="col-md-10"></div><div></div></div>';
    var messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(1);
  });

  it('A nested row class tag with a non column div child should result in an error', function() {
    var code = '<body><div class="row"><div class="col-md-10"></div><div></div></div></body>';
    var messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(1);
  });

  it('A nested row class tag with a non column div child and multiple columns should result in an error', function() {
    var code = '<body><div class="row"><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div class="col-md-1"></div><div></div></div></body>';
    var messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(1);
  });

  it('A nested row in column tag with non column children should result in an error', function() {
    var code = '<div class="row"><div class="col-md-10"><div class="row"><div></div><div class="col-md-10"></div></div></div><div class="col-md-10"></div></div>';
    var messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(1);
  });

  // Positives
  it('A nested row in column tag with only column children should not result in an error', function() {
    var code = '<div class="row"><div class="col-md-10"><div class="row"><div class="col-md-10"></div><div class="col-md-10"></div></div></div><div class="col-md-10"></div></div>';
    var messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });

  it('A row class tag with only column children should not result in an error', function() {
    var code = '<div class="row"><div class="col-md-10></div><div class="col-md-2></div></div>';
    var messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });

  it('A row class tag with an unclosed column div child should not result in an error', function() {
    var code = '<div class="row"><div class="col-md-10"></div><div class="col-md-2"></div>';
    var messages = HTMLHint.verify(code, ruleOptions);
    expect(messages.length).to.be(0);
  });
});
