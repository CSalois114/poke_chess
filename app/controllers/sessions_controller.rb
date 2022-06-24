class SessionsController < ApplicationController
  skip_before_action :authorize, only: :create 

  

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])

      session[:user_id] = user.id
      cookies[:test] = "test"
      # byebug
      render json: user, status: :created
    else
      render json: { error: "Invalid username or password" }, status: :unauthorized
    end
  end

  def destroy
    reset_session
  end
end
