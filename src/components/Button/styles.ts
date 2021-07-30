import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
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
    fontFamily: theme.fonts.text500,
    fontSize: 15,
    textAlign: "center",
  },
});
