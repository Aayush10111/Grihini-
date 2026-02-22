# FLOWS

## Customer Flow

1. Open app in Customer Mode.
2. Land on Home and choose a service category or browse top workers.
3. Go to Worker List and refine with filters (category, price, rating, availability).
4. Open Worker Profile to review rate, badges, job history, and reviews.
5. Tap Book Now and fill booking details (date/time, duration, address, notes).
6. Confirm booking (status starts as `Requested`).
7. Track progress in Booking Details timeline:
   `Requested -> Accepted -> Enroute -> Started -> Completed`
8. After completion, submit a star rating and short review.

## Worker Flow

1. Switch to Worker Mode from Profile.
2. Open Worker Dashboard to view active jobs for the day.
3. Open Requests Inbox to inspect new `Requested` bookings.
4. Accept or decline incoming requests.
5. Keep profile details up to date in Worker Profile Edit:
   name, area, services, rate, about, availability.

## Operational Notes

- Authentication, payments, chat, maps, and notifications are intentionally out-of-scope for Day 1.
- All flows use mock data and local state to keep interactions deterministic and demo-friendly.

## Design Notes

- Trust is represented through visible verification badges and status transparency.
- Clarity is supported by linear flow steps and obvious call-to-action buttons.
- Warmth is maintained through soft backgrounds and human-readable labels.
