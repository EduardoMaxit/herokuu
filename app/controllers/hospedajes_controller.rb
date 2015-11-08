class HospedajesController < ApplicationController 
def index
		 @hospe=Hospedaje.all
end

def solCuenta

end

def show

	@hospe=Hospedaje.find(params[:id])
	@total=-1 
	i=0
    tot=0
    	
    	if @hospe.puntajes.count > 0
			@hospe.puntajes.each do |puntaje|   
				tot= tot + puntaje.puntos
				i = i + 1
				@total= tot / i
			end	#saco el promedio de todos los puntajes
		end	
end
def validar
	if ((params[ :numero ] % 7) < "5")
			redirect_to hospedajes_solCuenta_path, notice: "Numero de tarjeta invalida"
	else 

			idActual=current_usuario.id
			usuarioActual=Usuario.find(idActual)
			usuarioActual.espremium="true"
			usuarioActual.save
			
			redirect_to hospedajes_solCuenta_path, notice: "Usted es ahora usuario premium. Felicitaciones"
	end
end
end
