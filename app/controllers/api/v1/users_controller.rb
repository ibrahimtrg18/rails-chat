class Api::V1::UsersController < ApplicationController
  include ResponseHelper

  # Skip CSRF protection for the create action
  skip_before_action :verify_authenticity_token, only: [:create]

  # GET /api/v1/users
  def index
    @users = User.all
    json_response(@users, "Successfully retrieved #{@users.count} rooms")
  end

  # POST /api/v1/users
   # Create a new user
  def create
    # Create instance user from params
    @user = User.new(user_params)

    # Create user in the database
    if @user.save
      response_data = @user.as_json(except: [:password, :password_digest])
      json_response(response_data, 'Succesfully create a new user', nil, :created)
    else
      json_response(nil, "Failed cause of #{@user.errors.full_messages.first}", :unprocessable_entity, @user.errors.full_messages)
    end
  end

  def show

  end


  private

  def user_params
    params.require(:user).permit(:email, :username, :password)
  end
end
