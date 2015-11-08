class CambiarATipo < ActiveRecord::Migration
  def change
  	remove_column :tipos, :bajalogica
  end
end
