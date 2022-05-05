class MessagesController < ApplicationController

    def show
        conversation = Conversation.find(params[:id])
        handshake = conversation.handshakes.where(user_id: session[:user_id])
        messages = conversation.messages
        render json: messages
    end


end
