class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stop_all_streams
    @conversation = Conversation.find(params[:id])
    stream_for @conversation
  end

  def receive(data)
    user = User.find(data["user"]["id"])
    @reciever = @conversation.users.where.not(id: user.id).first
    message = @conversation.messages.create(body: data["body"], user: user, read: false)
    MessagesChannel.broadcast_to(@conversation, message: message, user: {username: user.username})
    UserChannel.broadcast_to(@reciever, message)
  end

  def unsubscribed
    stop_all_streams
  end
end