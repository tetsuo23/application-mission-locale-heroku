import React, { Component, Fragment } from 'react';
import NavReferent from './NavReferent';
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import AuthService from "../services/auth.service";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'

class BoardReferent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            currentUser: { nom: "" }
        }
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
            <Fragment>

                <div className="row">
                <div className="col-1">
                    <NavReferent />
                </div>
                <div className="container-fluid conteneur col-12 col-xl-11"><h2>Bienvenue <strong>{currentUser.nom}</strong> </h2>
                    <div className="row d-flex justify-content-between" style={{ padding: '2% 10%' }} >
                        <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center categories orange" style={{ margin: '10px' }}>
                            <div className="" style={{ padding: '10%' }}>
                                <Link to='/beneficiaire-mobilite' style={{ textDecoration: 'none' }}>
                                    <div className="col-12 d-flex justify-content-center">
                                        <h3>Mobilité</h3>
                                    </div>
                                </Link>
                                <Link to='/beneficiaire-mobilite' style={{ textDecoration: 'none' }}>
                                    <div className="col-12">
                                        <div className="d-flex justify-content-center">
                                            <FontAwesomeIcon
                                                icon="car"
                                                // size='6x'
                                                className='icones'
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center categories violet" style={{ margin: '10px' }}>
                            <div className="" style={{ padding: '10%' }}>
                                <Link to='/beneficiaire-mobilite' style={{ textDecoration: 'none' }}>
                                    <div className="col-12 d-flex justify-content-center">
                                        <h3>Logement</h3>
                                    </div>
                                </Link>
                                <Link to='/beneficiaire-logement' style={{ textDecoration: 'none' }}>
                                    <div className="col-12">
                                        <div className="d-flex justify-content-center">
                                            <FontAwesomeIcon
                                                icon="home"
                                                // size='6x'
                                                className='icones'
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center categories vert" style={{ margin: '10px' }}>
                            <div className="" style={{ padding: '10%' }}>
                                <Link to='/beneficiaire-finance' style={{ textDecoration: 'none' }}>
                                    <div className="col-12 d-flex justify-content-center">
                                        <h3>Finance</h3>
                                    </div>
                                </Link>
                                <Link to='/beneficiaire-finance' style={{ textDecoration: 'none' }}>
                                    <div className="col-12">
                                        <div className="d-flex justify-content-center">
                                            <FontAwesomeIcon
                                                icon="euro-sign"
                                                // size='6x'
                                                className='icones'
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </div>



                        </div>

                        <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center categories bleu" style={{ margin: '10px' }}>
                            <div className="" style={{ padding: '10%' }}>
                                <Link to='/beneficiaire-formation-emploi' style={{ textDecoration: 'none' }}>
                                    <div className="col-12 d-flex justify-content-center">
                                        <h3>Formation <br /> Emploi</h3>
                                    </div>
                                </Link>
                                <Link to='/beneficiaire-formation-emploi' style={{ textDecoration: 'none' }}>
                                    <div className="col-12">
                                        <div className="d-flex justify-content-center">
                                            <FontAwesomeIcon
                                                icon="wrench"
                                                // size='6x'
                                                className='icones'
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </div>



                        </div>
                        <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center categories jaune" style={{ margin: '10px' }}>
                            <div className="" style={{ padding: '10%' }}>
                                <Link to='/beneficiaire-citoyennete' style={{ textDecoration: 'none' }}>
                                    <div className="col-12 d-flex justify-content-center">
                                        <h3>Citoyenneté</h3>
                                    </div>
                                </Link>
                                <Link to='/beneficiaire-citoyennete' style={{ textDecoration: 'none' }}>
                                    <div className="col-12">
                                        <div className="d-flex justify-content-center">
                                            <FontAwesomeIcon
                                                icon="handshake"
                                                // size='6x'
                                                className='icones'
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </div>



                        </div>
                        <div className="col-12 col-md-5 col-lg-3 d-flex justify-content-center categories rose" style={{ margin: '10px' }}>
                            <div className="" style={{ padding: '10%' }}>
                                <Link to='/beneficiaire-sante' style={{ textDecoration: 'none' }}>
                                    <div className="col-12 d-flex justify-content-center">
                                        <h3>Santé</h3>
                                    </div>
                                </Link>
                                <Link to='/beneficiaire-sante' style={{ textDecoration: 'none' }}>
                                    <div className="col-12">
                                        <div className="d-flex justify-content-center">
                                            <FontAwesomeIcon
                                                icon="heart"
                                                // size='6x'
                                                className='icones'
                                            />
                                        </div>
                                    </div>
                                </Link>
                            </div>



                        </div>
                    </div>
                </div>
                </div>
            </Fragment>
        );
    }
}

export default BoardReferent;