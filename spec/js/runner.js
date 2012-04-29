JS.Packages(function() { with(this) {
  var ROOT = JS.ENV.ROOT || '.'
  
  file('http://code.jquery.com/jquery-1.7.2.min.js')
    .provides('jQuery')
  
  autoload(/^(.*)Spec$/, {from: ROOT + '/spec/js', require: '$1'})
  autoload(/^(.*)$/, {from: ROOT + '/lib/public'})
  
  pkg('App').requires('jQuery', 'zxcvbn')
}})

JS.require('JS.Test', function() {
  JS.Test.Unit.TestCase.extend({
    fixture: function(html) {
      var div = $('#fixture')
      this.before(function() { div.html(html) })
      this.after(function()  { div.empty()    })
    }
  })
  
  JS.require('AppSpec', JS.Test.method('autorun'))
})

