class Usuario < ActiveRecord::Base
  has_many :hospedajes, dependent: :destroy
  has_many :comentarios, dependent: :destroy
  has_many :puntajes, dependent: :destroy
  has_many :solicituds, dependent: :destroy
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

   
  validates_date :fechanac, :before => lambda { 18.years.ago }, :allow_nil =>false
  validates_presence_of :nombre
  validates_presence_of :apellido
  validates_presence_of :nomusuario
  validates_presence_of :dni
  validates_presence_of :tel_caract
  validates_presence_of :email
  #validates_presence_of :password

  validates :nomusuario, uniqueness: true
  validates :sexo, :inclusion => {:in => [true, false]}


   def countryname
    country = ISO3166::Country[nacionalidad]
    country.translations[I18n.locale.to_s] || country.name
  end

  def age(birthday)
  (Time.now.to_s(:number).to_i - birthday.to_time.to_s(:number).to_i)/10e9.to_i
end



end
