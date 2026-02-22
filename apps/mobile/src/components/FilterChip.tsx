import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";

type FilterChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

export function FilterChip({ label, selected, onPress }: FilterChipProps) {
  return (
    <Pressable style={[styles.chip, selected && styles.chipSelected]} onPress={onPress}>
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  chipSelected: {
    backgroundColor: colors.primaryBurgundy,
    borderColor: colors.primaryBurgundy,
  },
  label: {
    color: colors.text,
    fontWeight: "600",
    fontSize: 13,
  },
  labelSelected: {
    color: "#fff",
  },
});
