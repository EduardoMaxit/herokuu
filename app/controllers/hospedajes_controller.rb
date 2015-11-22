class HospedajesController < ApplicationController 
	before_action :hospe, only: [:show, :destroy]
	before_action :ocupado, only: [:index]



def new
	@h=Hospedaje.new

end


def create
	params[:hospedaje][:usuario_id]=current_usuario.id
	@h=Hospedaje.new(params.require(:hospedaje).permit(:puntajePromedio,:fechainic,:fechafin,:tipo_id,:usuario_id,:titulo,:encabezado,:descripcion,:provincia,:capacidad,:ciudad))
    if @h.save
     ultimohosp=Hospedaje.where(usuario_id: current_usuario.id).last.id
     redirect_to fotos_new_path(:ide=> ultimohosp), notice: "Hospedaje creado con exito. Inserte una foto"
    else
     render :new
 end
end

def edit
	@h=Hospedaje.find(params[:id])
	@fotos=Foto.where(hospedaje_id: params[:id])

end

def update
	@hospedaje=Hospedaje.find(params[:id])
	@hospedaje.update_attributes(params.require(:hospedaje).permit(:fechainic, :fechafin, :titulo,:encabezado,:descripcion,:provincia,:capacidad,:ciudad))
	redirect_to hospedajes_edit_path(:id=> params[:id]), notice: "Cambios realizados con exito"
end




def index
	@modo="todo"
	
	@hospe=Hospedaje.all
	
	if( params[:palabra].present? ) #entro si la busqeuda es simple
			@hospe=@hospe.where("titulo like '%#{params[:palabra]}%' OR encabezado like '%#{params[:palabra]}%' OR descripcion like '%#{params[:palabra]}%' OR provincia like '%#{params[:palabra]}%' OR ciudad like '%#{params[:palabra]}%'" )
			@modo="simple"
	elsif ( params[:busqueda].present? )
		
		if  !params[:capMin].present? && !params[:capMax].present? && !params[:ciudad].present? && !params[:fechaInic].present? && !params[:fechaFin].present? && !params[:tipoHospe].present? && !params[:valMin].present? && !params[:valMax].present? 
			flash.now[:notice]= 'Por favor, complete algun campo de la busqueda'
			render :busquedaAvanzada
		else
				@modo=0	
			if (params[:ciudad].present? )
							@hospe=@hospe.where("ciudad = :ciudad", ciudad: params[:ciudad] )	
							
			end
			if (params[:fechaInic].present? || params[:fechaFin].present? )
								if ( params[:fechaInic].present? && params[:fechaFin].present? && params[:fechaInic].to_date < params[:fechaFin].to_date && params[:fechaInic].to_date >= Date.today  ) 
								@hospeAux=[]
								@hospe.each do |hospedaje|
									if params[:fechaInic].to_date > hospedaje.fechainic && params[:fechaFin].to_date < hospedaje.fechafin
										@sirve=0
										Solicitud.where(hospedaje_id: hospedaje.id, aceptada: true).each do |solicitud|
											if ( !( params[:fechaInic].to_date <= solicitud.fechainic && params[:fechaFin].to_date <= solicitud.fechainic ) || !( params[:fechaInic].to_date >= solicitud.fechaifin && params[:fechaFin].to_date >= solicitud.fechafin ) )
												@sirve=1
											end		
										end	
										if @sirve ==0
											@hospeAux << hospedaje		
										end		
									end	
								end	
								@hospe=@hospeAux
							else
								flash.now[:notice]= 'Por favor, complete correctamente las fechas de solicitud'
							    render :busquedaAvanzada
							end    
			end	
			if (params[:capMin].present? || params[:capMax].present? )
							if (params[:capMin].present? && params[:capMax].present? && params[:capMax] >= params[:capMin] && params[:capMin] >= "0" && params[:capMax] >= "1" )
								@hospeAux=[]
								@hospe.each do |hospedaje|
									if params[:capMin].to_i <= hospedaje.capacidad.to_i && params[:capMax].to_i >= hospedaje.capacidad.to_i
										@hospeAux << hospedaje
									end	
								end	
								@hospe=@hospeAux
							
							else
								flash.now[:notice]= 'Por favor, complete correctamente la capacidad minima y/o maxima'
							    render :busquedaAvanzada
							end    
			end	#fin del criterio capacidad
			if (params[:valMin].present? || params[:valMax].present? )

							if (params[:valMin].present? && params[:valMax].present? && params[:valMax] >= params[:valMin] && params[:valMin].to_i >= 0  && params[:valMax].to_i <= 10 )
								@hospeAux=[]
								@hospe.each do |hospedaje|
									if params[:valMin].to_i <= hospedaje.puntajePromedio.to_i && params[:valMax].to_i >= hospedaje.puntajePromedio.to_i
										@hospeAux << hospedaje
										@modo=@modo +1
									end	
								end	
								@hospe=@hospeAux
							
							else
								flash.now[:notice]= 'Por favor, complete correctamente la valoracion minima y/o maxima. Recuerde que la valoracion posee un rango de 0 a 10'
							    render :busquedaAvanzada
							end    
			end	
			@tipo=Tipo.where(bajalogica: false) 
			if ( params[:tipoHospe].present? ) #Lo que llega no es el nombre si no el id del tipo
				@tipoAux=Tipo.find(params[:tipoHospe])
				@hospeAux=[]
				@hospe.each do |hospedaje|
					if ( hospedaje.tipo.nombre == @tipoAux.nombre )
						@hospeAux << hospedaje
					end	

				end
				@hospe=@hospeAux
			end	
			
		
			
		end	

	end	
	
		
					
