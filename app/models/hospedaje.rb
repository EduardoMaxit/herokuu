class Hospedaje < ActiveRecord::Base
	belongs_to :usuario
	belongs_to :tipo
	has_many :comentarios
	has_many :fotos
	has_many :puntajes
	default_scope -> { order :id }
end
