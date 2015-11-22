class CuentasController < ApplicationController

def validar 
	flash.clear
	num_expr = /^\d{16}$/ # expresión regular 
    m = num_expr.match(params[ :numero ]) #Si no encuentra 16 digitos m es igual a nil
    cod_expr = /^\d{3}$/ # expresión regular 
    n = cod_expr.match(params[ :codigo ]) #si no encuentra 3 digitos n es igual a nil            
    r=rand(1..20)
	if (( m == nil ) || ( n == nil ))
		flash[:notice]= 'Formato de numero de tarjeta o codigo de seguridad invalido'
		render :cuentaPremium
	elsif (r> 5)
		flash[:notice]= 'Numero de tarjeta o codigo de seguridad invalido'
		render :cuentaPremium
	else
		usuarioActual=Usuario.find(current_usuario.id)
		usuarioActual.espremium="true"
		usuarioActual.save
	end
end

def cuentaPremium
	if (!usuario_signed_in? or current_usuario.espremium)
		redirect_to hospedajes_path
	end
end

end