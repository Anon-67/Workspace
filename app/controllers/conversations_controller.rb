class ConversationsController < ApplicationController

    def index
      conversations = User.find(session[:user_id]).conversations
      
      render json: conversations
    end
  
    def show
      conversation = Conversation.find(params[:id])
      render json: conversation.name
    end
  
    def create
      user1 = User.find(session[:user_id])
      user2 = User.find(params[:user_id])
      conversation = Conversation.create(name: conversation_name([user1, user2]))
      Handshake.create(user_id: user1.id, conversation_id: conversation.id)
      Handshake.create(user_id: user2.id, conversation_id: conversation.id)
      if conversation.save
        render json: conversation
      else
        render json: { error: 'could not be created' }
      end
    end
  
    def update
        conversation = Conversation.find(params[:id])
        conversation.messages.update_all(read: true)
    end
  
    private
  
  
    def conversation_name(users)
      users.sort.pluck(:username).join      
    end
end
