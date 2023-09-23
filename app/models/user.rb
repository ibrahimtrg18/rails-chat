class User < ApplicationRecord
  has_secure_password
  has_and_belongs_to_many :rooms

  # Validations
  validates :email, presence: true
  validates :username, presence: true
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
end
