class AddIdToFotos < ActiveRecord::Migration
  def change
  	add_column :fotos, :hospedaje_id, :integer
  end
end
