class AgregarASolicitudsAceptada < ActiveRecord::Migration
  def change
  	add_column :solicituds, :aceptada, :boolean, :default => false
  end
end
