class CambiarATipo2 < ActiveRecord::Migration
  def change
  	add_column :tipos, :bajalogica, :boolean, default: false
  end
end
