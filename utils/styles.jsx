import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  navbar: {
    position: "fixed",
    top: "0",
    backgroundColor: "#fff",
    borderBottomWidth: "7",
    borderBottomStyle: "solid",
    borderBottomColor: "#e72a26",
    "& a": {
      color: "#203040",
      marginLeft: 10,
    },
  },

  brand: {
    fontWeight: "bold",
    fontSize: "1.5rem",
  },
  grow: {
    flexGrow: 1,
  },
  main: {
    minHeight: "80vh",
    marginTop: 80,
  },
  footer: {
    textAlign: "center",
    marginTop: 10,
    backgroundColor: "#fff",
    color: "#203040",
  },
  section: {
    marginTop: 10,
    marginBottom: 10,
  },
  form: {
    maxWidth: 800,
    margin: "0 auto",
  },
  navbarButton: {
    color: "#203040",
    textTransform: "initial",
  },
  transparentBackground: {
    backgroundColor: "transparent",
  },
  error: {
    color: "#f04040",
  },
});
export default useStyles;
