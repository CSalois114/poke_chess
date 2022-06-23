class GamesController < ApplicationController
  def index
    render json: Game.all.order(updated_at: :desc), status: :ok
  end

  def show 
    render json: Game.find(params[:id]), 
    include: ['pieces', 'pieces.moves', 'piece_types', 'piece_types.moves'], 
    status: :ok
  end
  
  def create 
    render json: Game.create(name: "Unnamed", editing_mode: true), status: :created
  end

  def update
    render json: Game.find(params[:id]).update(game_params), status: :ok
  end
  
  private 

  def game_params
    params.permit(:editing_mode, :name)
  end
end
