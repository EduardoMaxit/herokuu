class AgregarAHospedajeDefault < ActiveRecord::Migration
  def change
  	change_column :hospedajes, :ocupado, :boolean, :default => false
  end
end
