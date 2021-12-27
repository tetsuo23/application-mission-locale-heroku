import React, { Component } from "react";
import { Nav, NavDropdown } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AuthService from "./../services/auth.service";
import EventBus from "./../common/EventBus";

import { Link } from "react-router-dom";

class NavBeneficiaire extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showReferentBoard: user.roles.includes("REFERENT"),
        showAdminBoard: user.roles.includes("ADMIN"),
        showBeneficiaireBoard: user.roles.includes("BENEFICIAIRE"),
      });
    }

    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      currentUser: undefined,
    });
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <Nav
          defaultActiveKey="/home"
          className="flex-column bleu navVert d-none d-xl-block"
          style={{ height: "100vh", padding: "10vh 0 0 2%" }}
        >
          <div className="navbar-nav ml-auto d-flex ">
            {currentUser && (
              <Link
                to={`/${this.state.currentUser.prenom}/beneficiaire`}
                className=""
              >
                Tableau de bord
              </Link>
            )}
          </div>

          <NavDropdown.Divider />
          <div className="navbar-nav ml-auto d-flex ">
            {currentUser && (
              <Link
                to={`/${this.state.currentUser.prenom}/profile`}
                className=""
              >
                Profil
              </Link>
            )}
          </div>
          <NavDropdown.Divider />
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            {currentUser && (
              <div>
                <Link
                  to={`/${this.state.currentUser.prenom}/logement`}
                  className="d-flex justify-content-between align-items-center"
                >
                  Logement{" "}
                  <FontAwesomeIcon
                    icon="home"
                    size="1x"
                    className="icones-small"
                  />
                </Link>
                <Link
                  to={`/${this.state.currentUser.prenom}/mobilite`}
                  className="d-flex justify-content-between align-items-center"
                >
                  Mobilité{" "}
                  <FontAwesomeIcon
                    icon="car"
                    size="1x"
                    className="icones-small"
                  />
                </Link>
                <Link
                  to={`/${this.state.currentUser.prenom}/logement`}
                  className="d-flex justify-content-between align-items-center"
                >
                  Emploi/formation{" "}
                  <FontAwesomeIcon
                    icon="wrench"
                    size="1x"
                    className="icones-small"
                  />
                </Link>
                <Link
                  to={`/${this.state.currentUser.prenom}/logement`}
                  className="d-flex justify-content-between align-items-center"
                >
                  Finance{" "}
                  <FontAwesomeIcon
                    icon="euro-sign"
                    size="1x"
                    className="icones-small"
                  />
                </Link>
                <Link
                  to={`/${this.state.currentUser.prenom}/logement`}
                  className="d-flex justify-content-between align-items-center"
                >
                  Citoyenneté{" "}
                  <FontAwesomeIcon
                    icon="handshake"
                    size="1x"
                    className="icones-small"
                  />
                </Link>
                <Link
                  to={`/${this.state.currentUser.prenom}/logement`}
                  className="d-flex justify-content-between align-items-center"
                >
                  Santé{" "}
                  <FontAwesomeIcon
                    icon="heart"
                    size="1x"
                    className="icones-small"
                  />
                </Link>
              </div>
            )}
          </NavDropdown>
        </Nav>
      </div>
    );
  }
}
export default NavBeneficiaire;
