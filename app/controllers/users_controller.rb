class UsersController < ApplicationController

    def show
        render json: User.find(session[:user_id])
    end

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id]  = user.id
            render json: user, status: :created
        else
            render json: { error: "fuck off" }, status: 422
        end
    end

    def index
        render json: User.all
    end

    private

    def user_params
        params.permit(:username, :password, :password_confirm)
    end

end
