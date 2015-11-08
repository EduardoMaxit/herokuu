class AddIdToComentarios < ActiveRecord::Migration
  def change
  	add_column :comentarios, :hospedaje_id, :integer
  	add_column :comentarios, :usuario_id, :integer
  end
end
