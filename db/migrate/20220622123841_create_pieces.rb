class CreatePieces < ActiveRecord::Migration[7.0]
  def change
    create_table :pieces do |t|
      t.string :starting_coords
      t.string :coords
      t.boolean :home_team
      t.string :image
      t.boolean :is_king

      t.timestamps
    end
  end
end
