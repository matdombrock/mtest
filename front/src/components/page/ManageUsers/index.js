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
import UpperControls from "../../pres/UpperControls";
import TopBanner from "../../pres/TopBanner/topBanner";

class ManageUsers extends React.Component {
  constructor(props) {
    super(props);
    fetchNonAdminUsers().then((res) => props.usersSetData(res.users));
  }

  render() {
    return (
      <>
        <TopBanner />
        <UpperControls widthOutTab title="Manage Users" />
        <div className={s.container}>
          <Card style={{ marginBottom: "1em" }}>
            <Grid container className={s.innerContainer}>
              <Grid className={s.container} item xs={12}>
                <p className={s.email}>Create User</p>
              </Grid>
              <Grid item xs={6} className={s.container}>
                <div className={s.userGridInner}>
                  <p>
                    Email: <TextInput> </TextInput>
                  </p>
                </div>
              </Grid>
              <Grid item xs={6} className={s.container}>
                <div className={s.userGridInner}>
                  <Button onClick={null} variant="contained" color="primary">
                    Create
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Card>
          <h2>Users: </h2>
          {this.props.users.length !== 0
            ? this.props.users.map((user) => (
                <Card>
                  <Grid container className={s.innerContainer}>
                    <Grid item xs={6} className={s.container}>
                      <div className={s.userGridInner}>
                        <p className={s.email}>{user.email}</p>
                      </div>
                    </Grid>
                    <Grid item xs={6} className={s.container}>
                      <div className={s.userGridInner}>
                        <Button
                          onClick={null}
                          variant="contained"
                          color="secondary"
                        >
                          Delete
                        </Button>
                      </div>
                    </Grid>
                    <Grid item xs={6} className={s.container}>
                      <div className={s.userGridInner}>
                        <p>
                          {" "}
                          <b>Associated Brands:</b>{" "}
                        </p>
                        {user.user_brands.map((brand) => (
                          <Grid container>
                            <Grid item xs={6}>
                              <p> {brand.brand.brand_name}</p>
                            </Grid>{" "}
                            <Grid item xs={6}>
                              <Button onClick={null} variant="contained">
                                Remove
                              </Button>
                            </Grid>
                          </Grid>
                        ))}
                      </div>
                    </Grid>
                    <Grid item xs={6} className={s.container}>
                      <div className={s.userGridInner}>
                        <Button onClick={null} variant="contained">
                          Add Brand
                        </Button>
                      </div>
                    </Grid>
                  </Grid>
                </Card>
              ))
            : ""}
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageUsers);
