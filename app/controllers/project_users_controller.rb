class ProjectUsersController < ApplicationController

    def create
        ProjectUser.create(project_id: params[:project], user_id: params[:user])
    end

    def personal
        byebug
        ProjectUser.create(project_id: params[:project], user_id: session[:user_id])
    end
end
