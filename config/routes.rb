Rails.application.routes.draw do
  root "places#show", id: 2
  resources :places do
    member do
      post :set_location
    end
  end
end
