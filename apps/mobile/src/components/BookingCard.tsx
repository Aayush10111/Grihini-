import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { Booking, Worker } from "../types";
import { BadgePill } from "./BadgePill";

type BookingCardProps = {
  booking: Booking;
  worker?: Worker;
  onOpen: (booking: Booking) => void;
};

export function BookingCard({ booking, worker, onOpen }: BookingCardProps) {
  return (
    <Pressable style={styles.card} onPress={() => onOpen(booking)}>
      <View style={styles.row}>
        <Text style={styles.workerName}>{worker?.name ?? "Worker"}</Text>
        <BadgePill label={booking.status} tone={booking.status === "Completed" ? "success" : "default"} />
      </View>

      <Text style={styles.service}>{booking.service}</Text>
      <Text style={styles.meta}>{booking.dateTime} • {booking.durationHours} hrs</Text>
      <Text style={styles.meta}>{booking.address}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  workerName: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "700",
  },
  service: {
    marginTop: 6,
    color: colors.darkMaroon,
    fontWeight: "700",
  },
  meta: {
    marginTop: 4,
    color: colors.secondaryText,
  },
});
