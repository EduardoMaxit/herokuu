class TiposController < ApplicationController
  before_action :validar, only: [:create]

  def validar
    if Tipo.where(nombre: params[:tipo][:nombre]).count >  0 && !(Tipo.where(nombre: params[:tipo][:nombre]).first.bajalogica)
      redirect_to new_tipo_path, notice: "Ya existe ese tipo, intente de nuevo"     
    elsif Tipo.where(nombre: params[:tipo][:nombre]).count >  0 && (Tipo.where(nombre: params[:tipo][:nombre]).first.bajalogica)
      @tipo=Tipo.where(nombre: params[:tipo][:nombre]).first
      @tipo.bajalogica="false"
      @tipo.save
      redirect_to new_tipo_path, notice: "Creacion con exito"
    end     
  end

 def index
     if (usuario_signed_in? && current_usuario.esadmin)  
       @tipo=Tipo.all
    else
      redirect_to hospedajes_path
    end
  end

  def new
    if (usuario_signed_in? && current_usuario.esadmin)
      @tipo=Tipo.new
    else
      redirect_to hospedajes_path
    end
  end

  def create 
    @tipo=Tipo.create(params.require(:tipo).permit(:nombre))
    redirect_to new_tipo_path, notice: "Creacion con exito"
  end

  def edit   
     @tipo=Tipo.find(params[:id])
  end

  def update 
    @tipo=Tipo.find(params[:id])
    if Tipo.where(nombre: params[:tipo][:nombre]).count >  0 && !(Tipo.where(nombre: params[:tipo][:nombre]).first.bajalogica)
     redirect_to edit_tipo_path, notice: "Ya existe ese tipo, intente de nuevo"  
    elsif @tipo.update_attributes(params.require(:tipo).permit(:nombre))
      redirect_to tipos_path, notice: "Modificacion con exito"
    end

  end

  def destroy  
    @tipo=Tipo.find(params[:id])
    if @tipo.hospedajes.count > 0
      @tipo.bajalogica="true"
      @tipo.save
      redirect_to tipos_path, notice: "Se ha deshabilitado el tipo de hospedaje"
    else
      @tipo.destroy
      redirect_to tipos_path, notice: "Eliminacion con exito"
    end
    
  end

end