require "spec_helper"

describe App do
  include Capybara::DSL
  
  after do
    User.delete_all
  end
  
  it "allows sign-up with valid parameters" do
    visit "/signup"
    fill_in "Username", :with => "jcoglan"
    fill_in "Email", :with => "jcoglan@mailinator.com"
    fill_in "Password", :with => "correct horse battery staple"
    click_button "Sign up"
    page.should have_content("Welcome, jcoglan!")
  end
  
  it "does not allow sign-up without a username" do
    visit "/signup"
    fill_in "Email", :with => "jcoglan@mailinator.com"
    fill_in "Password", :with => "correct horse battery staple"
    click_button "Sign up"
    page.should_not have_content("Welcome, jcoglan!")
    page.should have_content("Please enter a username")
  end
  
  describe "with an existing user" do
    before { User.create(:username => "jcoglan") }
    
    it "does not allow sign-up with a registered username" do
      visit "/signup"
      fill_in "Username", :with => "jcoglan"
      fill_in "Email", :with => "jcoglan@mailinator.com"
      fill_in "Password", :with => "correct horse battery staple"
      click_button "Sign up"
      page.should_not have_content("Welcome, jcoglan!")
      page.should have_content("Sorry, that name is taken")
    end
  end
  
  it "does not allow sign-up with a weak password" do
    visit "/signup"
    fill_in "Username", :with => "jcoglan"
    fill_in "Email", :with => "jcoglan@mailinator.com"
    fill_in "Password", :with => "hello"
    click_button "Sign up"
    page.should_not have_content("Welcome, jcoglan!")
    page.should have_content("Your password is rather weak")
  end
  
  it "does not allow sign-up with a bad email address" do
    visit "/signup"
    fill_in "Username", :with => "jcoglan"
    fill_in "Email", :with => "herp derp"
    fill_in "Password", :with => "correct horse battery staple"
    click_button "Sign up"
    page.should_not have_content("Welcome, jcoglan!")
    page.should have_content("Please give us your email address")
  end
end

