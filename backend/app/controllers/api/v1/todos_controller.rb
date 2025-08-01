class Api::V1::TodosController < ApplicationController
    include Authentication
    before_action :set_todo, only: [:show, :update, :destroy]
    
    def index
        todos = current_user.todos.desc(:updated_at)

        render json: { success: true, data: todos }, status: :ok
    end


    def show
        render json: { success: true, data: @todo }, status: :ok
    end

    def create
        todo = current_user.todos.new(todo_params)

        if todo.save
            render json: { success: true, data: todo }, status: :created
        else
            render json: { success: false, message: todo.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update
        puts "in update"
        puts todo_params
        if @todo.update(todo_params)
            render json: { success: true, data: @todo }, status: :ok
        else
            render json: { success: false, message: @todo.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        if @todo.destroy
            render json: { success: true, message: "Todo deleted successfully" }, status: :ok
        else
            render json: { success: false, message: "Failed to delete todo" }, status: :unprocessable_entity
        end
    end
    
    private

    def todo_params
        params.expect(todo: [:title, :description, :status, :priority, :deadline])
    end

    def set_todo
        @todo = current_user.todos.find(params[:id])
    rescue Mongoid::Errors::DocumentNotFound 
        render json: { success: false, error: "Todo not found" }, status: :not_found
    end
end
