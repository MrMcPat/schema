class User < ApplicationRecord
  has_many :favorites
  has_many :technologies, through: :favorites

  has_secure_password

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
end
