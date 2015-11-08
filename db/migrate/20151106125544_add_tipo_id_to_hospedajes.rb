class AddTipoIdToHospedajes < ActiveRecord::Migration
  def change
    add_column :hospedajes, :tipo_id, :integer
    add_column :hospedajes, :usuario_id, :integer
  end
end
