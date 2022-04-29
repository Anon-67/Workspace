class ProjectsController < ApplicationController

    def index 
        render json: User.find(session[:user_id]).projects
    end

    def show
        project = Project.find(params[:id])
        render json: project, include: [:deliverables, :users]
    end

    def admin
        render json: Project.all.where(is_personal: false)
    end

    def create
        project = Project.create!(project_name: params[:project], is_personal: params[:personal])
    end
        

        
end
