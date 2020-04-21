import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextInput from "@material-ui/core/TextField";
import s from "./style.module.scss";
import { fetchNonAdminUsers, uploadProduct } from "../../../services/api";
import { actions as usersActions } from "../../../modules/users";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";

class ImportProducts extends React.Component {
  constructor(props) {
    super(props);
    fetchNonAdminUsers().then((res) => props.usersSetData(res.users));
    this.state = {
      file: null,
      alert: {
        message: "",
        type: "",
        isShown: false,
      },
    };
  }
  handleSubmit = async () => {
    try {
      const { file } = this.state;
      if (file) {
        this._handleAlert(true, "please wait", "warning");
        const payload = new FormData();
        payload.append("products_file", file[0]);
        await uploadProduct(payload);
        this._handleAlert(true, "Successfully Uploaded", "success");
      }
    } catch (error) {
      this._handleAlert(true, "Something went wrong", "error");
      console.log("ImportProducts -> handleSubmit -> error", error);
    }
  };
  _handleChangeFile = (e) => this.setState({ file: e.currentTarget.files });
  _handleAlert = (toggle, message = "", type = "success") =>
    this.setState((pre) => ({
      alert: { ...pre.alert, isShown: toggle, message, type },
    }));
  render() {
    const { alert } = this.state;
    return (
      <div className={s.container}>
        <Card style={{ marginBottom: "1em" }}>
          <Grid container className={s.innerContainer}>
            <Grid className={s.container} item xs={12}>
              <p className={s.email}>Import Products</p>
            </Grid>
            <Grid item xs={6} className={s.container}>
              <div className={s.userGridInner}>
                <Button variant="contained" component="label">
                  Upload File
                  <input
                    type="file"
                    onChange={this._handleChangeFile}
                    accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                    style={{ display: "none" }}
                  />
                </Button>
              </div>
            </Grid>
            <Grid item xs={6} className={s.container}>
              <div className={s.userGridInner}>
                <Button
                  onClick={this.handleSubmit}
                  variant="contained"
                  color="primary"
                >
                  Upload
                </Button>
              </div>
            </Grid>
          </Grid>
        </Card>
        {alert.isShown && (
          <Snackbar
            open={alert.isShown}
            autoHideDuration={1000}
            onClose={(e) => this._handleAlert(false)}
          >
            <Alert
              onClose={(e) => this._handleAlert(false)}
              elevation={6}
              variant="filled"
              severity={alert.type}
            >
              {alert.message}
            </Alert>
          </Snackbar>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...usersActions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ImportProducts);