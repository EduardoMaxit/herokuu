class CreateRespuesta < ActiveRecord::Migration
  def change
    create_table :respuesta do |t|
      t.string :texto

      t.timestamps
    end
  end
end
