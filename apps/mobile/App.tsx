import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AppButton } from "./src/components/AppButton";
import { BadgePill } from "./src/components/BadgePill";
import { BookingCard } from "./src/components/BookingCard";
import { BottomTabs } from "./src/components/BottomTabs";
import { FilterChip } from "./src/components/FilterChip";
import { ScreenHeader } from "./src/components/ScreenHeader";
import { StatusTimeline } from "./src/components/StatusTimeline";
import { WorkerCard } from "./src/components/WorkerCard";
import { bookings as mockBookings } from "./src/data/bookings";
import { workers as mockWorkers } from "./src/data/workers";
import { colors } from "./src/theme/colors";
import { Booking, BookingStatus, ServiceCategory, Worker } from "./src/types";

type Mode = "customer" | "worker";
type CustomerTab = "home" | "bookings" | "profile";
type WorkerTab = "dashboard" | "requests" | "profile";
type HomeView = "home" | "workerList" | "workerProfile" | "bookingCreate";
type BookingView = "list" | "details" | "rate";
type PriceFilter = "any" | "<=600" | "<=800";
type RatingFilter = "any" | ">=4.5" | ">=4.8";
type AvailabilityFilter = "all" | "available";

const categories: ServiceCategory[] = [
  "Cleaning",
  "Dishwashing",
  "Cooking",
  "Laundry",
  "Event Helper",
];

const customerTabs = [
  { key: "home", label: "Home" },
  { key: "bookings", label: "Bookings" },
  { key: "profile", label: "Profile" },
];

const workerTabs = [
  { key: "dashboard", label: "Dashboard" },
  { key: "requests", label: "Requests" },
  { key: "profile", label: "Profile" },
];

const statusOrder: BookingStatus[] = ["Requested", "Accepted", "Enroute", "Started", "Completed"];

function toWorkerName(worker?: Worker) {
  return worker ? worker.name : "Unknown Worker";
}

function initials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  return (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
}

