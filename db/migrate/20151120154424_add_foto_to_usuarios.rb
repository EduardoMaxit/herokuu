class AddFotoToUsuarios < ActiveRecord::Migration
  def change
    add_column :usuarios, :foto, :string
  end
end
