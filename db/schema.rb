# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_06_23_223110) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.string "name"
    t.boolean "editing_mode"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "moves", force: :cascade do |t|
    t.boolean "must_kill"
    t.boolean "can_kill"
    t.bigint "dependent_on_move_id"
    t.string "offset"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "piece_type_id", null: false
    t.index ["dependent_on_move_id"], name: "index_moves_on_dependent_on_move_id"
    t.index ["piece_type_id"], name: "index_moves_on_piece_type_id"
  end

  create_table "piece_types", force: :cascade do |t|
    t.bigint "game_id", null: false
    t.string "name"
    t.string "front_img"
    t.string "back_img"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_piece_types_on_game_id"
  end

  create_table "pieces", force: :cascade do |t|
    t.string "starting_coords"
    t.string "coords"
    t.boolean "home_team"
    t.string "image"
    t.boolean "is_king"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "piece_type_id", null: false
    t.index ["piece_type_id"], name: "index_pieces_on_piece_type_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "moves", "moves", column: "dependent_on_move_id"
  add_foreign_key "moves", "piece_types"
  add_foreign_key "piece_types", "games"
  add_foreign_key "pieces", "piece_types"
end
