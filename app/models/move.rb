class Move < ApplicationRecord
  has_many :dependents, class_name: :Move, dependent: :destroy, foreign_key: :dependent_on_move_id
  belongs_to :dependent_on_move, class_name: :Move, optional: true
  belongs_to :piece_type
end
