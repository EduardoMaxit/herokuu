class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception


before_action :configure_permitted_parameters, if: :devise_controller?
  protected

  def configure_permitted_parameters
     devise_parameter_sanitizer.for(:sign_up) { |u| u.permit(:nombre, :apellido, :nomusuario, :dni, :fechanac, :nacionalidad, :sexo, :tel_num, :tel_caract, :espremium ,:esadmin, :password,:password_confirmation, :email) }
  	 devise_parameter_sanitizer.for(:account_update) { |u| u.permit(:foto,:nombre, :apellido, :nomusuario, :dni, :fechanac, :nacionalidad, :sexo, :tel_num, :tel_caract, :espremium ,:esadmin, :password,:password_confirmation, :email, :current_password) }

  end
end
