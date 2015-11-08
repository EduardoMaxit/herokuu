class Usuario < ActiveRecord::Base
  has_many :hospedajes
  has_many :comentarios
  has_many :puntajes
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

  validates :nomusuario, uniqueness: true
  validates :sexo, :inclusion => {:in => [true, false]}
  validates_length_of :tel_num, :minimum => 6


end
