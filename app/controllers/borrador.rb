
@tipo=Tipo.where(bajalogica: false)
@hospe=Hospedaje.all
	

busqueda simple

if( params[:palabra].present? ) #entro si la busqeuda es simple
			@hospe=@hospe.where("titulo like '%#{params[:palabra]}%' OR encabezado like '%#{params[:palabra]}%' OR descripcion like '%#{params[:palabra]}%' OR provincia like '%#{params[:palabra]}%' OR ciudad like '%#{params[:palabra]}%'" )


busqueda avanzada

por cantidad 
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

por valoracion

if (params[:valMin].present? || params[:valMax].present? )
							
						if (params[:valMin].present? && params[:valMax].present? && params[:valMax] >= params[:valMin] && params[:valMin] >= "0" && params[:valMax] >= "1"  && params[:valMax] <= "10" )
							@hospeAux=[]
							@hospe.each do |hospedaje|
								if params[:valMin].to_i <= hospedaje.puntajePromedio.to_i && params[:valMax].to_i >= hospedaje.puntajePromedio.to_i
									@hospeAux << hospedaje
								end	
							end	
							@hospe=@hospeAux
						
						else
							flash.now[:notice]= 'Por favor, complete correctamente la valoracion minima y/o maxima. Recuerde que la valoracion posee un rango de 0 a 10'
						    render :busquedaAvanzada
						end    
				end	


por nombre de ciudad

	if (params[:ciudad].present? )
						@hospe=@hospe.where("ciudad = :ciudad", ciudad: params[:ciudad] )	
						
	end

Por fecha de fecha

if (params[:fechaInic].present? || params[:fechaFin].present? )
							
						if ( params[:fechaInic].present? && params[:fechaFin].present? && params[:fechaInic].to_date < params[:fechaFin].to_date && params[:fechaInic].to_date >= Date.today  ) 
							@hospeAux=[]
							@hospe.each do |hospedaje|
								if params[:fechaInic].to_date > hospedaje.fechainic && params[:fechaFin].to_date < hospedaje.fechafin
									@sirve=0
									Solicitud.where(hospedaje_id: @hospe.id, aceptada: true).each do |solicitud|
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

por tipo

@tipo=Tipo.where(bajalogica: false) #falta validar el TIPO
				
		if ( params[:tipoHospe].present? ) #Lo que llega no es el nombre si no el id del tipo
			@tipoAux=Tipo.find(params[:tipoHospe])
			@hospe=@tipoAux.hospedajes


		end	
