class UserChannel < ApplicationCable::Channel
  def subscribed
    @user = User.find(params[:id])
    stream_for @user
  end

  def unsubscribed
    stop_all_streams
  end
end
