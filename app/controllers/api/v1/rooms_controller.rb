class Api::V1::RoomsController < Api::V1::SecureController
  include ResponseHelper

  # Skip CSRF protection for the create action
  skip_before_action :verify_authenticity_token, only: [:create, :join]
  before_action :authorize_request, only: [:create, :join]

  # GET /api/v1/rooms
  def index
    @rooms = Room.all

    json_response(@rooms, "Successfully retrieved #{@rooms.count} rooms", :ok)
  end

  # POST /api/v1/rooms
  # Create a new room with the given name
  def create
    @room = Room.new(room_params)

    if @room.save
      json_response(@room, 'Successfully create a new room', :created)
    else
      json_response(nil, "Failed cause of #{@room.errors.full_messages.first}", :unprocessable_entity, @room.errors.full_messages)
    end
  end

  # POST /api/v1/rooms/:id/join
  def join
    @room = Room.find(params[:id])

    unless @room
      json_response(nil, "Room not found", :not_found)
    end

    if @room.users.include?(@current_user)
      json_response(nil, "User already joined", :unprocessable_entity)
      return
    end

    @room.users << @current_user

    json_response(nil, "User successfully joined the room", :ok)
  end


  private

  def room_params
    params.require(:room).permit(:name)
  end
end
