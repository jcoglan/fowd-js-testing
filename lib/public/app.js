App = {
  setupListeners: function(form) {
    form.on('submit', function(e) {
      e.preventDefault();
      var form = this;
      
      if (!$('#username').val())
        return $('.error').html('Please enter a username');
      
      if (!/^.+@.+/.test($('#email').val()))
        return $('.error').html('Please give us your email address');
      
      var strength = zxcvbn($('#password').val());
      if (strength.entropy < 10)
        return $('.error').html('Your password is rather weak');
      
      var username = $('#username').val();
      $.getJSON('/users/' + username, function(response) {
        if (response.successful)
          $('.error').html('Sorry, that name is taken');
        else
          form.submit();
      });
    });
  }
};

