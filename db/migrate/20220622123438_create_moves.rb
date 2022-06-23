class CreateMoves < ActiveRecord::Migration[7.0]
  def change
    create_table :moves do |t|
      t.boolean :must_kill
      t.boolean :can_kill
      t.references :dependent_on_move, foreign_key: { to_table: :moves }
      t.string :offset

      t.timestamps
    end
  end
end
