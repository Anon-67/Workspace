class MessageSerializer < ActiveModel::Serializer
  attributes :body, :created_at
  belongs_to :conversation
  belongs_to :user
end
