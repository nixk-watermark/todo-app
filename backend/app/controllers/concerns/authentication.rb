module Authentication

    extend ActiveSupport::Concern

    included do
        before_action :authenticate_request!
    end

    private

    def authenticate_request!
        header = request.headers["Authorization"]
        token = header&.split(" ")&.last

        if token.blank?
            render_unauthorized("Missing token") and return
        end

        begin
            decoded = JsonWebToken.decode(token)
            @current_user = User.find(decoded[:user_id])
        rescue JWT::DecodeError, Mongoid::Errors::DocumentNotFound => e
            render_unauthorized("Invalid token")
        end
    end

    def render_unauthorized(message = "Unauthorized")
        render json: { success: false, message: message }, status: :unauthorized
    end

    attr_reader :current_user
    
end