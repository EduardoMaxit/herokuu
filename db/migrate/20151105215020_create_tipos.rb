class CreateTipos < ActiveRecord::Migration
  def change
    create_table :tipos do |t|
      t.string :nombre
      t.boolean :bajalogica, default: "false"

      t.timestamps
    end
  end
end
