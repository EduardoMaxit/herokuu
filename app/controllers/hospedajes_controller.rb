class HospedajesController < ApplicationController 
def index
		 @hospe=Hospedaje.all
end

def solCuenta
	if (!usuario_signed_in? or current_usuario.espremium)
		redirect_to hospedajes_path
	end
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
			end	#saco el promedio de todos los puntajes
			@total= tot / i
		end	
end

def validar 

	num_expr = /^\d{16}$/ # expresión regular 
    m = num_expr.match(params[ :numero ]) #Si no encuentra 16 digitos m es igual a nil
    cod_expr = /^\d{3}$/ # expresión regular 
    n = cod_expr.match(params[ :codigo ]) #si no encuentra 3 digitis n es igual a nil            
    r=rand(1..20)
	

		if (( m == nil ) || ( n == nil ))
			redirect_to hospedajes_solCuenta_path, notice: "Formato de numero de tarjeta o codigo de seguridad invalido"
		elsif (r> 5)
			redirect_to hospedajes_solCuenta_path, notice: "Numero de tarjeta o codigo de seguridad invalido"
		else
			idActual=current_usuario.id
			usuarioActual=Usuario.find(idActual)
			usuarioActual.espremium="true"
			usuarioActual.save
			redirect_to hospedajes_solCuenta_path, notice: "Usted es ahora usuario premium. Felicitaciones"
		end



end

end
