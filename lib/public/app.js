App = {
  setupListeners: function(form) {
    form.on('submit', function(e) {
      e.preventDefault();
      
      var form   = this,
          params = $(form).serializeArray(),
          data   = {},
          n      = params.length;
      
      while (n--) data[params[n].name] = params[n].value;
      
      App.validate(data, function(errors) {
        if (errors.length === 0) return form.submit();
        else $(form).find('.error').html(errors[0]);
      });
    });
  },
  
  validate: function(data, callback) {
    var errors = [];
    
    if (!data.username)
      errors.push('Please enter a username');
    
    if (!/^.+@.+/.test(data.email))
      errors.push('Please give us your email address');
    
    var strength = zxcvbn(data.password);
    if (strength.entropy < 10)
      errors.push('Your password is rather weak');
    
    if (!data.username) return callback(errors);
    
    $.getJSON('/users/' + data.username, function(response) {
      if (response.successful)
        errors.push('Sorry, that name is taken');
      
      callback(errors);
    });
  }
};

