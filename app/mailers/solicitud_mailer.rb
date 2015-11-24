class SolicitudMailer < ActionMailer::Base
  default from: "Couchin-BlueScreen@gmail.com"

  def solicitante_email(propietario, solicitante)
    @propietario = propietario
   	@solicitante = solicitante   		
    mail(to: @solicitante.email, subject: 'Datos del propietario')
  end
 
  def propietario_email(propietario, solicitante)
    @propietario = propietario
    @solicitante = solicitante    		
    mail(to: @propietario.email, subject: 'Datos del solicitante')
  end

  def noaceptada(hospedaje, solicitante)
    @hospedaje = hospedaje
    @solicitante = solicitante        
    mail(to: @solicitante.email, subject: 'Solicitud no aceptada')
  end

  def nohayfecha(hospedaje, solicitante)
    @hospedaje = hospedaje
    @solicitante = solicitante        
    mail(to: @solicitante.email, subject: 'Hospedaje ocupado')
  end


end
