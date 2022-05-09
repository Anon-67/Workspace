class DeliverableSerializer < ActiveModel::Serializer
  attributes :id, :body, :is_completed, :updated_at
end
