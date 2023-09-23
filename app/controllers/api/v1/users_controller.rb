class Api::V1::UsersController < ApplicationController
  include ResponseHelper

  # Skip CSRF protection for the create action
  skip_before_action :verify_authenticity_token, only: [:create]

  def index
    @users = User.all
    json_response(@users, 'Users retrieved successfully')
  end

   # Create a new user
  def create
    # Create instance user from params
    @user = User.new(user_params)

    # Create user in the database
    if @user.save
      response_data = @user.as_json(except: [:password, :password_digest])
      json_response(response_data, 'Succesfully create a new user', :created)
    else
      json_response(nil, user_params, @user.errors.full_messages, :unprocessable_entity)
    end
  end

  def show

  end


  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
