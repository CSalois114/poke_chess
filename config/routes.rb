Rails.application.routes.draw do
  resources :users
  resources :pieces
  resources :piece_types
  resources :moves
  resources :games
  
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/auth", to: "users#show"

end
