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
        handshake.update(last_read: params[:last_read])
      end

      def unreads
        unreads = []
        User.find(session[:user_id]).handshakes.each do |h|
          if (h.conversation.messages.empty? || h.conversation.messages.last.created_at < h.last_read)
            nil
          else
            unreads.push(h.conversation.id)
          end
        end

        render json: unreads
      end
end
