import React from "react";
import s from "./style.module.scss";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { getMissingProductCount } from "../../../services/api"

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
      const count = await getMissingProductCount();
      this.setState({ count });
    } catch (error) {
      console.log("ImportProducts -> handleGetAsins -> error", error);
    }
  };
  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleImport = () => this.props.history.push("/import");
  render() {
    const { count } = this.state;
    return <>
      <div className={s.navWrapper}>
        {this.state.username ? (
          <div>
            <p
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={this.handleClick}
              className={s.userName}
              style={{ backgroundColor: 'transparent', fontSize: '13px', textDecoration: 'underline' }}
            >
              {this.state.username.toUpperCase()}
            </p>
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
                  Missing Products({count || 0})
                </MenuItem>
              ) : (
                  ""
                )}
            </Menu>
          </div>
        ) : (
            ""
          )}
      </div>
    </>
  }
}

export default withRouter(Navbar);
