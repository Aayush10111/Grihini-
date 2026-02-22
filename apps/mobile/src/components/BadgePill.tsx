import { StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

type BadgePillProps = {
  label: string;
  tone?: "default" | "gold" | "success";
};

export function BadgePill({ label, tone = "default" }: BadgePillProps) {
  return (
    <View
      style={[
        styles.pill,
        tone === "gold" && styles.gold,
        tone === "success" && styles.success,
      ]}
    >
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: colors.surfaceTint,
    borderWidth: 1,
    borderColor: colors.border,
  },
  gold: {
    backgroundColor: "#FFF7E2",
    borderColor: colors.accentGold,
  },
  success: {
    backgroundColor: "#EAF7EE",
    borderColor: colors.success,
  },
  label: {
    fontSize: 12,
    color: colors.text,
    fontWeight: "600",
  },
});
