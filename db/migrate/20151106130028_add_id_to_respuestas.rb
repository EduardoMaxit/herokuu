class AddIdToRespuestas < ActiveRecord::Migration
  def change
  	add_column :respuesta, :usuario_id, :integer
  	add_column :respuesta, :comentario_id, :integer
  end
end
