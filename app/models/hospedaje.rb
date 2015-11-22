class Hospedaje < ActiveRecord::Base
	belongs_to :usuario
	belongs_to :tipo
	has_many :comentarios, dependent: :destroy
	has_many :fotos, dependent: :destroy
	has_many :puntajes, dependent: :destroy
	has_many :solicituds, dependent: :destroy
	default_scope -> { order :id }
	scope :libres, -> { where(ocupado: false) }


	validates_date :fechainic, :allow_nil =>false, :message => "Por favor, introduzca la fecha de inicio"
    validates_date :fechafin, :allow_nil =>false, :message2 => "Por favor, introduzca la fecha de fin"
	
	validate :expiration_date_cannot_be_in_the_past

	def expiration_date_cannot_be_in_the_past
     if (self.fechainic > self.fechafin )
      errors.add(:expiration_date, "La fecha de fin no puede ser anterior a la fecha de inicio")
     end
    end

end
