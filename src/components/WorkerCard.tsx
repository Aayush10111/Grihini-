import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { Worker } from "../types";

type WorkerCardProps = {
  worker: Worker;
  onBook: (worker: Worker) => void;
};

export function WorkerCard({ worker, onBook }: WorkerCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.name}>{worker.name}</Text>
        <Text style={worker.availableNow ? styles.available : styles.unavailable}>
          {worker.availableNow ? "Available" : "Busy"}
        </Text>
      </View>

      <Text style={styles.service}>{worker.service} - {worker.location}</Text>
      <Text style={styles.about}>{worker.about}</Text>

      <View style={styles.row}>
        <Text style={styles.meta}>Rating {worker.rating}</Text>
        <Text style={styles.meta}>{worker.completedJobs} jobs</Text>
      </View>

      <View style={styles.rowBottom}>
        <Text style={styles.price}>NPR {worker.pricePerHourNpr}/hr</Text>
        <Pressable style={styles.button} onPress={() => onBook(worker)}>
          <Text style={styles.buttonText}>Book</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowBottom: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  service: {
    marginTop: 6,
    color: colors.textSecondary,
    fontWeight: "600",
  },
  about: {
    marginTop: 6,
    color: colors.textSecondary,
    lineHeight: 19,
  },
  meta: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 13,
  },
  price: {
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 15,
  },
  button: {
    backgroundColor: colors.accent,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  available: {
    color: colors.success,
    fontWeight: "700",
    fontSize: 12,
  },
  unavailable: {
    color: colors.textSecondary,
    fontWeight: "700",
    fontSize: 12,
  },
});
