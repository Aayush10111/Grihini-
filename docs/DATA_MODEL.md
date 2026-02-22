# DATA MODEL

Day 1 uses mock data in local state, but this model is structured to map directly to backend tables.

## Entity: User

Purpose: Base identity for both customers and workers.

Fields:
- `id` (string, primary key)
- `role` (enum: `customer` | `worker`)
- `full_name` (string)
- `phone` (string)
- `email` (string, optional)
- `area` (string)
- `created_at` (datetime)

## Entity: WorkerProfile

Purpose: Worker-specific trust and service information.

Fields:
- `user_id` (string, foreign key -> User.id)
- `services` (array of enum: Cleaning, Dishwashing, Cooking, Laundry, Event Helper)
- `rate_per_hour_npr` (number)
- `rating_avg` (number)
- `completed_jobs` (number)
- `badges` (array: Phone Verified, ID Verified, Background Checked)
- `about` (string)
- `years_experience` (number)
- `available_now` (boolean)
- `updated_at` (datetime)

## Entity: Booking

Purpose: Service request lifecycle between customer and worker.

Fields:
- `id` (string, primary key)
- `customer_id` (string, foreign key -> User.id)
- `worker_id` (string, foreign key -> User.id)
- `service` (enum)
- `date_time` (datetime)
- `duration_hours` (number)
- `address` (string)
- `notes` (string)
- `status` (enum: Requested, Accepted, Enroute, Started, Completed, Declined)
- `created_at` (datetime)
- `updated_at` (datetime)

## Entity: Rating

Purpose: Post-completion customer feedback linked to booking.

Fields:
- `id` (string, primary key)
- `booking_id` (string, foreign key -> Booking.id)
- `customer_id` (string, foreign key -> User.id)
- `worker_id` (string, foreign key -> User.id)
- `stars` (integer 1-5)
- `review_text` (string)
- `created_at` (datetime)

## Relationships

- One `User` (worker role) has one `WorkerProfile`.
- One `User` (customer role) can create many `Booking` records.
- One `User` (worker role) can receive many `Booking` records.
- One completed `Booking` can have one `Rating`.

## Design Notes

- Trust data (badges, ratings, completed jobs) is first-class in `WorkerProfile`.
- Booking status is explicit and linear for easier tracking and support.
- Review data is normalized in `Rating` to support moderation and analytics later.
