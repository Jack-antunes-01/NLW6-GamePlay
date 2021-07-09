import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  iconWrapper: {
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 1,
    borderColor: theme.colors.line,
  },
  container: {
    width: "100%",
    height: 56,
    backgroundColor: theme.colors.primary,
    flexDirection: "row",
    borderRadius: 8,
    alignItems: "center",
  },
  title: {
    flex: 1,
    color: theme.colors.heading,
    fontSize: 15,
    textAlign: "center",
  },
  icon: {
    width: 24,
    height: 18,
  },
});
