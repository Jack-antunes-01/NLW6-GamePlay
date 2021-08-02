import { StyleSheet } from "react-native";
import { theme } from "../../global/styles/theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  gradient: {
    height: 200,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: theme.colors.secondary70,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: theme.colors.heading,
    fontSize: 18,
    fontFamily: theme.fonts.title700,
  },
  text: {
    color: theme.colors.heading,
    fontSize: 13,
    fontFamily: theme.fonts.text500,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginTop: 30,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
  },
});
