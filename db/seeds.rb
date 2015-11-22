# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


puts "Hospedaje 1"
Hospedaje.find_or_create_by(titulo: "Gran Mansion", encabezado: "Situada en pleno centro de Merlo", descripcion: "Cuenta 7 habitaciones completamente amobladas con cable y baño cada una, gran cocina, comedor y un quincho de 300 metros cuadradros. Se encuentra ne pleno centro por lo que la movilidad no es un problema", provincia: "San Luis" , ciudad: "Merlo",  capacidad: "17" , usuario_id: 1 , tipo_id: 1 , puntajePromedio: 8 , ocupado: false , fechainic: '08/25/2016', fechafin: '08/25/2017')

Foto.find_or_create_by(link: "https://i.ytimg.com/vi/x7UflKOhhe4/maxresdefault.jpg", hospedaje_id: 1 )
Foto.find_or_create_by(link: "http://ciudad.cdncmd.com/sites/default/files/styles/ciu_nota_slider_contenido_hd/public/files_drupal_6/2013/10/02/CasaMessiLuisdeGarrido-4.jpg?itok=JO1yeb99", hospedaje_id: 1 )
Foto.find_or_create_by(link: "https://i.ytimg.com/vi/rzFhJdiLpNw/hqdefault.jpg", hospedaje_id: 1 )
Foto.find_or_create_by(link: "https://i.ytimg.com/vi/axfW7mLAEs0/maxresdefault.jpg", hospedaje_id: 1 )

Puntaje.find_or_create_by(puntos: 8, hospedaje_id: 1 )
Puntaje.find_or_create_by(puntos: 9, hospedaje_id: 1 )
Puntaje.find_or_create_by(puntos: 6, hospedaje_id: 1 )

Comentario.find_or_create_by(texto: "A cuantos kilomretros se encuentra de la plaza central?", hospedaje_id: 1, usuario_id: 3)
Respuesta.find_or_create_by(texto: "Exactamente a 600 metros ", comentario_id: 1, usuario_id: 1)

Comentario.find_or_create_by(texto: "Tiene garage? para cuantos autos?", hospedaje_id: 1, usuario_id: 2)
Respuesta.find_or_create_by(texto: "Si, para 7/8 depende del tamaño ", comentario_id: 2, usuario_id: 1)
Respuesta.find_or_create_by(texto: "Bueno, gracias por la informacion", comentario_id: 1, usuario_id: 2)

puts "hospedaje 2"

Hospedaje.find_or_create_by(titulo: "Cabaña los kaukenes", encabezado: "Cabaña para descansar", descripcion: "Cabaña situada a 4kms  del centro, no hay señal de tv , de radio ni movil. Consta de 2 habitaciones, cocina-comedor y baño con jacuzzi", provincia: "Entre Rios" , ciudad: "Concordia",  capacidad: "2" , usuario_id: 2 , tipo_id: 2  , puntajePromedio: 3 , ocupado: false , fechainic: '08/27/2016', fechafin: '08/25/2017')

Foto.find_or_create_by(link: "http://www.patagonia.com.ar/media/usuarios/fotos/normal_Rio_Grande_B.jpg", hospedaje_id: 2 )
Foto.find_or_create_by(link: "http://www.tigretienetodo.com.ar/cabanas%20colibri%206%20FOTOS.jpg", hospedaje_id: 2 )


Puntaje.find_or_create_by(puntos: 4, hospedaje_id: 2 )
Puntaje.find_or_create_by(puntos: 7, hospedaje_id: 2 )
Puntaje.find_or_create_by(puntos: 4, hospedaje_id: 2 )

Comentario.find_or_create_by(texto: "Dejas una canoa apra pasear?", hospedaje_id: 2, usuario_id: 1)
Respuesta.find_or_create_by(texto: "Si, pero con un precio extra ", comentario_id: 2, usuario_id: 2)

Comentario.find_or_create_by(texto: "Se puede pescar en el rio?", hospedaje_id: 2, usuario_id: 3)
Respuesta.find_or_create_by(texto: "Depende de la fecha en la que quieras venir, hay temporada de pesca deportiva", comentario_id: 2, usuario_id: 2)


puts "hospedaje 3"

Hospedaje.find_or_create_by(titulo: "Departemento para disfrutar con la familia", encabezado: "Departamento en pleno centro", descripcion: "Es un departamento al cual no le falta nada, muy comodo para una familia de 4/5 que tenga ganas de disfrutar de los espectaculos que brinda la ciudad de Buenaos Aires  ", provincia: "Buenos Aires" , ciudad: "Ciudad Autonoma de Bsas",  capacidad: "5" , usuario_id: 1 , tipo_id: 3 , puntajePromedio: 6 , ocupado: false ,fechainic: '08/25/2016', fechafin: '08/25/2017')

Foto.find_or_create_by(link: "http://imgar.zp-static.com/675968ff-4a55-490e-bf59-b17a674f6c60?dimension=340x255", hospedaje_id: 3 )
Foto.find_or_create_by(link: "http://imganuncios.mitula.net/nueva_a_estrenar_en_palermo_queen_en_alquiler_de_temporada_98130643007707872.jpg", hospedaje_id: 3 )

puts "hospedaje 4"

Hospedaje.find_or_create_by(titulo: "Pieza para disfrutar de la ciudad mas austral del mundo", encabezado: "Pieza amplia con baño privado", descripcion: "Se compartira la casa con sus dueños, dicha casa se encuentra a 5 km del centro invernal Cerro Castor", provincia: "Tierra del Fuego" , ciudad: "Ushuaia",  capacidad: "2", usuario_id: 2 , tipo_id: 4 , puntajePromedio: 8 , ocupado: false , fechainic: '08/25/2018', fechafin: '08/25/2019' )

Foto.find_or_create_by(link: "https://media-cdn.tripadvisor.com/media/photo-s/01/50/65/4c/la-habitacion-amplia.jpg", hospedaje_id: 4 )
Foto.find_or_create_by(link: "http://www.comodoro.gov.ar/efemerides/wp-content/uploads/2012/08/ushuaia1.gif", hospedaje_id: 4 )


Puntaje.find_or_create_by(puntos: 8, hospedaje_id: 4 )
Puntaje.find_or_create_by(puntos: 7, hospedaje_id: 4 )
Puntaje.find_or_create_by(puntos: 10, hospedaje_id: 4 )

Comentario.find_or_create_by(texto: "A que distancia se encuentra de la costanera?", hospedaje_id: 4, usuario_id: 3)
Respuesta.find_or_create_by(texto: "A 4 cuadras(400m) ", comentario_id: 3, usuario_id: 2)

puts "Creo  4 tipos"

Tipo.find_or_create_by(nombre: "Mansion")
Tipo.find_or_create_by(nombre: "Cabaña")
Tipo.find_or_create_by(nombre: "Departamento")
Tipo.find_or_create_by(nombre: "Otros")



