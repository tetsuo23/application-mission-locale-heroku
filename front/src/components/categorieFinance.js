import React, { Component } from 'react'
import NavBeneficiaire from './NavBeneficiaire'


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DynamicCharts from './chartsJS'


import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";


import AddDonnee from './add-donnee.component';






class Finance extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: null,
            mois: "",
            categorie: 'Finance',
            moisUser:'',
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

    onChangeMois(e) {
        this.setState({
            moisUser: e.target.value
        });
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
                            <h2>Catégorie  {this.state.categorie} de {currentUser.nom} {currentUser.prenom} </h2>
                            <div className="d-flex  d-none d-md-block">
                                <FontAwesomeIcon
                                    icon="wrench"
                                    id='icones'
                                />
                            </div>
                        </div>
                        <div className="row d-flex justify-content-between">
                        <div className="col-6">
                                <div>

                                    
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-8 ">
                                
                                <div style={{ border: '1px solid black', backgroundColor: 'white', margin: '2% 0 2% 0' }}>
                                    <DynamicCharts />
                                </div>
                                {/* <Line
                                        data={chartData}
                                        options={{
                                            responsive: true,
                                            Mois: { text: "THICCNESS SCALE", display: false, textAlign: 'end' },

                                            scales: {
                                                yAxes: [{
                                                    ticks: {
                                                        beginAtZero: true
                                                    }
                                                }
                                                ]
                                            }
                                        }}
                                    />  */}

                            </div>
                            {/* <div className=" col-4" style={{ padding: '0 2% 0 2%' }}>

                                    <div className="col-12 d-flex justify-content-center" style={{ padding: '2% 0 5% 0' }}>
                                        <strong>Question n°21</strong>
                                    </div>

                                    <div className="row">
                                        <div className="col-3">
                                            <p>01/09</p>
                                        </div>
                                        <div className="col-9 d-flex justify-content-end">
                                             <input type="number" onChange={this.handleChange} value={this.state.chartData.datasets.data} /> 
                                        </div>

                                        <div className="col-3">
                                            <p>07/09</p>
                                        </div>
                                        <div className="col-9 d-flex justify-content-end">
                                            <input type="number" onChange={this.handleChange2} value={this.data} />
                                        </div>

                                        <div className="col-3">
                                            <p>15/09</p>
                                        </div>
                                        <div className="col-9 d-flex justify-content-end">
                                            <input type="number" onChange={this.handleChange3} value={this.data} />
                                        </div>

                                        <div className="col-3">
                                            <p>22/09</p>
                                        </div>
                                        <div className="col-9 d-flex justify-content-end">
                                            <input type="number" onChange={this.handleChange4} value={this.data} />
                                        </div>


                                        <div className="col-3">
                                            <p>31/09</p>
                                        </div>
                                        <div className="col-9 d-flex justify-content-end">
                                            <input type="number" onChange={this.handleChange5} value={this.data} />
                                        </div>

                                    </div>
                                    <div className="col-12 d-flex justify-content-center" style={{ padding: '2% 0 5% 0' }}>
                                        <strong>Question n°22</strong>
                                    </div>

                                    <div className="row">


                                        <div className="col-3">
                                            <p>01/09</p>
                                        </div>
                                        <div className="col-9 d-flex justify-content-end">
                                             <input type="number" onChange={this.handleChange6} value={this.state.chartData.datasets.data} /> 
                                        </div>

                                        <div className="col-3">
                                            <p>07/09</p>
                                        </div>
                                        <div className="col-9 d-flex justify-content-end">
                                            <input type="number" onChange={this.handleChange2} value={this.data} />
                                        </div>

                                        <div className="col-3">
                                            <p>15/09</p>
                                        </div>
                                        <div className="col-9 d-flex justify-content-end">
                                            <input type="number" onChange={this.handleChange3} value={this.data} />
                                        </div>

                                        <div className="col-3">
                                            <p>22/09</p>
                                        </div>
                                        <div className="col-9 d-flex justify-content-end">
                                            <input type="number" onChange={this.handleChange4} value={this.data} />
                                        </div>


                                        <div className="col-3">
                                            <p>31/09</p>
                                        </div>
                                        <div className="col-9 d-flex justify-content-end">
                                            <input type="number" onChange={this.handleChange5} value={this.data} />
                                        </div>
                                    </div>
                                </div> */}



                            {/* <div className="col-sm-6 bleu conteneur">
                                <div className="row d-flex justify-content-between align-items-center ">
                                    <h4>
                                        <strong style={{ display: "flex", justifyContent: "center" }}>Mettre à jour vos informations</strong>
                                    </h4>

                                    <div className="row">
                                        <div className='col-12'>
                                            <ul href="/beneficiaire-logement" className=''><p>
                                                <strong>
                                                    <div className="row d-flex justify-content-between">
                                                        <li className='col-10'>21. Mes atouts liés à la recherche d'emploi</li>
                                                        <button onClick={this.handleClick} className='col-2'>MaJ</button>
                                                        
                                                    </div>
                                                    <div className="row d-flex justify-content-between">
                                                        <li className='col-10'>22. Mes atouts pour accéder à un emploi</li>
                                                        <button onClick={this.handleClick2} className='col-2'>MaJ</button>
                                                        
                                                    </div>
                                                    <div className="row d-flex justify-content-between">
                                                        <li className='col-10'>23. Mon expérience professionnelle</li>
                                                        <button onClick={this.handleClick3} className='col-2'>MaJ</button>
                                                        
                                                    </div>
                                                    <div className="row d-flex justify-content-between">
                                                        <li className='col-10'>24. Quelle est la durée de mon dernier contrat de travail ?</li>
                                                        <button onClick={this.handleClick4} className='col-2'>MaJ</button>
                                                        
                                                    </div>
                                                    <div className="row d-flex justify-content-between">
                                                        <li className='col-10'>25. Les démarches que j'entreprends pour trouver un emploi</li>
                                                        <button onClick={this.handleClick5} className='col-2'>MaJ</button>
                                                        
                                                    </div>
                                                    <div className="row d-flex justify-content-between">
                                                        <li className='col-10'>26. Ma dernière démarche remonte à :</li>
                                                        <button onClick={this.handleClick6} className='col-2'>MaJ</button>
                                                        
                                                    </div>
                                                </strong>
                                            </p>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div> */}



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

export default Finance
