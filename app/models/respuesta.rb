class Respuesta < ActiveRecord::Base
	belongs_to :comentario
	belongs_to :usuario
end
