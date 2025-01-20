import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "slate",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "yellow",
  },
  textinput: {
    height: 40,
    marginTop: 10,
    borderWidth: 1,
    padding: 10,
    width: 300,
  },
  forminput: {
    margin: 12,
    width: 300,
  },
  down: {
    marginTop: "auto",
    alignSelf: "flex-end",
  },
  containerVertical: {
    gap: 10,
    marginVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
});

export const shopStyle = StyleSheet.create({
  itemContainer: {
    width: 170,
    height: 220,
    backgroundColor: "#ddddee",
    margin: 10,
    display: "flex",
    justifyContent: "flex-start",
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  itemsContainer: {
    width: "98%",
  },
  tinyLogo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
});

export const contadorStyles = StyleSheet.create({
  saldoContainer: {
    ...styles.containerVertical,
    backgroundColor: "#559",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
  },
});
