# This file is used by Rack-based servers to start the application.
use Rack::Cors do
  allow do
    origins 'http://localhost:4000'
    resource '*', headers: :any, methods: [:get, :post, :delete, :put, :patch, :options, :head]
  end
end

require_relative "config/environment"

run Rails.application
Rails.application.load_server
