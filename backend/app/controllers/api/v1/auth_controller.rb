class Api::V1::AuthController < ApplicationController

    def signup
        user = User.new(user_params)
        
        if user.save
            token = JsonWebToken.encode(user_id: user._id.to_s)
            render json: { success: true, data: { user: user, token: token } }, status: :created
        else
            render json: { success: false, message: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def login
        user = User.find_by(username: params.dig(:user, :username))
        if user&.authenticate(params.dig(:user, :password))
            token = JsonWebToken.encode(user_id: user._id.to_s)
            render json: { success: true, data: { user: {id: user._id, username: user.username, created_at: user.created_at, updated_at: user.updated_at}, token: token } }, status: :ok
        else
            render json: { success: false, message: "Invalid username or password" }, status: :unauthorized
        end
    end

    private

    def user_params
        params.expect(user: [:username, :password])
    end
end