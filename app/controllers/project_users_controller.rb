class ProjectUsersController < ApplicationController

    def create
        ProjectUser.create(project_id: params[:project], user_id: params[:user])
    end
end
