class GameSerializer < ActiveModel::Serializer
  attributes :id, :name, :editing_mode
  has_many :pieces
  has_many :piece_types
end
