import React from "react";
import s from "./style.module.scss";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { getMissingProductCount } from "../../../services/api";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      admin: null,
      anchorEl: null,
      count: 0,
    };
  }

  componentDidMount() {
    this.setState({
      admin: sessionStorage.getItem("moda_admin"),
      username: sessionStorage.getItem("moda_username"),
    });
    this.handleGetAsins();
  }

  handleGetAsins = async () => {
    try {
      const response = await getMissingProductCount();

      if (response)
        this.setState({
          count: response,
        });
    } catch (error) {
      console.log("ImportProducts -> handleSubmit -> error", error);
    }
  };
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = (path) => {
    this.setState({ anchorEl: null });
    if (path) this.props.history.push(path);
  };

  logout = () => {
    sessionStorage.clear();
    window.location.reload();
  };
  render() {
    const { count } = this.state;
    return (
      <div className={s.navWrapper}>
        <Grid container>
          <Grid item xs={2} className={s.titleGrid}>
            <img
              alt=""
              onClick={() => (window.location.pathname = "/")}
              src="/img/logo.png"
              className={s.logo}
            />
          </Grid>
          <Grid item className={s.titleGrid}>
            <Link to="/" style={{ textDecoration: "none" }}>
              {" "}
              <p className={s.pageTitle}>Analytics Portal</p>
            </Link>
          </Grid>
        </Grid>
        {this.state.username ? (
          <div>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={this.handleClick}
              className={s.userName}
            >
              {this.state.username}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={this.state.anchorEl}
              keepMounted
              open={Boolean(this.state.anchorEl)}
              onClose={this.handleClose}
            >
              {this.state.admin === "true" ? (
                <MenuItem onClick={() => this.handleClose("/manage-users")}>
                  Manage Users
                </MenuItem>
              ) : (
                ""
              )}
              {this.state.admin === "true" ? (
                <MenuItem onClick={this.handleClose}>Manage Brands</MenuItem>
              ) : (
                ""
              )}
              {this.state.admin === "true" ? (
                <MenuItem onClick={this.handleClose}>Manage Products</MenuItem>
              ) : (
                ""
              )}
              {this.state.admin === "true" ? (
                <MenuItem onClick={() => this.handleClose("/import")}>
                  Missing Products({count || 0})
                </MenuItem>
              ) : (
                ""
              )}
              <MenuItem onClick={this.logout}>Logout</MenuItem>
            </Menu>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default withRouter(Navbar);
