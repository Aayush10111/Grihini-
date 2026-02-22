import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { Worker } from "../types";
import { BadgePill } from "./BadgePill";
import { AppButton } from "./AppButton";

type WorkerCardProps = {
  worker: Worker;
  onView: (worker: Worker) => void;
  onBook: (worker: Worker) => void;
};

export function WorkerCard({ worker, onView, onBook }: WorkerCardProps) {
  return (
    <Pressable style={styles.card} onPress={() => onView(worker)}>
      <View style={styles.topRow}>
        <Text style={styles.name}>{worker.name}</Text>
        <BadgePill label={`★ ${worker.rating.toFixed(1)}`} tone="gold" />
      </View>

      <Text style={styles.subText}>{worker.area}</Text>
      <Text style={styles.subText}>{worker.services.join(" • ")}</Text>

      <View style={styles.metaRow}>
        <Text style={styles.meta}>{worker.completedJobs} jobs</Text>
        <Text style={styles.rate}>NPR {worker.ratePerHourNpr}/hr</Text>
      </View>

      <View style={styles.badgesRow}>
        {worker.badges.map((badge) => (
          <BadgePill key={badge} label={badge} />
        ))}
      </View>

      <View style={styles.actionRow}>
        <BadgePill
          label={worker.availableNow ? "Available Now" : "Busy"}
          tone={worker.availableNow ? "success" : "default"}
        />
        <View style={styles.buttonWrap}>
          <AppButton label="Book" onPress={() => onBook(worker)} />
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
  },
  subText: {
    marginTop: 6,
    color: colors.secondaryText,
  },
  metaRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meta: {
    color: colors.secondaryText,
    fontWeight: "600",
  },
  rate: {
    color: colors.darkMaroon,
    fontWeight: "700",
  },
  badgesRow: {
    marginTop: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  actionRow: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  buttonWrap: {
    minWidth: 108,
  },
});
