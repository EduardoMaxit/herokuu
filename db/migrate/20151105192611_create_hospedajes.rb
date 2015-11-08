class CreateHospedajes < ActiveRecord::Migration
  def change
    create_table :hospedajes do |t|
      t.string :titulo
      t.string :encabezado
      t.string :descripcion
      t.string :provincia
      t.string :ciudad
      t.string :capacidad
      t.boolean :ocupado
      t.date :fechainic
      t.date :fechafin

      t.timestamps
    end
  end
end
