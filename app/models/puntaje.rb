class Puntaje < ActiveRecord::Base
	belongs_to :hospedaje
	belongs_to :usuario
end
