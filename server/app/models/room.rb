class Room < ApplicationRecord
  has_and_belongs_to_many :users
  has_many :rooms_users
  has_many :members, through: :rooms_users, source: :user
  has_many :messages, dependent: :destroy

  validates :name, presence: true
end
