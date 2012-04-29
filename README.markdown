# JavaScript testing demo

This is an application I've built to go along with a talk I'm giving at [Future
of Web Design London 2012](http://futureofwebdesign.com/london-2012/), on the
topic of JavaScript testing. It's a tiny Sinatra app that serves a sign-up page
for users to register. The sign-up page uses JavaScript form validation, and
this app contains several ways to test the code.


## Setting up

Download the code, and get its dependencies installed. You'll need [Ruby](http://www.ruby-lang.org/),
[Node.js](http://nodejs.org) and [PhantomJS](http://phantomjs.org/) for various
parts of the demo.

    git clone git://github.com/jcoglan/fowd-js-testing.git
    cd fowd-js-testing
    gem install bundler
    bundle
    npm install jsclass


## Running the tests

To run the full-stack Selenium tests:

    bundle exec rspec -cf nested spec

To run the JavaScript tests in a browser:

    open spec/js/browser.html

To run the business logic tests using Node.js:

    node spec/js/console.js

To run all the tests with PhantomJS:

    phantomjs spec/js/phantom.js

