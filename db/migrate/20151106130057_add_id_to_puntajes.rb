class AddIdToPuntajes < ActiveRecord::Migration
  def change
  	add_column :puntajes, :hospedaje_id, :integer
  	add_column :puntajes, :usuario_id, :integer
  end
end
