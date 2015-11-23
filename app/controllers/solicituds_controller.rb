class SolicitudsController < ApplicationController 
	before_action :validarUsuario, only: [:new]
	before_action :validarFecha, only: [:create]
	
def validarFecha
	#valida fechainic > hoy
	#valida fechainic este dentro de las fechas de disponibilidad
	#valida fechafin este dentro de las fechas de disponibilidad
	#validad fechafin> fechainic
	if (params[:solicitud][:fechainic].to_date < Date.today || 
		params[:solicitud][:fechainic].to_date < Hospedaje.find(params[:solicitud][:hospedaje_id]).fechainic ||
		params[:solicitud][:fechainic].to_date > Hospedaje.find(params[:solicitud][:hospedaje_id]).fechafin ||
		params[:solicitud][:fechafin].to_date < Hospedaje.find(params[:solicitud][:hospedaje_id]).fechainic ||
		params[:solicitud][:fechafin].to_date > Hospedaje.find(params[:solicitud][:hospedaje_id]).fechafin ||
		params[:solicitud][:fechainic].to_date < params[:solicitud][:fechainic].to_date)	
		redirect_to new_solicitud_path(:hospedaje_id => (params[:solicitud][:hospedaje_id])), notice: "Fechas invalidas"
	end
end

def validarUsuario  #valida que el usuario no se autoenvie una solicitud
	@hospe=Hospedaje.find(params[:hospedaje_id])
	if(@hospe.usuario_id==current_usuario.id)
		redirect_to hospedajes_path
	end
end

def aceptarSolicitud  #falta enviar mail
	redirect=false
	sol=Solicitud.find(params[:id])	
	Solicitud.where(hospedaje_id: sol.hospedaje_id, aceptada: true).each do |solicitud|  #busco que haya fecha disponible
		if((sol.fechainic >= solicitud.fechainic &&  sol.fechainic <= solicitud.fechafin) || (sol.fechafin <= solicitud.fechafin && sol.fechafin >= solicitud.fechainic))
			redirect=true
		end
	end
	if (redirect == true) #si no hay fecha disponible redirige
		redirect_to solicituds_path, notice: "No hay fecha disponible"
	else
		sol.aceptada=true  #si hay fecha disponible se acepta y se eliminan todas las otras solicitudes dentro de esa fecha
		sol.save
		Solicitud.where(hospedaje_id: sol.hospedaje_id, aceptada: false).each do |solicitud|
			if((solicitud.fechainic >= sol.fechainic &&  solicitud.fechainic <= sol.fechafin) || (solicitud.fechafin <= sol.fechafin && solicitud.fechafin >= sol.fechainic))
				solicitud.destroy
			end
		end
		redirect_to solicituds_path, notice: "Solicitud aceptada"
	end
end

def index
	if (usuario_signed_in?)
		current_usuario.hospedajes.each do |hospedaje|
			Solicitud.where(hospedaje_id: hospedaje.id, aceptada: false).each do |solicitud|
				if(Date.today >= solicitud.fechainic)
					solicitud.destroy
				end
			end
		end
		@hospe=current_usuario.hospedajes
	else
		redirect_to hospedajes_path
	end
end

def create
	@solicitud=Solicitud.new(params.require(:solicitud).permit(:fechainic, :fechafin, :hospedaje_id))
	@solicitud.usuario_id=current_usuario.id
	@solicitud.save
	redirect_to new_solicitud_path(:hospedaje_id => params[:solicitud][:hospedaje_id]), notice: "Se ha enviado la solicitud"
end

def new
	@solicitud=Solicitud.new(hospedaje_id: params[:hospedaje_id])
end

end