class MessageSerializer < ActiveModel::Serializer
  attributes :body, :created_at, :user_id, :user
  belongs_to :conversation
  belongs_to :user
end
