class AgregarSexoAUsuario < ActiveRecord::Migration
  def change
  	add_column :usuarios, :sexo, :boolean
  end
end
