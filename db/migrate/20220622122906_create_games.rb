class CreateGames < ActiveRecord::Migration[7.0]
  def change
    create_table :games do |t|
      t.string :name
      t.boolean :editing_mode

      t.timestamps
    end
  end
end
