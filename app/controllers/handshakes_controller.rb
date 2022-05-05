class HandshakesController < ApplicationController
    def index
        user = User.find(session[:user_id])
        handshakes = user.handshakes
        render json: handshakes
      end
    
      def show
        membership = Handshake.find(params[:id])
      end
end
