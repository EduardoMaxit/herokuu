class AddPuntajePromedioToHospedajes < ActiveRecord::Migration
  def change
    add_column :hospedajes, :puntajePromedio, :integer
  end
end
