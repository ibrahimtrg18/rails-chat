module ResponseHelper
  def json_response(data, message = nil, error = nil, status = :ok)
    render json: {data: data, message: message, error: error, status: status}, status: status
  end
end
