class HandshakeSerializer < ActiveModel::Serializer
  attributes :id, :last_read
  belongs_to :user
  belongs_to :conversation
end
