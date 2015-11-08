class Comentario < ActiveRecord::Base
	belongs_to :usuario
	belongs_to :hospedaje
	has_many :respuestas
end
