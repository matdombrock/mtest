import React from "react";
import s from "./style.module.scss";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      admin: null,
      anchorEl: null,
    };
  }

  componentDidMount() {
    this.setState({
      admin: sessionStorage.getItem("moda_admin"),
      username: sessionStorage.getItem("moda_username"),
    });
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  logout = () => {
    sessionStorage.clear();
    window.location.reload();
  };
  handleImport = () => this.props.history.push("/import");
  render() {
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
                <MenuItem
                  onClick={() => (window.location.pathname = "/manage-users")}
                >
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
                <MenuItem onClick={this.handleImport}>
                  Missing Products(x)
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
