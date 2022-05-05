class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :is_admin
  has_many :handshakes
  has_many :conversations, through: :handshakes
end
