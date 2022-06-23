class MoveSerializer < ActiveModel::Serializer
  attributes :id, :can_kill, :must_kill, :offset, :dependent_on

  def dependent_on
    object.dependent_on_move&.offset
  end
end
