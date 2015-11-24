class AgregarEliminarASolicituds < ActiveRecord::Migration
  def change
  	add_column :solicituds, :eliminar, :boolean, :default => false
  end
end
