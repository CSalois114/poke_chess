class MovesController < ApplicationController
  def index 
    render json: PieceType.find(params[:piece_types_id]).moves, status: :ok
  end

  def create
    render json: Move.create(move_params), status: :ok
  end

  def update
    render json: Move.find(params[:id]).update(move_params), status: :ok
  end

  def destroy
    Move.destroy(params[:id])
    head :ok
  end

  private 

  def move_params
    params.permit(:must_kill, :can_kill, :dependent_on_move_id, :offset, :piece_type_id)
  end
end
