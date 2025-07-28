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

  # Scopes
  STATUSES.each do |status|
    scope status.to_sym, -> { where(status: status) }
  end

  PRIORITIES.each do |priority|
    scope priority.to_sym, -> { where(priority: priority) }
  end

  # Helper methods
  STATUSES.each do |status|
    define_method("#{status}?") { self.status == status }
    define_method("#{status}!") { update(status: status) }
  end

  PRIORITIES.each do |priority|
    define_method("#{priority}_priority?") { self.priority == priority }
    define_method("#{priority}_priority!") { update(priority: priority) }
  end

end
