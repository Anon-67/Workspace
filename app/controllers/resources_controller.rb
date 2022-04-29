class ResourcesController < ApplicationController

    def index
        render json: Resource.all
    end

    def create
        resource = Resource.create(body: params[:resource], user_id: session[:user_id])
        render json: resource, status: :ok
    end
end
