import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import jeune from './../assets/jeune.jpg'
import { Link } from 'react-router-dom'

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Champ obligatoire !
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Format d'email invalide.
      </div>
    );
  }
};

const vnom = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        Le nom doit contenir entre 3 et 20 caractères.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 8) {
    return (
      <div className="alert alert-danger" role="alert">
        Le mot de passe doit contenir entre 6 et 8 caractères.
      </div>
    );
  }
};
const vprenom = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        L'Email doit contenir entre 3 et 20 caractères.
      </div>
    );
  }
};
const vtelephone = value => {
  if (value.length < 10 || value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert">
        Le numero de téléphone doit contenir 10 caractères.
      </div>
    );
  }
};
const vdatedenaissance = value => {
  if (value.length < 10 || value.length > 10) {
    return (
      <div className="alert alert-danger" role="alert">
        La date de naissance doit contenir 10 caractères (01/02/2021).
      </div>
    );
  }
};
const vadresse = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        L'adresse doit contenir au maximum 40 caractères.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeDatedenaissance = this.onChangeDatedenaissance.bind(this);
    this.onChangeAdresse = this.onChangeAdresse.bind(this);
    this.onChangePrenom = this.onChangePrenom.bind(this);
    this.onChangeTelephone = this.onChangeTelephone.bind(this);

    this.state = {
      nom: "",
      prenom: '',
      telephone: '',
      datedenaissance: '',
      adresse: '',
      email: "",
      password: "",



      successful: false,
      message: "",
      identifiant: '',
      connect: false
    };
  }

  onChangeUsername(e) {
    this.setState({
      nom: e.target.value
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  onChangePrenom(e) {
    this.setState({
      prenom: e.target.value
    });
  }

  onChangeTelephone(e) {
    this.setState({
      telephone: e.target.value
    });
  }

  onChangeAdresse(e) {
    this.setState({
      adresse: e.target.value
    });
  }

  onChangeDatedenaissance(e) {
    this.setState({
      datedenaissance: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false,
      connect: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.nom,
        this.state.prenom,
        this.state.telephone,
        this.state.datedenaissance,
        this.state.adresse,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });
        },
        () => {
          this.props.history.push(`/${this.state.prenom}/premier-formulaire`);
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
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {

    // const { currentUser } = this.state;

    return (
      <div className="col-md-12 " style={{ backgroundImage: `url(${jeune})`, backgroundSize: 'cover', height: '100vh' }}>

        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_1x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form style={{ padding: '2% 5% 2% 5%', marginTop: '5%' }} className='orange2 col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2'
          onSubmit={this.handleRegister}
          ref={c => {
            this.form = c;
          }}
        >
          {!this.state.successful && (
            <div>
              <div className="row">
                <div className="form-group col-6">
                  <label htmlFor="nom">Nom</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="nom"
                    value={this.state.nom}
                    onChange={this.onChangeUsername}
                    validations={[required, vnom]}
                  />
                </div>
                <div className="form-group col-6">
                  <label htmlFor="prenom">Prénom</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="prenom"
                    value={this.state.prenom}
                    onChange={this.onChangePrenom}
                    validations={[required, vprenom]}
                  />
                </div>
              </div>

              <div className="row">
                <div className="form-group col-12 col-sm-6">
                  <label htmlFor="telephone">Téléphone</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="telephone"
                    value={this.state.telephone}
                    onChange={this.onChangeTelephone}
                    validations={[required, vtelephone]}
                  />
                </div>

                <div className="form-group col-12 col-sm-6">
                  <label htmlFor="datedenaissance">Date de naissance</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="datedenaissance"
                    value={this.state.datedenaissance}
                    onChange={this.onChangeDatedenaissance}
                    validations={[required, vdatedenaissance]}
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="adresse">Adresse</label>
                <Input
                  type="text"
                  className="form-control"
                  name="adresse"
                  value={this.state.adresse}
                  onChange={this.onChangeAdresse}
                  validations={[required, vadresse]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={this.state.email}
                  onChange={this.onChangeEmail}
                  validations={[required, email]}
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
                  validations={[required, vpassword]}
                />
              </div>

              <div className="row">
                <div className="col-12 col-sm-8 col-lg-10">
                  <button variant="primary" type="submit">
                    Inscription
                  </button>
                </div>
                <div className="col-12 col-sm-4 col-lg-2">
                  <Link to={'/connexion'} className="nav-link">Déjà inscrit ?</Link>
                </div>
              </div>
            </div>
          )}

          {this.state.message && (
            <div className="form-group">
              <div
                className={
                  this.state.successful
                    ? "alert alert-success"
                    : "alert alert-danger"
                }
                role="alert"
              >
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
    );
  }
}
