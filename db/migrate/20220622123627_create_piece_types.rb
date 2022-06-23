class CreatePieceTypes < ActiveRecord::Migration[7.0]
  def change
    create_table :piece_types do |t|
      t.references :game, null: false, foreign_key: true
      t.string :name
      t.string :front_img
      t.string :back_img

      t.timestamps
    end
  end
end
