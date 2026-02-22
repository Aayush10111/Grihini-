import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";
import { BookingStatus } from "../types";

const order: BookingStatus[] = [
  "Requested",
  "Accepted",
  "Enroute",
  "Started",
  "Completed",
];

type StatusTimelineProps = {
  status: BookingStatus;
};

export function StatusTimeline({ status }: StatusTimelineProps) {
  const currentIndex = order.indexOf(status);

  return (
    <View style={styles.wrap}>
      {order.map((step, index) => {
        const done = currentIndex >= index;
        const active = currentIndex === index;
        return (
          <View key={step} style={styles.row}>
            <View style={[styles.dot, done && styles.dotDone, active && styles.dotActive]} />
            <Text style={[styles.label, done && styles.labelDone]}>{step}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.card,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  dotDone: {
    borderColor: colors.primaryBurgundy,
    backgroundColor: colors.primaryBurgundy,
  },
  dotActive: {
    borderColor: colors.accentGold,
    backgroundColor: colors.accentGold,
  },
  label: {
    color: colors.secondaryText,
    fontWeight: "600",
  },
  labelDone: {
    color: colors.text,
  },
});
