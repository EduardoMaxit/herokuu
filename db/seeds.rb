# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


Hospedaje.find_or_create_by(titulo: "Gran Mansion", encabezado: "Situado en pleno centro de  Merlo (San luis) con gran parque", descripcion: "7 habitaciones con cable y baño cada una, gran cocina, comedor y un quincho de 300 metros cuadradros", provincia: "San Luis" , ciudad: "merlo",  capacidad: 17 , usuario_id: 1 , tipo_id: 1 )
Hospedaje.find_or_create_by(titulo: "casa con pileta", encabezado: "Situado a las orillas del rio salamanca", descripcion: "2 habitaciones con cable, cocina comedor y un parque de 25 metros cuadrados", provincia: "Catamarca" , ciudad: "san salvador",  capacidad: 5 , usuario_id: 2 , tipo_id: 2 )


Puntaje.find_or_create_by(puntos: 8, hospedaje_id: 1 )
Puntaje.find_or_create_by(puntos: 5, hospedaje_id: 1 )

Comentario.find_or_create_by(texto: "esta desmejorada", hospedaje_id: 1, usuario_id: 2)
Comentario.find_or_create_by(texto: "Muy buena la casa", hospedaje_id: 1, usuario_id: 2)

Respuesta.find_or_create_by(texto: "ES verdad, las paredes un desastre ", comentario_id: 1, usuario_id: 1)
Respuesta.find_or_create_by(texto: "solo tienen algunos manchones de humedad ", comentario_id: 1, usuario_id: 2)
Respuesta.find_or_create_by(texto: "Por lo menos no se le llueve agua ", comentario_id: 1, usuario_id: 2)