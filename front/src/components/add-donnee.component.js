import React, { Component } from "react";
import PostDataService from "../services/post.service";
import AuthService from "../services/auth.service";

export default class AddDonnee extends Component {
  constructor(props) {
    super(props);
    this.onChangemois = this.onChangemois.bind(this);
    this.onChangevaleur = this.onChangevaleur.bind(this);

    this.onChangecategorie = this.onChangecategorie.bind(this);
    this.saveDonnee = this.saveDonnee.bind(this);
    this.newDonnee = this.newDonnee.bind(this);

    this.state = {
      id: "",
      mois: "",
      moisUser: "",
      valeur: "1",
      userId:'',
      categorie: "mobilite",
      published: false,
      currentUser: { nom: "", prenom: "", telephone: "", datedenaissance: "", adresse: "", email: "", password: "", id: "", accessToken: "", categorie: "", mois: "", valeur: "" },
      submitted: false
    };
  }
  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    let date = new Date();
    // let date2 = (new Date().getMonth() - 1); // 2020-06-21
    // let mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    let longMonth = date.toLocaleString('fr-fr', { month: 'long' });
    // let beforeMonth = mois[date2];

    if (!currentUser) this.setState({ redirect: "/home" });
    this.setState({ currentUser: currentUser, userReady: true, mois:longMonth })
  }

  onChangemois(e) {
    this.setState({
      mois: e.target.value
    });
  }

  onChangevaleur(e) {
    this.setState({
      valeur: e.target.value
    });
  }

  onChangecategorie(e) {
    this.setState({
      categorie: e.target.value
    });
  }

  handleChangeMonth = (e) => {
    const isShow = !this.state.isShow
    // const mois = this.state.mois
    this.setState({ isShow, mois:e.target.value })
  }
  saveDonnee() {
    const user = { ...this.state.currentUser }
    var data = {
      mois: this.state.mois,
      valeur: this.state.valeur,
      userId: user.prenom,
      categorie: this.state.categorie
    };

    PostDataService.create(data)
      .then(response => {
        this.setState({
          userId: response.data.userId,
          mois: response.data.mois,
          valeur: response.data.valeur,
          published: response.data.published,
          categorie: response.data.categorieId,
          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newDonnee() {
    const user = { ...this.state.currentUser }

    this.setState({
      id: null,
      
      valeur: "1",
      categorie: "mobilite",
      published: false,
      submitted: false,

    });
  }

  render() {
    // const { currentUser } = this.state;

    let date = new Date();
    let date2 = (new Date().getMonth() - 1); // 2020-06-21
    let mois = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
    let longMonth = date.toLocaleString('fr-fr', { month: 'long' });
    let beforeMonth = mois[date2];

    return (

      <div className="submit-form">

        {this.state.submitted ? (
          <div>
            <h4>Les données ont bien été enregistrées!</h4>
            <button className="btn btn-success" onClick={this.newDonnee}>
              Add
            </button>
          </div>
        ) : (
          <div>
            {this.state.isShow ? (
              <div style={{ marginTop: '2%' }}>
                <span>
                  <h3>Actualisation pour la période de : <br /> <strong>{beforeMonth}</strong></h3>
                </span>
                <span >
                  Selectionnez le mois actuel : &nbsp;
                </span>
                <button onClick={this.handleChangeMonth} value={longMonth} onChange={this.onChangemois} className="btn btn-success">
                  {longMonth}
                </button>
              </div>
            ) : (
              <div style={{ marginTop: '2%' }}>
                <span>
                  <h3>Actualisation pour la période de : <strong>{longMonth}</strong></h3>
                </span>
                <span >
                  Selectionnez le mois précédent : &nbsp;
                </span>
                <button onClick={this.handleChangeMonth}  value={beforeMonth} className="btn btn-success">
                  {beforeMonth}
                </button>
              </div>
            )}
            <div className="input-group mb-3">
              <label htmlFor="categorie">selectionnez la categorie</label>
              <select className="form-control" id="categorie" value={this.state.categorie} onChange={this.onChangecategorie}>

                <option value="mobilite" >mobilite</option>
                <option value="finance" >finance</option>
                <option value="sante" >sante</option>
                <option value="logement" >logement</option>
                <option value="emploi" >emploi</option>
                <option value="citoyennete">citoyennete</option>
              </select>
            </div>
            <div className="input-group mb-3">
              <label htmlFor="mois">selectionnez la période</label>
              <select className="form-control" id="mois" value={this.props.moisBef} onChange={this.onChangemois}>
                {this.props.isShow ? (
                  <option value="Janvier" > {this.props.moisBef}</option>) : (<option value="Janvier" >{this.props.moisAct}</option>)}

                {/* <option value="Fevrier" >Février</option>
                <option value="Mars" >Mars</option>
                <option value="Avril" >Avril</option>
                <option value="Mai" >Mai</option>
                <option value="Juin" >Juin</option>
                <option value="Juillet" >Juillet</option>
                <option value="Août" >Août</option>
                <option value="Septembre" >Septembre</option>
                <option value="Octobre" >Octobre</option>
                <option value="Novembre" >Novembre</option>
                <option value="Décembre" >Décembre</option> */}
              </select>
            </div>
            <div className="input-group mb-3">
              <label htmlFor="mois">selectionnez la valeur</label>
              <select className="form-control" id="valeur" value={this.state.valeur} onChange={this.onChangevaleur}>

                <option value="1" >1</option>
                <option value="2" >2</option>
                <option value="3" >3</option>
                <option value="4" >4</option>
                <option value="5" >5</option>
              </select>
            </div>
            <button onClick={this.saveDonnee} className="btn btn-success">
              Envoyer
            </button>
          </div>
        )}
      </div>
    );
  }
}
