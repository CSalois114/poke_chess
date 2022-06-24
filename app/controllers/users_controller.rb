class UsersController < ApplicationController
  # wrap_parameters format: []
  skip_before_action :authorize, only: [:create, :show]

  def show 
    puts "#####################"
    puts session
    current_user = User.find(session[:user_id])
    render json: current_user, status: :ok
  end

  def create
    user = User.create(user_params)
    render json: user, status: :created
  end

  private

  def user_params
    params.permit(:username, :password)
  end
end