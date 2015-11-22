class FotosController < ApplicationController

  def new
  	@foto=Foto.new
    @id=params[:ide]
  end

  def create
    if Foto.where(link: params[:foto][:link], hospedaje_id: params[:foto][:hospedaje_id]).count==0 then
  		@foto=Foto.create(params.require(:foto).permit(:link,:hospedaje_id))
  		redirect_to hospedajes_edit_path(:id=> params[:foto][:hospedaje_id]), notice: "Hospedaje actualizado con exito"
    else
      redirect_to hospedajes_edit_path(:id=> params[:foto][:hospedaje_id]), notice: "Existe una foto igual asignada al hospedaje"
    end

  end


  def edit
    @foto=Foto.find(params[:id])
  end

  
  def update
    if Foto.where(link: params[:foto][:link], hospedaje_id: params[:idh]).count==0 then
     @foto=Foto.find(params[:ide])
     @foto.update_attributes(params.require(:foto).permit(:link))
     if(params[:notice]!="Hospedaje creado con exito. Inserte una foto")
      redirect_to hospedajes_edit_path(:id => params[:idh]), notice: "Hospedaje actualizado con exito"
     end
    else
     redirect_to hospedajes_edit_path(:id => params[:idh]), notice: "Existe una foto igual asignada al hospedaje"
    end
end


  def destroy
    if(Foto.where(hospedaje_id: params[:idh]).count>1) then
      @foto=Foto.find(params[:id])
      @foto.destroy
      redirect_to hospedajes_edit_path(:id=> params[:idh]), notice: "Cambios realizados con exito"
    else
      redirect_to hospedajes_edit_path(:id=> params[:idh]), notice: "Cada hospedaje debe tener una foto como minimo"
    end
  end

end
