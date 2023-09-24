class Api::V1::RoomsController < Api::V1::SecureController
  include ResponseHelper

  # Skip CSRF protection for the create action
  skip_before_action :verify_authenticity_token, only: [:create, :join]
  before_action :authorize_request, only: [:create, :join]

  # GET /api/v1/rooms
  def index
    # Fetch all rooms with associated users
    rooms = Room.includes(:users).all

    render json: rooms.to_json(include: :users)
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
      return
    end

    @user = User.find_by(id: @current_user.id)

    unless @user
      json_response(nil, "User not found", :not_found)
      return
    end

    # Check if the user is already a member of the room
    if @room.users.include?(@user)
      json_response(nil, "User already joined room", :unprocessable_entity)
      return
    end

    @room.users << @user
    json_response(nil, "User successfully joined the room", :ok)
  end


  private

  def room_params
    params.require(:room).permit(:name)
  end
end
