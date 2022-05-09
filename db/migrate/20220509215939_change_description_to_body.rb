class ChangeDescriptionToBody < ActiveRecord::Migration[6.1]
  def change
    rename_column :deliverables, :description, :body
  end
end
