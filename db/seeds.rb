# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Puntaje.find_or_create_by(puntos: 8, hospedaje_id: 1 )
Puntaje.find_or_create_by(puntos: 5, hospedaje_id: 1 )


Comentario.find_or_create_by(texto: "esta desmejorada", hospedaje_id: 1, usuario_id: 2)
Comentario.find_or_create_by(texto: "Muy buena la casa", hospedaje_id: 1, usuario_id: 2)


Respuesta.find_or_create_by(texto: "ES verdad, las paredes un desastre ", comentario_id: 1, usuario_id: 1)
Respuesta.find_or_create_by(texto: "solo tienen algunos manchones de humedad ", comentario_id: 1, usuario_id: 2)
Respuesta.find_or_create_by(texto: "Por lo menos no se le llueve agua ", comentario_id: 1, usuario_id: 2)