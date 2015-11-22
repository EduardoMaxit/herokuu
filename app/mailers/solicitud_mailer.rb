class SolicitudMailer < ActionMailer::Base
  default from: "eduardomaxit5@gmail.com"

  def solicitante_email(origen, destino)
    @origen = origen
   	@destino= destino   		
    mail(to: @origen.email, subject: 'Datos del propietario')
  end
 
  def propietario_email(origen, destino)
    @origen = origen
   	@destino= destino   		
    mail(to: @destino.email, subject: 'Datos del solicitante')
  end
end
