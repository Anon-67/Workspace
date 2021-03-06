class Project < ApplicationRecord
    has_many :deliverables
    has_many :project_users
    has_many :users, through: :project_users
    has_many :notes
end
