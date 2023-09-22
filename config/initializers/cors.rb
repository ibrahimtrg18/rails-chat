Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'  # Replace with the actual domains you want to allow (e.g., 'https://example.com')

    resource '*',
      headers: :any,
      methods: [:get, :post, :put, :patch, :delete, :options, :head],
      expose: ['access-token', 'expiry', 'token-type', 'uid', 'client'],
      max_age: 0
  end
end
