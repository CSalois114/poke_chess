class PieceSerializer < ActiveModel::Serializer
  attributes :id, :starting_coords, :coords, :home_team, :image, :is_king
  has_many :moves
end