export default function App() {
  const [mode, setMode] = useState<Mode>("customer");

  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  const [customerTab, setCustomerTab] = useState<CustomerTab>("home");
  const [workerTab, setWorkerTab] = useState<WorkerTab>("dashboard");

  const [homeView, setHomeView] = useState<HomeView>("home");
  const [bookingView, setBookingView] = useState<BookingView>("list");

  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);

  const [categoryFilter, setCategoryFilter] = useState<ServiceCategory | "all">("all");
  const [priceFilter, setPriceFilter] = useState<PriceFilter>("any");
  const [ratingFilter, setRatingFilter] = useState<RatingFilter>("any");
  const [availabilityFilter, setAvailabilityFilter] = useState<AvailabilityFilter>("all");

  const [bookingDateTime, setBookingDateTime] = useState("");
  const [bookingDuration, setBookingDuration] = useState("2");
  const [bookingAddress, setBookingAddress] = useState("");
  const [bookingNotes, setBookingNotes] = useState("");

  const [starInput, setStarInput] = useState(5);
  const [reviewInput, setReviewInput] = useState("");

  const ownWorkerId = "w1";
  const ownWorker = workers.find((worker) => worker.id === ownWorkerId);
  const [editName, setEditName] = useState(ownWorker?.name ?? "");
  const [editArea, setEditArea] = useState(ownWorker?.area ?? "");
  const [editRate, setEditRate] = useState(String(ownWorker?.ratePerHourNpr ?? 0));
  const [editAbout, setEditAbout] = useState(ownWorker?.about ?? "");
  const [editServices, setEditServices] = useState<ServiceCategory[]>(ownWorker?.services ?? ["Cleaning"]);
  const [editAvailable, setEditAvailable] = useState(ownWorker?.availableNow ?? true);

  const workerById = useMemo(
    () => new Map(workers.map((worker) => [worker.id, worker] as const)),
    [workers],
  );

  const selectedWorker = selectedWorkerId ? workerById.get(selectedWorkerId) ?? null : null;
  const selectedBooking = selectedBookingId
    ? bookings.find((booking) => booking.id === selectedBookingId) ?? null
    : null;

  const topWorkers = useMemo(
    () => [...workers].sort((a, b) => b.rating - a.rating || b.completedJobs - a.completedJobs).slice(0, 4),
    [workers],
  );

  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      if (categoryFilter !== "all" && !worker.services.includes(categoryFilter)) return false;
      if (priceFilter === "<=600" && worker.ratePerHourNpr > 600) return false;
      if (priceFilter === "<=800" && worker.ratePerHourNpr > 800) return false;
      if (ratingFilter === ">=4.5" && worker.rating < 4.5) return false;
      if (ratingFilter === ">=4.8" && worker.rating < 4.8) return false;
      if (availabilityFilter === "available" && !worker.availableNow) return false;
      return true;
    });
  }, [availabilityFilter, categoryFilter, priceFilter, ratingFilter, workers]);

  const sortedBookings = useMemo(
    () => [...bookings].sort((a, b) => (a.dateTime < b.dateTime ? 1 : -1)),
    [bookings],
  );

  const workerRequestBookings = useMemo(
    () => sortedBookings.filter((booking) => booking.status === "Requested"),
    [sortedBookings],
  );

  const workerTodayBookings = useMemo(
    () => sortedBookings.filter((booking) => booking.status !== "Completed" && booking.status !== "Declined"),
    [sortedBookings],
  );

  const workerReviews = useMemo(() => {
    if (!selectedWorkerId) return [];
    return bookings
      .filter((booking) => booking.workerId === selectedWorkerId && booking.status === "Completed")
      .map((booking) => ({
        id: booking.id,
        rating: booking.rating,
        review: booking.review,
        dateTime: booking.dateTime,
      }))
      .filter((entry) => entry.rating && entry.review);
  }, [bookings, selectedWorkerId]);

  const resetCreateBooking = () => {
    setBookingDateTime("");
    setBookingDuration("2");
    setBookingAddress("");
    setBookingNotes("");
  };

  const openWorkerProfile = (worker: Worker) => {
    setSelectedWorkerId(worker.id);
    setHomeView("workerProfile");
  };

  const openBookingCreate = (worker: Worker) => {
    setSelectedWorkerId(worker.id);
    setHomeView("bookingCreate");
  };

  const createBooking = () => {
    if (!selectedWorker) return;
    if (!bookingDateTime.trim() || !bookingAddress.trim()) {
      Alert.alert("Missing details", "Please fill date/time and address.");
      return;
    }

    const duration = Number(bookingDuration);
    if (!Number.isFinite(duration) || duration <= 0) {
      Alert.alert("Invalid duration", "Please enter a valid duration in hours.");
      return;
    }

    const nextId = `b${bookings.length + 1}`;
    const nextBooking: Booking = {
      id: nextId,
      customerName: "Aayush Sigdel",
      workerId: selectedWorker.id,
      service: selectedWorker.services[0],
      dateTime: bookingDateTime,
      durationHours: duration,
      address: bookingAddress,
      notes: bookingNotes,
      status: "Requested",
    };

    setBookings((current) => [nextBooking, ...current]);
    setSelectedBookingId(nextId);
    setCustomerTab("bookings");
    setBookingView("details");
    setHomeView("home");
    resetCreateBooking();
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    setBookings((current) =>
      current.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking)),
    );
  };

  const moveBookingForward = (booking: Booking) => {
    const currentIdx = statusOrder.indexOf(booking.status);
    if (currentIdx === -1 || currentIdx >= statusOrder.length - 1) return;
    updateBookingStatus(booking.id, statusOrder[currentIdx + 1]);
  };

  const submitRating = () => {
    if (!selectedBooking) return;
    setBookings((current) =>
      current.map((booking) =>
        booking.id === selectedBooking.id
          ? {
              ...booking,
              rating: starInput,
              review: reviewInput.trim() || "Great service.",
            }
          : booking,
      ),
    );
    Alert.alert("Thanks", "Your review has been saved.");
    setBookingView("details");
  };

  const acceptRequest = (bookingId: string) => updateBookingStatus(bookingId, "Accepted");
  const declineRequest = (bookingId: string) => updateBookingStatus(bookingId, "Declined");

  const toggleService = (service: ServiceCategory) => {
    setEditServices((current) => {
      if (current.includes(service)) {
        if (current.length === 1) return current;
        return current.filter((entry) => entry !== service);
      }
      return [...current, service];
    });
  };

  const saveWorkerProfile = () => {
    const parsedRate = Number(editRate);
    if (!editName.trim() || !editArea.trim() || !Number.isFinite(parsedRate) || parsedRate <= 0) {
      Alert.alert("Invalid profile", "Please fill all required fields with valid values.");
      return;
    }

    setWorkers((current) =>
      current.map((worker) =>
        worker.id === ownWorkerId
          ? {
              ...worker,
              name: editName,
              area: editArea,
              ratePerHourNpr: parsedRate,
              about: editAbout,
              services: editServices,
              availableNow: editAvailable,
            }
          : worker,
      ),
    );

    Alert.alert("Saved", "Worker profile updated for demo mode.");
  };

  const renderCustomerHome = () => {
    if (homeView === "workerList") {
      return (
        <View>
          <ScreenHeader title="Worker List" subtitle="Filter by category, price, rating, and availability" />
          <View style={styles.filterSection}>
            <Text style={styles.filterTitle}>Category</Text>
            <View style={styles.chipRow}>
              <FilterChip label="All" selected={categoryFilter === "all"} onPress={() => setCategoryFilter("all")} />
              {categories.map((category) => (
                <FilterChip
                  key={category}
                  label={category}
                  selected={categoryFilter === category}
                  onPress={() => setCategoryFilter(category)}
                />
              ))}
            </View>

            <Text style={styles.filterTitle}>Price</Text>
            <View style={styles.chipRow}>
              {["any", "<=600", "<=800"].map((entry) => (
                <FilterChip
                  key={entry}
                  label={entry === "any" ? "Any" : `NPR ${entry.replace("<=", "<= ")}`}
                  selected={priceFilter === entry}
                  onPress={() => setPriceFilter(entry as PriceFilter)}
                />
              ))}
            </View>

            <Text style={styles.filterTitle}>Rating</Text>
            <View style={styles.chipRow}>
              {["any", ">=4.5", ">=4.8"].map((entry) => (
                <FilterChip
                  key={entry}
                  label={entry === "any" ? "Any" : entry}
                  selected={ratingFilter === entry}
                  onPress={() => setRatingFilter(entry as RatingFilter)}
                />
              ))}
            </View>

            <Text style={styles.filterTitle}>Availability</Text>
            <View style={styles.chipRow}>
              <FilterChip
                label="All"
                selected={availabilityFilter === "all"}
                onPress={() => setAvailabilityFilter("all")}
              />
              <FilterChip
                label="Available"
                selected={availabilityFilter === "available"}
                onPress={() => setAvailabilityFilter("available")}
              />
            </View>
          </View>

          <View style={styles.actionInline}>
            <AppButton label="Back to Home" variant="outline" onPress={() => setHomeView("home")} />
          </View>

          <Text style={styles.sectionTitle}>Results ({filteredWorkers.length})</Text>
          {filteredWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} onView={openWorkerProfile} onBook={openBookingCreate} />
          ))}
        </View>
      );
    }

    if (homeView === "workerProfile" && selectedWorker) {
      return (
        <View>
          <ScreenHeader title="Worker Profile" subtitle="Trusted helper details" />
          <View style={styles.profileCard}>
            <View style={styles.profileHead}>
              <View style={styles.avatarCircle}>
                <Text style={styles.avatarText}>{initials(selectedWorker.name)}</Text>
              </View>
              <View style={styles.profileHeadText}>
                <Text style={styles.profileName}>{selectedWorker.name}</Text>
                <Text style={styles.metaLine}>{selectedWorker.area}</Text>
                <Text style={styles.metaLine}>{selectedWorker.yearsExperience} years experience</Text>
              </View>
            </View>

            <View style={styles.badgeRowWrap}>
              <BadgePill label={`★ ${selectedWorker.rating.toFixed(1)}`} tone="gold" />
              <BadgePill label={`${selectedWorker.completedJobs} jobs completed`} />
              {selectedWorker.badges.map((badge) => (
                <BadgePill key={badge} label={badge} />
              ))}
            </View>

            <Text style={styles.profileSection}>Services</Text>
            <Text style={styles.metaLine}>{selectedWorker.services.join(" • ")}</Text>

            <Text style={styles.profileSection}>Rate</Text>
            <Text style={styles.metaLine}>NPR {selectedWorker.ratePerHourNpr}/hour</Text>

            <Text style={styles.profileSection}>About</Text>
            <Text style={styles.metaLine}>{selectedWorker.about}</Text>
          </View>

          <Text style={styles.sectionTitle}>Recent Reviews</Text>
          {workerReviews.length === 0 ? (
            <View style={styles.infoCard}>
              <Text style={styles.metaLine}>No written reviews yet. Ratings are from completed bookings.</Text>
            </View>
          ) : (
            workerReviews.map((entry) => (
              <View key={entry.id} style={styles.infoCard}>
                <Text style={styles.metaLine}>★ {entry.rating} • {entry.dateTime}</Text>
                <Text style={styles.reviewText}>{entry.review}</Text>
              </View>
            ))
          )}

          <View style={styles.dualActions}>
            <AppButton label="Back" variant="outline" onPress={() => setHomeView("workerList")} />
            <AppButton label="Book Now" onPress={() => setHomeView("bookingCreate")} />
          </View>
        </View>
      );
    }

    if (homeView === "bookingCreate" && selectedWorker) {
      return (
        <View>
          <ScreenHeader title="Create Booking" subtitle={`Booking with ${selectedWorker.name}`} />

          <View style={styles.formCard}>
            <Text style={styles.inputLabel}>Date & time</Text>
            <TextInput
              value={bookingDateTime}
              onChangeText={setBookingDateTime}
              placeholder="2026-02-25 10:00"
              placeholderTextColor={colors.secondaryText}
              style={styles.input}
            />

            <Text style={styles.inputLabel}>Duration (hours)</Text>
            <TextInput
              value={bookingDuration}
              onChangeText={setBookingDuration}
              keyboardType="numeric"
              placeholder="2"
              placeholderTextColor={colors.secondaryText}
              style={styles.input}
            />

            <Text style={styles.inputLabel}>Address</Text>
            <TextInput
              value={bookingAddress}
              onChangeText={setBookingAddress}
              placeholder="Street, area, city"
              placeholderTextColor={colors.secondaryText}
              style={styles.input}
            />

            <Text style={styles.inputLabel}>Notes</Text>
            <TextInput
              value={bookingNotes}
              onChangeText={setBookingNotes}
              placeholder="Any special instructions"
              placeholderTextColor={colors.secondaryText}
              style={[styles.input, styles.notesInput]}
              multiline
            />
          </View>

          <View style={styles.dualActions}>
            <AppButton label="Cancel" variant="outline" onPress={() => setHomeView("workerProfile")} />
            <AppButton label="Confirm Booking" onPress={createBooking} />
          </View>
        </View>
      );
    }

    return (
      <View>
        <ScreenHeader title="Namaste, Aayush" subtitle="Book trusted home support in minutes" />

        <Text style={styles.sectionTitle}>Service Categories</Text>
        <View style={styles.chipRow}>
          {categories.map((category) => (
            <FilterChip
              key={category}
              label={category}
              selected={false}
              onPress={() => {
                setCategoryFilter(category);
                setHomeView("workerList");
              }}
            />
          ))}
        </View>

        <View style={styles.actionInline}>
          <AppButton label="Browse All Workers" onPress={() => setHomeView("workerList")} />
        </View>

        <Text style={styles.sectionTitle}>Top Workers Near You</Text>
        {topWorkers.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} onView={openWorkerProfile} onBook={openBookingCreate} />
        ))}
      </View>
    );
  };

  const renderCustomerBookings = () => {
    if (bookingView === "details" && selectedBooking) {
      const bookingWorker = workerById.get(selectedBooking.workerId);
      const isComplete = selectedBooking.status === "Completed";
      return (
        <View>
          <ScreenHeader title="Booking Details" subtitle={`with ${toWorkerName(bookingWorker)}`} />

          <View style={styles.infoCard}>
            <Text style={styles.metaLine}>{selectedBooking.service}</Text>
            <Text style={styles.metaLine}>{selectedBooking.dateTime} • {selectedBooking.durationHours} hours</Text>
            <Text style={styles.metaLine}>{selectedBooking.address}</Text>
            <Text style={styles.metaLine}>{selectedBooking.notes || "No notes"}</Text>
          </View>

          <Text style={styles.sectionTitle}>Status Timeline</Text>
          <StatusTimeline status={selectedBooking.status} />

          <View style={styles.dualActions}>
            <AppButton label="Back to Bookings" variant="outline" onPress={() => setBookingView("list")} />
            <AppButton
              label="Advance Status (Demo)"
              onPress={() => moveBookingForward(selectedBooking)}
              disabled={selectedBooking.status === "Completed" || selectedBooking.status === "Declined"}
            />
          </View>

          {isComplete ? (
            <View style={styles.actionInline}>
              <AppButton
                label={selectedBooking.rating ? "Edit Review" : "Rate Worker"}
                variant="secondary"
                onPress={() => {
                  setStarInput(selectedBooking.rating ?? 5);
                  setReviewInput(selectedBooking.review ?? "");
                  setBookingView("rate");
                }}
              />
            </View>
          ) : null}
        </View>
      );
    }

    if (bookingView === "rate" && selectedBooking) {
      return (
        <View>
          <ScreenHeader title="Rate Worker" subtitle="Share your experience" />

          <View style={styles.formCard}>
            <Text style={styles.inputLabel}>Stars</Text>
            <View style={styles.chipRow}>
              {[1, 2, 3, 4, 5].map((stars) => (
                <FilterChip
                  key={stars}
                  label={`${stars} ★`}
                  selected={starInput === stars}
                  onPress={() => setStarInput(stars)}
                />
              ))}
            </View>

            <Text style={styles.inputLabel}>Short Review</Text>
            <TextInput
              value={reviewInput}
              onChangeText={setReviewInput}
              placeholder="Reliable, respectful, and efficient"
              placeholderTextColor={colors.secondaryText}
              style={[styles.input, styles.notesInput]}
              multiline
            />
          </View>

          <View style={styles.dualActions}>
            <AppButton label="Back" variant="outline" onPress={() => setBookingView("details")} />
            <AppButton label="Submit" onPress={submitRating} />
          </View>
        </View>
      );
    }

    return (
      <View>
        <ScreenHeader title="My Bookings" subtitle="Track all service requests" />

        {sortedBookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            worker={workerById.get(booking.workerId)}
            onOpen={(entry) => {
              setSelectedBookingId(entry.id);
              setBookingView("details");
            }}
          />
        ))}
      </View>
    );
  };

  const renderCustomerProfile = () => {
    return (
      <View>
        <ScreenHeader title="Profile" subtitle="Customer settings and mode switch" />

        <View style={styles.profileCard}>
          <Text style={styles.profileName}>Aayush Sigdel</Text>
          <Text style={styles.metaLine}>Kathmandu Valley</Text>
          <Text style={styles.metaLine}>Preferred language: Nepali / English</Text>

          <Text style={styles.profileSection}>Demo Mode Switch</Text>
          <Text style={styles.metaLine}>Switch to Worker Mode to view dashboard, requests, and profile edit flow.</Text>

          <View style={styles.dualActions}>
            <AppButton label="Stay in Customer" variant="outline" onPress={() => setMode("customer")} />
            <AppButton
              label="Switch to Worker"
              variant="secondary"
              onPress={() => {
                setMode("worker");
                setWorkerTab("dashboard");
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  const renderWorkerDashboard = () => {
    return (
      <View>
        <ScreenHeader title="Worker Dashboard" subtitle="Today's active requests and statuses" />

        {workerTodayBookings.length === 0 ? (
          <View style={styles.infoCard}>
            <Text style={styles.metaLine}>No active jobs today.</Text>
          </View>
        ) : (
          workerTodayBookings.map((booking) => (
            <View key={booking.id} style={styles.infoCard}>
              <Text style={styles.profileName}>{booking.service} • {booking.dateTime}</Text>
              <Text style={styles.metaLine}>{booking.address}</Text>
              <Text style={styles.metaLine}>Status: {booking.status}</Text>
            </View>
          ))
        )}
      </View>
    );
  };

  const renderWorkerRequests = () => {
    return (
      <View>
        <ScreenHeader title="Requests Inbox" subtitle="Accept or decline new booking requests" />

        {workerRequestBookings.length === 0 ? (
          <View style={styles.infoCard}>
            <Text style={styles.metaLine}>No pending requests.</Text>
          </View>
        ) : (
          workerRequestBookings.map((booking) => (
            <View key={booking.id} style={styles.infoCard}>
              <Text style={styles.profileName}>{booking.service} • {booking.dateTime}</Text>
              <Text style={styles.metaLine}>{booking.address}</Text>
              <Text style={styles.metaLine}>Duration: {booking.durationHours} hrs</Text>
              <Text style={styles.metaLine}>Notes: {booking.notes || "No notes"}</Text>

              <View style={styles.dualActions}>
                <AppButton label="Decline" variant="outline" onPress={() => declineRequest(booking.id)} />
                <AppButton label="Accept" onPress={() => acceptRequest(booking.id)} />
              </View>
            </View>
          ))
        )}
      </View>
    );
  };

  const renderWorkerProfile = () => {
    return (
      <View>
        <ScreenHeader title="Worker Profile Edit" subtitle="Update services, rates, and availability" />

        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>Full name</Text>
          <TextInput value={editName} onChangeText={setEditName} style={styles.input} />

          <Text style={styles.inputLabel}>Area</Text>
          <TextInput value={editArea} onChangeText={setEditArea} style={styles.input} />

          <Text style={styles.inputLabel}>Rate (NPR/hour)</Text>
          <TextInput value={editRate} onChangeText={setEditRate} style={styles.input} keyboardType="numeric" />

          <Text style={styles.inputLabel}>Services</Text>
          <View style={styles.chipRow}>
            {categories.map((category) => (
              <FilterChip
                key={category}
                label={category}
                selected={editServices.includes(category)}
                onPress={() => toggleService(category)}
              />
            ))}
          </View>

          <Text style={styles.inputLabel}>About</Text>
          <TextInput
            value={editAbout}
            onChangeText={setEditAbout}
            style={[styles.input, styles.notesInput]}
            multiline
          />

          <View style={styles.availabilityRow}>
            <Text style={styles.inputLabel}>Available Now</Text>
            <AppButton
              label={editAvailable ? "ON" : "OFF"}
              variant={editAvailable ? "primary" : "outline"}
              onPress={() => setEditAvailable((current) => !current)}
            />
          </View>
        </View>

        <View style={styles.dualActions}>
          <AppButton
            label="Switch to Customer"
            variant="outline"
            onPress={() => {
              setMode("customer");
              setCustomerTab("home");
            }}
          />
          <AppButton label="Save Profile" onPress={saveWorkerProfile} />
        </View>
      </View>
    );
  };

  const renderBody = () => {
    if (mode === "customer") {
      if (customerTab === "home") return renderCustomerHome();
      if (customerTab === "bookings") return renderCustomerBookings();
      return renderCustomerProfile();
    }

    if (workerTab === "dashboard") return renderWorkerDashboard();
    if (workerTab === "requests") return renderWorkerRequests();
    return renderWorkerProfile();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.modeBanner}>
        <Text style={styles.modeBannerText}>
          {mode === "customer" ? "Customer Mode" : "Worker Mode"}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>{renderBody()}</ScrollView>

      <BottomTabs
        tabs={mode === "customer" ? customerTabs : workerTabs}
        activeTab={mode === "customer" ? customerTab : workerTab}
        onChange={(key) => {
          if (mode === "customer") {
            const tab = key as CustomerTab;
            setCustomerTab(tab);
            if (tab === "home") setHomeView("home");
            if (tab === "bookings") setBookingView("list");
          } else {
            setWorkerTab(key as WorkerTab);
          }
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.creamBackground,
  },
  modeBanner: {
    borderBottomWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceTint,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  modeBannerText: {
    color: colors.darkMaroon,
    fontWeight: "800",
    fontSize: 13,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 22,
  },
  sectionTitle: {
    marginTop: 16,
    marginBottom: 10,
    color: colors.text,
    fontWeight: "800",
    fontSize: 18,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  actionInline: {
    marginTop: 12,
    marginBottom: 6,
  },
  dualActions: {
    marginTop: 12,
    flexDirection: "row",
    gap: 10,
  },
  filterSection: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 14,
    padding: 12,
    gap: 8,
  },
  filterTitle: {
    fontWeight: "700",
    color: colors.text,
    marginTop: 4,
  },
  profileCard: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 16,
    padding: 14,
  },
  profileHead: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  profileHeadText: {
    flex: 1,
  },
  avatarCircle: {
    width: 58,
    height: 58,
    borderRadius: 999,
    backgroundColor: colors.primaryBurgundy,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 20,
  },
  profileName: {
    fontSize: 17,
    color: colors.text,
    fontWeight: "800",
  },
  metaLine: {
    color: colors.secondaryText,
    marginTop: 4,
    lineHeight: 20,
  },
  profileSection: {
    marginTop: 12,
    color: colors.text,
    fontWeight: "700",
  },
  badgeRowWrap: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  infoCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
  },
  reviewText: {
    color: colors.text,
    marginTop: 6,
  },
  formCard: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
  },
  inputLabel: {
    marginTop: 6,
    marginBottom: 6,
    color: colors.text,
    fontWeight: "700",
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    backgroundColor: colors.creamBackground,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: colors.text,
  },
  notesInput: {
    minHeight: 86,
    textAlignVertical: "top",
  },
  availabilityRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
