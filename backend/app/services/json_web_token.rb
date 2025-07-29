class JsonWebToken
    SECRET_KEY = "nixksharma7860" # for dev purpose only (use secrets for this - todo)

    def self.encode(payload, exp = 24.hours.from_now)
        payload[:exp] = exp.to_i
        JWT.encode(payload, SECRET_KEY)
    end

    def self.decode(token)
        decoded = JWT.decode(token, SECRET_KEY)[0]
        HashWithIndifferentAccess.new(decoded)
    rescue JWT::ExpiredSignature
        raise JWT::ExpiredSignature, "Token has expired" # for dev purpose only (use custom error for this - todo)
    rescue JWT::DecodeError
        raise JWT::DecodeError, "Invalid token" # for dev purpose only (use custom error for this - todo)
    end
end