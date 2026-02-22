import { Pressable, StyleSheet, Text } from "react-native";
import { colors } from "../theme/colors";

type AppButtonProps = {
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
};

export function AppButton({
  label,
  onPress,
  variant = "primary",
  disabled = false,
}: AppButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        variant === "primary" && styles.primary,
        variant === "secondary" && styles.secondary,
        variant === "outline" && styles.outline,
        pressed && !disabled ? styles.pressed : undefined,
        disabled && styles.disabled,
      ]}
    >
      <Text
        style={[
          styles.text,
          variant === "outline" ? styles.outlineText : styles.solidText,
          disabled && styles.disabledText,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
  },
  primary: {
    backgroundColor: colors.primaryBurgundy,
    borderColor: colors.primaryBurgundy,
  },
  secondary: {
    backgroundColor: colors.darkMaroon,
    borderColor: colors.darkMaroon,
  },
  outline: {
    backgroundColor: colors.card,
    borderColor: colors.border,
  },
  text: {
    fontSize: 15,
    fontWeight: "700",
  },
  solidText: {
    color: "#FFFFFF",
  },
  outlineText: {
    color: colors.text,
  },
  pressed: {
    opacity: 0.88,
  },
  disabled: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.85,
  },
});
