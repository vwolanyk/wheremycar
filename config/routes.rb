Rails.application.routes.draw do
  root "places#show", id: 2
  resources :places do
    member do
      post :set_location
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
