class ResourcesController < ApplicationController

    def index
        render json: Resource.all
    end

    def create
        resource = Resource.create(body: params[:resource], user_id: 1)
        render json: resource, status: :ok
    end
end
