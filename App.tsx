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
import { WorkerCard } from "./src/components/WorkerCard";
import { workers } from "./src/data/workers";
import { colors } from "./src/theme/colors";
import { ServiceType, Worker } from "./src/types";

const services: ServiceType[] = [
  "Cleaning",
  "Cooking",
  "Dishwashing",
  "Laundry",
  "Event Help",
];

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceType>("Cleaning");
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [dateText, setDateText] = useState("");
  const [addressText, setAddressText] = useState("");
  const [noteText, setNoteText] = useState("");

  const filteredWorkers = useMemo(
    () => workers.filter((worker) => worker.service === selectedService),
    [selectedService],
  );

  const handleConfirmBooking = () => {
    if (!selectedWorker) return;
    if (!dateText.trim() || !addressText.trim()) {
      Alert.alert("Missing details", "Please add date/time and address.");
      return;
    }

    Alert.alert(
      "Booking requested",
      `Your request for ${selectedWorker.name} has been submitted.`,
    );
    setSelectedWorker(null);
    setDateText("");
    setAddressText("");
    setNoteText("");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Grihini</Text>
        <Text style={styles.subtitle}>Trusted home help in a few taps</Text>

        <Text style={styles.sectionTitle}>Services</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.serviceRow}>
          {services.map((service) => {
            const isSelected = selectedService === service;
            return (
              <Pressable
                key={service}
                onPress={() => setSelectedService(service)}
                style={[styles.chip, isSelected && styles.chipActive]}
              >
                <Text style={[styles.chipText, isSelected && styles.chipTextActive]}>{service}</Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text style={styles.sectionTitle}>Nearby workers</Text>
        {filteredWorkers.length > 0 ? (
          filteredWorkers.map((worker) => (
            <WorkerCard key={worker.id} worker={worker} onBook={setSelectedWorker} />
          ))
        ) : (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>No workers for this service yet.</Text>
          </View>
        )}

        {selectedWorker && (
          <View style={styles.bookingCard}>
            <Text style={styles.bookingTitle}>Book {selectedWorker.name}</Text>
            <TextInput
              placeholder="Date & time (e.g. 2026-02-23 10:00)"
              value={dateText}
              onChangeText={setDateText}
              style={styles.input}
              placeholderTextColor="#9f8585"
            />
            <TextInput
              placeholder="Address"
              value={addressText}
              onChangeText={setAddressText}
              style={styles.input}
              placeholderTextColor="#9f8585"
            />
            <TextInput
              placeholder="Notes (optional)"
              value={noteText}
              onChangeText={setNoteText}
              style={[styles.input, styles.inputLarge]}
              multiline
              placeholderTextColor="#9f8585"
            />

            <View style={styles.bookingActions}>
              <Pressable style={styles.cancelBtn} onPress={() => setSelectedWorker(null)}>
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.confirmBtn} onPress={handleConfirmBooking}>
                <Text style={styles.confirmBtnText}>Confirm</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: 16,
    paddingBottom: 28,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.accentDark,
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 16,
    color: colors.textSecondary,
    fontSize: 15,
  },
  sectionTitle: {
    marginTop: 8,
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  serviceRow: {
    marginBottom: 12,
  },
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
    backgroundColor: colors.surface,
  },
  chipActive: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  chipText: {
    color: colors.textPrimary,
    fontWeight: "600",
  },
  chipTextActive: {
    color: "#fff",
  },
  emptyCard: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  emptyText: {
    color: colors.textSecondary,
  },
  bookingCard: {
    marginTop: 8,
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  bookingTitle: {
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 10,
    color: colors.textPrimary,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    color: colors.textPrimary,
    backgroundColor: "#fff",
  },
  inputLarge: {
    minHeight: 80,
    textAlignVertical: "top",
  },
  bookingActions: {
    marginTop: 4,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cancelBtn: {
    flex: 1,
    marginRight: 8,
    paddingVertical: 11,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
  },
  confirmBtn: {
    flex: 1,
    marginLeft: 8,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: colors.accent,
    alignItems: "center",
  },
  cancelBtnText: {
    color: colors.textSecondary,
    fontWeight: "700",
  },
  confirmBtnText: {
    color: "#fff",
    fontWeight: "700",
  },
});
