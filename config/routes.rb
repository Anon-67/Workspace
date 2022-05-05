Rails.application.routes.draw do
  
  resources :notes, only: [:create]
  resources :resources, only: [:index, :create]
  resources :project_users, only: [:create]
  resources :deliverables, only: [:create, :update]
  resources :projects, only: [:index, :show, :create]
  resources :users, only: [:index, :create, :show]

  resources :conversations, only: [:index, :show, :create]
  resources :handshakes, only: [:show]
  resources :messages, only: [:show]

  mount ActionCable.server => "/cable"


  get "/me", to: "users#show"
  post "/signup", to: "users#create"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/projects/:id/deliverables", to: "projects#deliverables"
  get "/adminprojects", to: "projects#admin"

  post "/projectuserspersonal", to: "project_users#personal"





  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
