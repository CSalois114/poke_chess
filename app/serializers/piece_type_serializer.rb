class PieceTypeSerializer < ActiveModel::Serializer
  attributes :id, :name, :front_img, :back_img, :game_id
  has_many :moves
end
