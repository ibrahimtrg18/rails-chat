class Room < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :room_users
  has_many :members, through: :room_users, source: :user
  has_many :messages, dependent: :destroy

  validates :name, presence: true
end
