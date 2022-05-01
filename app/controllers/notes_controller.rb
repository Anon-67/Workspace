class NotesController < ApplicationController

    def create
        note = Note.create(user_id: session[:user_id], project_id: params[:project], body: params[:body])
        render json: note, status: :ok
    end
end
