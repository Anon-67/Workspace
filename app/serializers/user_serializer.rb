class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :is_admin
end
