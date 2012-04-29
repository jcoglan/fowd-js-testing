require 'rubygems'
require 'bundler/setup'

require 'active_record'
require File.expand_path('../../lib/app', __FILE__)

dbfile = File.expand_path('../test.sqlite3', __FILE__)
File.delete(dbfile) if File.file?(dbfile)

ActiveRecord::Base.establish_connection(
  :adapter  => 'sqlite3',
  :database => dbfile
)

require File.expand_path('../../lib/schema', __FILE__)
App::Schema.up

require 'capybara/dsl'
Capybara.default_driver = :selenium
Capybara.run_server = true
Capybara.app = App

