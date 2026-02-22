# SCREENS

## Customer Screens

1. Home
- Service category chips.
- "Top Workers Near You" card list.
- CTA to open full Worker List.

2. Worker List
- Filter controls for category, price, rating, availability.
- Worker cards with rate, badges, rating, completed jobs.
- Quick "Book" action and tap-through to profile.

3. Worker Profile
- Worker identity panel (name, area, experience).
- Services, hourly rate (NPR), badges, about text.
- Recent reviews section.
- CTA: "Book Now".

4. Booking Create
- Inputs: date/time, duration, address, notes.
- Actions: Cancel / Confirm Booking.

5. Booking Details
- Job summary card.
- Status timeline: Requested -> Accepted -> Enroute -> Started -> Completed.
- Demo control to advance status.
- CTA to rate worker once completed.

6. Rate Worker
- Star selector (1 to 5).
- Short text review.
- Submit action.

7. Bookings Tab
- List of all bookings with status chips.
- Opens Booking Details.

8. Profile Tab
- Customer profile summary.
- Mode switch to Worker UI.

## Worker Screens

1. Worker Dashboard
- List of active/non-completed jobs for the day.
- Status visibility per job.

2. Requests Inbox
- List of new booking requests (`Requested`).
- Actions: Accept / Decline.

3. Worker Profile Edit
- Editable fields: name, area, rate, services, about.
- Availability toggle.
- Save action.

## Navigation Model

- Customer bottom tabs: `Home`, `Bookings`, `Profile`.
- Worker bottom tabs: `Dashboard`, `Requests`, `Profile`.
- Mode switch is available from Profile (demo behavior).

## Design Notes

- Trust cues are present on each decision screen (ratings, badges, status).
- Clarity comes from reducing depth: key tasks are one or two taps away.
- Warmth is reinforced by consistent cream-card contrast and high readability text.
