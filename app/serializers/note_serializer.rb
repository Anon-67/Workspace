class NoteSerializer < ActiveModel::Serializer
  attributes :id, :body, :updated_at
  has_one :user
  has_one :project
end
