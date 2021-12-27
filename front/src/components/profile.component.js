import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../services/auth.service";
import jeune from './../assets/jeune.jpg'

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.handleLogin = this.handleLogin.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { nom: "", prenom: "", telephone: "", datedenaissance: "", adresse: "", email: "", password: "" },
      successful: false,
      message: "",
      identifiant: '',
      connect: false,
      datedenaissance: '', 
      adresse: '',
      email: "",
      nom: "",
      prenom: "",
      telephone: ""
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true })
  }
  onChangeUsername(Event) {
    const currentUser = { ...this.state.currentUser }
    const nom = Event.target.value
    currentUser.nom = nom

    this.setState({

      currentUser
    });
  }
  // handleMaj(e) {
  //   e.preventDefault();
  //   console.log(e)
  //   this.setState({
  //     message: "",
  //     successful: false,
  //     connect: true
  //   });
  // }
  // handleMaj(e) {
  //   e.preventDefault();

  //   const state = { ...this.state }
  //   const data = e.target.value
  //   state.prenom = data
  //   this.setState({
  //     message: "",
  //     successful: false,
  //     connect: true,
  //     state
  //   });
  // }
  handleLogin(e) {
    e.preventDefault();
    this.setState({
      message: "",
      successful: false,
      connect: true
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.update(
        this.state.nom,
        this.state.prenom,
        this.state.telephone,
        this.state.datedenaissance,
        this.state.adresse,
        this.state.email).then(
          response => {
            this.setState({
              message: response.data.message,
              successful: true
            });
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
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div className="conteneur fluid" style={{ backgroundImage: `url(${jeune})`, backgroundSize: 'cover', height: '100vh' }}>
        {(this.state.userReady) ?
          <div>
            <header className=" d-flex justify-content-between" style={{ padding: '2% 5% 2% 5%', backgroundColor:'#dededeaa' }}>
              <h3>
                Bienvenue <strong>{currentUser.prenom} {currentUser.nom} </strong>
              </h3>
              <div>
                <strong>Status:</strong>{currentUser.roles &&
                    currentUser.roles.map((role, index) => <li key={index}><strong>{role}</strong></li>)}
                <ul>
                  
                </ul>
              </div>
            </header>
            <div className="row">
              <div className="col-12 d-flex justify-content-center">
                <h3>Vos informations personnelles</h3>
              </div>
            </div>
            {/* <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p> */}

          </div> : null}

        <Form
          onSubmit={this.handleLogin}
          ref={c => {
            this.form = c;
          }}
        >

          <div className='orange conteneur'>
            <div className="row">
              <div className="form-group col-6">
                <label htmlFor="nom">Nom</label>
                <Input
                  type="text"
                  className="form-control"
                  name="nom"
                  value={currentUser.nom}
                  onChange={this.onChangeUsername}
                  validations={[]}
                />
              </div>
              <div className="form-group col-6">
                <label htmlFor="prenom">Prénom</label>
                <Input
                  type="text"
                  className="form-control"
                  name="prenom"
                  value={currentUser.prenom}
                  onChange={this.onChangePrenom}
                  validations={[]}
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
                  value={currentUser.telephone}
                  onChange={this.onChangeTelephone}
                  validations={[]}
                />
              </div>

              <div className="form-group col-12 col-sm-6">

                <label htmlFor="datedenaissance">Date de naissance</label>
                <Input
                  type="text"
                  className="form-control"
                  name="datedenaissance"
                  value={currentUser.datedenaissance}
                  onChange={this.onChangeDatedenaissance}
                  validations={[]}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="adresse">Adresse</label>
              <Input
                type="text"
                className="form-control"
                name="adresse"
                value={currentUser.adresse}
                onChange={this.onChangeAdresse}
                validations={[]}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Input
                type="text"
                className="form-control"
                name="email"
                value={currentUser.email}
                onChange={this.onChangeEmail}
                validations={[]}
              />
            </div>
            <div className="form-group">
              <button variant="primary" type="submit" className='button'
              >Mettre à jour</button>
            </div>
          </div>


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
