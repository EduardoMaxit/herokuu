class AddDefaultsFieldsInUsuarios < ActiveRecord::Migration
  def change
  	change_column :usuarios, :esadmin, :boolean, :default => false
  	change_column :usuarios, :espremium, :boolean, :default => false
  end
end
