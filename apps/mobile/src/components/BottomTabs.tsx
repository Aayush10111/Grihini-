import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors } from "../theme/colors";

type BottomTabsProps = {
  tabs: Array<{ key: string; label: string }>;
  activeTab: string;
  onChange: (key: string) => void;
};

export function BottomTabs({ tabs, activeTab, onChange }: BottomTabsProps) {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeTab;
        return (
          <Pressable
            key={tab.key}
            onPress={() => onChange(tab.key)}
            style={[styles.tab, isActive && styles.activeTab]}
          >
            <Text style={[styles.tabLabel, isActive && styles.activeLabel]}>{tab.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
    paddingHorizontal: 8,
    paddingVertical: 10,
  },
  tab: {
    flex: 1,
    minHeight: 42,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTab: {
    backgroundColor: colors.surfaceTint,
  },
  tabLabel: {
    fontSize: 13,
    color: colors.secondaryText,
    fontWeight: "600",
  },
  activeLabel: {
    color: colors.primaryBurgundy,
    fontWeight: "800",
  },
});
