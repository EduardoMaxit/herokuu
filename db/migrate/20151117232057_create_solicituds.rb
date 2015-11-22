class CreateSolicituds < ActiveRecord::Migration
  def change
    create_table :solicituds do |t|
      t.integer :usuario_id
      t.integer :hospedaje_id    
      t.timestamps
    end
  end
end
