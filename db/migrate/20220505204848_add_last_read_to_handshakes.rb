class AddLastReadToHandshakes < ActiveRecord::Migration[6.1]
  def change
    add_column :handshakes, :last_read, :datetime
  end
end
