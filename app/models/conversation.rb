class Conversation < ApplicationRecord
    has_many :handshakes, dependent: :destroy
    has_many :users, through: :handshakes
    has_many :messages, dependent: :destroy
    validates_uniqueness_of :name
end
