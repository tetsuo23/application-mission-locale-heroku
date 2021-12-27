import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import jeune_dynamique from './../assets/jeune_dynamique.png';
import AuthService from "../services/auth.service";
import {  Redirect } from 'react-router-dom';

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Champ obligatoire !
      </div>
    );
  }
};

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      nom: "",
      prenom: "",
      password: "",
      telephone:"",
      adresse:"",
      datedenaissance:"",
      loading: false,
      message: "",
      connect: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      nom: e.target.value
    });
  }

  onChangePrenom(e) {
    this.setState({
      prenom: e.target.value
    });
  }
  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleLogin(e) {
    e.preventDefault();

    this.setState({
      message: "",
      loading: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.login(this.state.nom, this.state.prenom, this.state.password, this.state.telephone, this.state.datedenaissance, this.state.adresse).then(
        () => {
          this.props.history.push(`/${this.state.prenom}/profile`);
          window.location.reload();
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          this.setState({
            loading: false,
            message: resMessage
          });
        }
      );
    } else {
      this.setState({
        loading: false
      });
    }
  }

  render() {
    if (this.state.connect) {
      return <Redirect to={`espace-personnel/${this.state.prenom}`}></Redirect>
  };
    return (
      <div className="col-md-12"  style={{ backgroundImage:`url(${jeune_dynamique})`, backgroundSize:'cover', height:'100vh', overflowY:'hidden' }}>
        <div className="card card-container orange2">
          <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          />

          <Form
            onSubmit={this.handleLogin}
            ref={c => {
              this.form = c;
            }}
          >
            <div className="form-group">
              <label htmlFor="nom">Nom</label>
              <Input
                type="text"
                className="form-control"
                name="nom"
                value={this.state.nom}
                onChange={this.onChangeUsername}
                validations={[required]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="prenom">Prénom</label>
              <Input
                type="text"
                className="form-control"
                name="prenom"
                value={this.state.prenom}
                onChange={this.onChangePrenom}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                className="form-control"
                name="password"
                value={this.state.password}
                onChange={this.onChangePassword}
                validations={[required]}
              />
            </div>

            <div className="form-group">
              <button
                className="btn btn-primary btn-block"
                disabled={this.state.loading}
              >
                {this.state.loading && (
                  <span className="spinner-border spinner-border-sm"></span>
                )}
                <span>Login</span>
              </button>
            </div>

            {this.state.message && (
              <div className="form-group">
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}
