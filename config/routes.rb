Rails.application.routes.draw do
  resources :pieces
  resources :piece_types
  resources :moves
  resources :games
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
