class HandshakesController < ApplicationController
    def index
        user = User.find(session[:user_id])
        handshakes = user.handshakes
        render json: handshakes
      end
    
      def show
        membership = Handshake.find(params[:id])
      end

      def update_read
        conversation = Conversation.find(params[:id])
        handshake = conversation.handshakes.where(user_id: session[:user_id]).first
        handshake.update(last_read: Date.new)
      end
end
