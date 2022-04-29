class DeliverablesController < ApplicationController

    def create
        Deliverable.create(description: params[:description], project_id: params[:project], is_completed: false)
    end

    def update
        deliverable = Deliverable.find(params[:id])
        deliverable.update(is_completed: params[:is_completed])
    end
end
