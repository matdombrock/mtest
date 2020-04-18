import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextInput from "@material-ui/core/TextField";
import s from "./style.module.scss";
import { fetchNonAdminUsers } from "../../../services/api";
import { actions as usersActions } from "../../../modules/users";
import Button from "@material-ui/core/Button";

class ImportProducts extends React.Component {
  constructor(props) {
    super(props);
    fetchNonAdminUsers().then((res) => props.usersSetData(res.users));
  }

  render() {
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
                  <input type="file" style={{ display: "none" }} />
                </Button>
              </div>
            </Grid>
            <Grid item xs={6} className={s.container}>
              <div className={s.userGridInner}>
                <Button onClick={null} variant="contained" color="primary">
                  Upload
                </Button>
              </div>
            </Grid>
          </Grid>
        </Card>
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
