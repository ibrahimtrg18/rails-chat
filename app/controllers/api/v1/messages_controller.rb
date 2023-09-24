class Api::V1::MessagesController < Api::V1::SecureController

  skip_before_action :verify_authenticity_token, only: [:create]
  before_action :authorize_request, only: [:create]

  # def create
  #   message = Message.create!(message_params)
  #   ActionCable.server.broadcast "chat_#{message.room_id}", message: message.content, username: message.user.username
  # end

  def create
    @room = Room.find_by(id: params[:room_id])

    if @room.nil?
      json_response(nil, "Room not found", :not_found)
      return
    end

    @message = @room.messages.build(message_params)
    @message.user = @current_user

    if @message.save
      ChatChannel.broadcast_to(@room, message: @message.content, username: @message.user.username)
      json_response(@message, "Successfully create message to room #{@room.id}", :created)
    else
      json_response(nil, "Failed cause of #{@message.errors.full_messages.first}", :unprocessable_entity, @message.errors.full_messages)
    end
  end

  private

  def message_params
    params.require(:message).permit(:content)
  end
end
