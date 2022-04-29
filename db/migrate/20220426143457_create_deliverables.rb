class CreateDeliverables < ActiveRecord::Migration[6.1]
  def change
    create_table :deliverables do |t|
      t.string :description
      t.boolean :is_completed

      t.timestamps
    end
  end
end
