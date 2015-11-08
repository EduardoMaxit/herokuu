class DropTipohospedajes < ActiveRecord::Migration
  def change
  	drop_table (:tipodehospedajes)
  end
end
