class CreatePuntajes < ActiveRecord::Migration
  def change
    create_table :puntajes do |t|
      t.integer :puntos
      t.string :comentario

      t.timestamps
    end
  end
end
