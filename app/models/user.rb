class User < ApplicationRecord
    has_secure_password
    has_many :project_users
    has_many :projects, through: :project_users
    has_many :handshakes, dependent: :destroy
    has_many :conversations, through: :handshakes
    has_many :messages
    

    validates :username, uniqueness: true

    



end
