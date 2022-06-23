class PieceTypesController < ApplicationController
  def show
    render json: PieceType.find(params[:id]), status: :ok
  end

  def create
    render json: PieceType.create(piece_type_params), status: :created
  end

  private 

  def piece_type_params 
    params.permit(:game_id, :name, :front_img, :back_img)
  end
end
