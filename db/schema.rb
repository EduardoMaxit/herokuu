# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151107203752) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comentarios", force: true do |t|
    t.string   "texto"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "hospedaje_id"
    t.integer  "usuario_id"
  end

  create_table "fotos", force: true do |t|
    t.string   "link"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "hospedaje_id"
  end

  create_table "hospedajes", force: true do |t|
    t.string   "titulo"
    t.string   "encabezado"
    t.string   "descripcion"
    t.string   "provincia"
    t.string   "ciudad"
    t.string   "capacidad"
    t.boolean  "ocupado"
    t.date     "fechainic"
    t.date     "fechafin"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "tipo_id"
    t.integer  "usuario_id"
  end

  create_table "puntajes", force: true do |t|
    t.integer  "puntos"
    t.string   "comentario"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "hospedaje_id"
    t.integer  "usuario_id"
  end

  create_table "respuesta", force: true do |t|
    t.string   "texto"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "usuario_id"
    t.integer  "comentario_id"
  end

  create_table "tipos", force: true do |t|
    t.string   "nombre"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "bajalogica", default: false
  end

  create_table "usuarios", force: true do |t|
    t.string   "email",                  default: "",    null: false
    t.string   "encrypted_password",     default: "",    null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.string   "nombre"
    t.string   "apellido"
    t.string   "nomusuario"
    t.string   "dni"
    t.date     "fechanac"
    t.string   "nacionalidad"
    t.boolean  "genero"
    t.string   "tel_num"
    t.string   "tel_caract"
    t.boolean  "espremium",              default: false
    t.boolean  "esadmin",                default: false
    t.datetime "created_at",                             null: false
    t.datetime "updated_at",                             null: false
    t.boolean  "sexo"
  end

  add_index "usuarios", ["email"], name: "index_usuarios_on_email", unique: true, using: :btree
  add_index "usuarios", ["reset_password_token"], name: "index_usuarios_on_reset_password_token", unique: true, using: :btree

end
