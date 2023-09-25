class User < ApplicationRecord
  has_secure_password
  has_and_belongs_to_many :rooms
  has_many :room_users
  has_many :joined_rooms, through: :room_users, source: :room

  # Validations
  validates :email, presence: true
  validates :username, presence: true
  validates :password, presence: true, length: { minimum: 6 }, allow_nil: true
end
