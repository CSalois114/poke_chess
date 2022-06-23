class PieceType < ApplicationRecord
  belongs_to :game
  has_many :moves, dependent: :destroy
  has_many :pieces, dependent: :destroy
end
