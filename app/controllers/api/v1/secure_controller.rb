class Api::V1::SecureController < ApplicationController
  include ResponseHelper
  before_action :authorize_request

  private

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
