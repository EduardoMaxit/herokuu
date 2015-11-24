class Solicitud < ActiveRecord::Base
	belongs_to :usuario
	belongs_to :hospedaje
	default_scope -> { order :hospedaje_id, :id }
end

