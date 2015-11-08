class Tipo < ActiveRecord::Base
	has_many :hospedajes
	default_scope -> { order :nombre }
end
