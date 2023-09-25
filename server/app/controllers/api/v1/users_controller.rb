class Api::V1::UsersController < ApplicationController
  include ResponseHelper

  # Skip CSRF protection for the create action
  skip_before_action :verify_authenticity_token, only: [:create, :login, :token]
  before_action :authorize_request, only: [:token]

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

  # POST /api/v1/users/login
  # Create a token for login user
  def login
    user = User.find_by(username: params[:username])

    if user && user.authenticate(params[:password])
      # Generate a JWT token
      token = JwtService.encode(user_id: user.id)

      json_response({ token: token, user: user }, "Successfully login", :ok)
    else
      json_response(nil, "Invalid username and password", :unauthorized)
    end
  end

  def token
    token = JwtService.encode(user_id: @current_user['id'])

    json_response({token: token, user: @current_user}, "Successfully authorization", :ok)
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :password_confirmation)
  end

  def login_params
    params.require(:user).permit(:username, :password)
  end

  def authorize_request
    header = request.headers['Authorization']
    token = header&.split(' ')&.last

    begin
      # Verify and decode the token
      decoded_token = JwtService.decode(token)

      # Fetch the user or relevant data from the token
      @current_user = User.find(decoded_token['user_id'])
    rescue JWT::DecodeError
      json_response(nil, "Unauthorized", :unauthorized)
    rescue ActiveRecord::RecordNotFound
      json_response(nil, "User not found", :not_found)
    end
  end
end
