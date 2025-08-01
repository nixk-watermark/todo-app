class Todo
  include Mongoid::Document
  include Mongoid::Timestamps

  
  field :title,         type: String
  field :description,   type: String
  field :status,        type: String, default: "ongoing"
  field :deadline,      type: Date
  field :priority,      type: String, default: "low"
  
  belongs_to :user, inverse_of: :todos, optional: false

  STATUSES = %w[pending ongoing completed].freeze
  PRIORITIES = %w[low medium high].freeze

  validates :title, presence: true
  validates :status, presence: true, inclusion: { in: STATUSES }
  validates :priority, inclusion: { in: PRIORITIES }
  
end
