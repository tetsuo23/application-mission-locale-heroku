import React, { Component } from 'react'
import NavBeneficiaire from './NavBeneficiaire'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DynamicCharts from './chartsJS'
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AddDonnee from './add-donnee.component';

class Sante extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: null,
            mois: "",
            categorie:'',
            valeur: "",
            currentUser: { prenom: "", nom: "" },
            submitted: false
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState({ currentUser: currentUser })
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }

    render() {

        const { currentUser } = this.state;

        return (
            <div>
                <div className='row'>
                    <div className=" col-1">
                        <NavBeneficiaire />
                    </div>
                    <div className="container-fluid col-11" style={{ padding: '0 2% 0 2%' }}>
                        <div className="col-6" style={{ borderBottom: '2px solid black', marginTop: '2%', display: 'flex', justifyContent: 'space-between' }}>
                            <h2>Catégorie {this.props.cat} de {currentUser.nom} {currentUser.prenom} </h2>
                            <div className="d-flex  d-none d-md-block">
                                <FontAwesomeIcon
                                    icon="wrench"                                    
                                    id='icones'
                                />
                            </div>
                        </div>
                        <div className="row d-flex justify-content-between">                    
                                <div className="col-12 col-sm-6 col-lg-8 ">
                                    <p style={{ fontWeight: '600' }}>Vos statistiques pour le mois de Septembre</p>
                                    <div  style={{ border: '1px solid black', backgroundColor: 'white', margin: '2% 0 2% 0' }}>
                                        <DynamicCharts />
                                    </div>
                                </div>
                            <div className="col-12 col-sm-6 col-lg-4">
                                <div className="submit-form">
                                    {this.state.submitted ? (
                                        <div>
                                            <h4>You submitted successfully!</h4>
                                            <button className="btn btn-success" onClick={this.newDonnees}>
                                                Add
                                            </button>
                                        </div>
                                    ) : (
                                        <div>
                                            <AddDonnee />
                                        </div>
                                    )}
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        {/* <Messagerie /> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
 
export default Sante;