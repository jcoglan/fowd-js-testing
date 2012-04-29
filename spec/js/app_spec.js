AppSpec = JS.Test.describe("App", function() { with(this) {
  describe("user interface", function() { with(this) {
    if (typeof window === "undefined") return
    
    fixture('\
      <form id="test-form" method="post" action="/users/new">\
        <p class="error"></p>\
        \
        <label for="username">Username</label>\
        <input type="text" name="username" id="username">">\
        \
        <label for="email">Email</label>\
        <input type="text" name="email" id="email">">\
        \
        <label for="password">Password</label>\
        <input type="password" name="password" id="password">\
        \
        <input type="submit" value="Sign up">\
      </form>')
    
    before(function() { with(this) {
      this.form = $("#test-form")
      App.setupListeners(form)
      stub(jQuery, "getJSON").yields([{successful: false}])
    }})
    
    it("displays an error when the user makes a mistake", function() { with(this) {
      form.find("#username").val("jcoglan")
      form.find("#email").val("not an email address")
      form.submit()
      
      assertEqual( "Please give us your email address", form.find(".error").html() )
    }})
    
    it("submits the form when the data is valid", function() { with(this) {
      expect(form[0], "submit") // expect form.submit()
      
      form.find("#username").val("jcoglan")
      form.find("#email").val("jcoglan@mailinator.com")
      form.find("#password").val("correct horse battery staple")
      form.submit()
    }})
    
    it("displays an error if the username is taken", function() { with(this) {
      stub(jQuery, "getJSON").given("/users/jcoglan").yields([{successful: true}])
      
      form.find("#username").val("jcoglan")
      form.find("#email").val("jcoglan@mailinator.com")
      form.find("#password").val("correct horse battery staple")
      form.submit()
      
      assertEqual( "Sorry, that name is taken", form.find(".error").html() )
    }})
  }})
  
  describe("validation rules", function() { with(this) {
    before(function() { with(this) {
      this.data = {
        username: "jcoglan",
        email:    "jcoglan@mailinator.com",
        password: "correct horse battery"
      }
      stub(jQuery, "getJSON").yields([{successful: false}])
    }})
    
    it("yields no errors for valid data", function() { with(this) {
      App.validate(data, function(errors) {
        assertEqual( [], errors )
      })
    }})
    
    it("yields an error if the username is blank", function() { with(this) {
      delete data.username
      App.validate(data, function(errors) {
        assertEqual( ["Please enter a username"], errors )
      })
    }})
    
    it("yields an error if there is an existing user", function() { with(this) {
      stub(jQuery, "getJSON").given("/users/jcoglan").yields([{successful: true}])
      App.validate(data, function(errors) {
        assertEqual( ["Sorry, that name is taken"], errors )
      })
    }})
    
    it("yields an error if the password is weak", function() { with(this) {
      stub("zxcvbn").returns({entropy: 5})
      App.validate(data, function(errors) {
        assertEqual( ["Your password is rather weak"], errors )
      })
    }})
    
    it("yields an error if the email is invalid", function() { with(this) {
      data.email = "herp derp"
      App.validate(data, function(errors) {
        assertEqual( ["Please give us your email address"], errors )
      })
    }})
  }})
}})

