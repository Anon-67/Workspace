class ProjectSerializer < ActiveModel::Serializer
  attributes :id, :project_name, :is_personal
  has_many :deliverables
  has_many :users
end
