require "sinatra"
require File.expand_path('../user', __FILE__)

class App < Sinatra::Base
  set :root, File.expand_path('..', __FILE__)
  set :sessions, true
  
  helpers do
    def h(string)
      ERB::Util.h(string)
    end
  end
  
  get '/signup' do
    erb :signup
  end
  
  post '/users/new' do
    user = User.create(params)
    session[:user_id] = user.id
    redirect '/welcome'
  end
  
  get '/welcome' do
    @user = User.find(session[:user_id])
    erb :welcome
  end
  
  get '/users/:username' do
    user = User.find_by_username(params[:username])
    JSON.dump('successful' => user.present?)
  end
end

