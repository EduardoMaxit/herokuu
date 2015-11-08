class CreateFotos < ActiveRecord::Migration
  def change
    create_table :fotos do |t|
      t.string :link

      t.timestamps
    end
  end
end
