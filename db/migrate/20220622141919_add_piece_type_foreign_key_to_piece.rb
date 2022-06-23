class AddPieceTypeForeignKeyToPiece < ActiveRecord::Migration[7.0]
  def change
    add_reference :pieces, :piece_type, null: false, foreign_key: true
  end
end
