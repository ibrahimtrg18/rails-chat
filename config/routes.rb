Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :create]

      post '/users/login', to: 'users#login'

      resources :rooms, only: [:index, :create] do
        member do
          post 'join'
          get 'messages'
        end
      end

      resources :messages, only: [:create]
    end
  end
end
