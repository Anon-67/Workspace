class User < ApplicationRecord
    has_secure_password
    has_many :project_users
    has_many :projects, through: :project_users



end
