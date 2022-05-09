class ProjectUsersController < ApplicationController

    def create
        ProjectUser.create(project_id: params[:project], user_id: params[:user])
    end

    def personal
        ProjectUser.create(project_id: params[:project], user_id: session[:user_id])
    end

    def userlist
        users = Project.find(params[:id]).users.all
        render json: users
    end
end
