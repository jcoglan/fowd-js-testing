class App
  class Schema < ActiveRecord::Migration
    
    def self.up
      create_table :users do |t|
        t.string :username
        t.string :email
        t.string :password
      end
    end
    
  end
end

