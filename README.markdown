# JavaScript testing demo

This is an application I've built to go along with a talk I'm giving at [Future
of Web Design London 2012](http://futureofwebdesign.com/london-2012/), on the
topic of JavaScript testing. It's a tiny Sinatra app that serves a sign-up page
for users to register. The sign-up page uses JavaScript form validation, and
this app contains several ways to test the code.

You might also find my series on [refactoring towards testable
JavaScript](http://blog.jcoglan.com/2011/07/14/refactoring-towards-testable-javascript-part-1/)
useful, and it covers how to use the tools mentioned in my talk in more depth.


## Setting up

Download the code, and get its dependencies installed. You'll need [Ruby](http://www.ruby-lang.org/),
[Node.js](http://nodejs.org) and [PhantomJS](http://phantomjs.org/) for various
parts of the demo.

If all you want to do is run the JavaScript unit tests, you don't need to
install anything - just clone the repo and run `open spec/js/browser.html`.

    git clone git://github.com/jcoglan/fowd-js-testing.git
    cd fowd-js-testing
    gem install bundler
    bundle


## Browsing the code

Here's where to find various parts of the application. It's very small, so
there's not a lot of files to wade through.

* `lib/` - Ruby files for the server-side portion of the app
* `lib/views/` - page templates that the server renders
* `lib/public/` - JavaScript code used on the client side
* `spec/` - Ruby files used to run full-stack tests
* `spec/js/` - HTML and JavaScript for running JS unit tests


## Running the tests

If you've installed the Ruby dependencies, you can run the full-stack Selenium
tests:

    bundle exec rspec -cf nested spec

To run the JavaScript tests in a browser:

    open spec/js/browser.html

To run the business logic tests using Node.js:

    node spec/js/console.js

To run all the tests with PhantomJS:

    phantomjs spec/js/phantom.js

