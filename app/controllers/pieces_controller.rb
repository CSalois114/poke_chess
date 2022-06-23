class PiecesController < ApplicationController
  def index
    render json: Piece.all, status: :ok
  end

  def show 
    render json: Piece.find(params[:id])
  end

  def create
    render json: Piece.create(piece_params)
  end

  def update
    piece = Piece.find(params[:id])
    piece.update(piece_params)
    render json: piece, status: :ok
  end

  def destroy
    Piece.destroy(params[:id])
    head :ok
  end

  private 

  def piece_params
    params.permit(:coords, :starting_coords, :home_team, :image, :is_king, :piece_type_id)
  end
end
