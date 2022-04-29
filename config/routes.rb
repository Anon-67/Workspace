Rails.application.routes.draw do
  
  resources :notes
  resources :resources, only: [:index, :create]
  resources :project_users, only: [:create]
  resources :deliverables, only: [:create, :update]
  resources :projects, only: [:index, :show, :create]
  resources :users, only: [:index]


  get "/me", to: "users#show"
  post "/signup", to: "users#create"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"

  get "/projects/:id/deliverables", to: "projects#deliverables"
  get "/adminprojects", to: "projects#admin"





  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
