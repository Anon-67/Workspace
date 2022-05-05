class ConversationSerializer < ActiveModel::Serializer
  attributes :name, :id
  has_many :handshakes
  has_many :users, through: :handshakes
  has_many :messages
end
