module ResponseHelper
  def json_response(data, message = nil, status = :ok, error = nil)
    render json: {data: data, message: message, error: error, status: status}, status: status
  end
end