end	



def busquedaAvanzada	
	@tipo=Tipo.where(bajalogica: "false")
end

def ocupado
	Hospedaje.all.each do |hospedaje|
		@ocupado=false
		Solicitud.where(hospedaje_id: hospedaje.id, aceptada: true).each do |solicitud|
			if(Date.today >= solicitud.fechainic && Date.today <= solicitud.fechafin)
				@ocupado=true
			end
		end
		hospedaje.ocupado=@ocupado
		hospedaje.save
	end
end

def hospe
	@hospe=Hospedaje.find(params[:id])
end

def show	#modificar
	
end

def misHospedajes
	@hospe=Usuario.find(params[:id]).hospedajes
end

def destroy
	@hospe.destroy
    redirect_to hospedajes_misHospedajes_path(:id => current_usuario.id), notice: "Eliminacion con exito"
end

def puntuarHospedaje
	@hospedaje=Hospedaje.find(params[:id])
	if (!usuario_signed_in?)
		redirect_to hospedajes_path
	else 
		@id=params[:id]
		
	end
end

def validarPuntaje 
    
    @hospedaje=Hospedaje.find(params[:hospedaje_id]) 
    
    
    if @hospedaje.puntajes.where(usuario_id: current_usuario.id).count > 0	
    	
			@nuevoPuntaje=Puntaje.new
	    	@nuevoPuntaje.puntos=params[:puntos]
	    	@nuevoPuntaje.comentario=params[:comentario]
	    	@nuevoPuntaje.usuario_id=current_usuario.id
	    	@nuevoPuntaje.hospedaje_id=params[:hospedaje_id]
	    	@nuevoPuntaje.save

			tot=0
    		if @hospedaje.puntajes.count > 0
				@hospedaje.puntajes.each do |puntaje|   
					tot= tot + puntaje.puntos				
				end	
				@hospedaje.puntajePromedio= tot / @hospedaje.puntajes.count
				@hospedaje.save
				redirect_to root_path
			end

    else
     	flash.now[:notice]= 'Usted y ha puntuado este Hospedaje'
		render :busquedaAvanzada
    end

end

end
