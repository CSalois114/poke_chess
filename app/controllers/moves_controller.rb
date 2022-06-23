class MovesController < ApplicationController
  def index 
    render json: PieceType.find(params[:piece_types_id]).moves, status: :ok
  end

  def create
    render json: Move.create(move_params), status: :ok
  end

  private 

  def move_params
    params.permit(:must_kill, :can_kill, :dependent_on_move_id, :offset, :piece_type_id)
  end
end
