class AgregarFechaSolicitudes < ActiveRecord::Migration
  def change
  	add_column :solicituds, :fechainic, :date
  	add_column :solicituds, :fechafin, :date
  end
end
