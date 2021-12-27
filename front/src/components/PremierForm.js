import React, { Component } from 'react'
import jeune from './../assets/jeune.jpg'

import { Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FinanceDataService from "../services/finance.service";
import AuthService from "../services/auth.service";

export default class PremierForm extends Component {
    constructor(props) {
        super(props);
        this.onChangemois = this.onChangemois.bind(this);
        this.onChangevaleur = this.onChangevaleur.bind(this);
        this.saveFinance = this.saveFinance.bind(this);
        this.newFinance = this.newFinance.bind(this);


        this.state = {
            id: "",
            mois: "",
            valeur: "",
            currentUser: { nom: "", prenom: "", telephone: "", datedenaissance: "", adresse: "", email: "", password: "", id: "", accessToken: "", categorie: "", mois: "", valeur: "" }
        };
    }

    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        let date = new Date();
        let longMonth = date.toLocaleString('fr-fr', { month: 'long' });
        if (!currentUser) this.setState({ redirect: "/home" });
        this.setState({ currentUser: currentUser, userReady: true, mois: longMonth })


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
        console.log(this.state.valeur);
    }
    saveFinance() {
        const user = { ...this.state.currentUser }
        var data = {
            mois: 'decembre',
            valeur: this.state.valeur,
            id: user.id
        };

        FinanceDataService.create(data)
            .then(response => {
                this.setState({
                    id: response.data.id,
                    mois: response.data.mois,
                    valeur: response.data.valeur
                });
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }
    newFinance() {
        const user = { ...this.state.currentUser }

        this.setState({
            id: user.id,
            mois: "",
            valeur: ""

        });
    }

    render() {
        return (
            <div style={{ backgroundImage: `url(${jeune})`, backgroundSize: 'cover', backgroundAttachment: 'fixed' }}>

                <div className="col-md-12 ">
                    <Form style={{ padding: '2% 5% 2% 5%' }} className='col-xs-12 col-sm-10 offset-sm-1 col-md-8 offset-md-2 orange'>
                        <h2>Formulaire d'inscription &nbsp;&nbsp; </h2>
                        <p style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>Apprenons à nous connaître ...</p>
                        <Form.Group className="mb-3" id="formGridCheckbox">



                            {/* ---------------------------------------------------------------------------------------------------------------------------------------------------------------------Mobilité----------- */}
                            <div className="col-12" style={{ borderBottom: '2px solid black', marginTop: '2%', display: 'flex', justifyContent: 'space-between' }}>
                                <h2>Mobilité</h2>
                                <div className="d-flex  d-none d-md-block">
                                    <FontAwesomeIcon
                                        icon="car"
                                        size='xl'
                                        id='icones'
                                    />
                                </div>
                            </div>
                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        1. Je fais le point sur le permis de conduire.
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Une seule réponse possible.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="Je n'ai aucun permis" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 1 &nbsp; </strong><p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                                Passez à la question 2
                                            </p>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="J'ai le permis AM" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 2 &nbsp; </strong><p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                                Passez à la question 3
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="J'ai le permis B" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 3 &nbsp; </strong><p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                                Passez à la question 3
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ */}


                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        2. Je n'ai qucun permis mais...
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Une seule réponse possible.
                                </p>

                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="Je suis inscrit dans une auto-école" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 1 &nbsp; </strong><p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                                Passez à la question 3
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="J'ai commencé les leçons de conduite" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 2 &nbsp; </strong><p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                                Passez à la question 3
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="J'ai obtenu le code de la route" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 3 &nbsp; </strong><p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                                Passez à la question 3
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


                            <div className="section-checkbox" style={{ marginTop: '5%' }}>

                                <div className="section-checkbox" style={{ marginTop: '5%' }}>

                                    <p>
                                        <span>
                                            <strong>
                                                3. Je peux me déplacer d'un point à un autre
                                            </strong></span><p style={{ fontSize: '0.8rem' }}> Par exemple me rendre à un rendez-vous, aller au travail, aller chez le médecin, etc ...</p>
                                    </p>
                                    <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                        Une seule réponse possible.
                                    </p>

                                    <div className="checkboxBloc d-block d-sm-none" style={{ padding: '0 0 0 5%' }}>
                                        <div className="row">
                                            <div className="col-12 col-sm-5">
                                                <p><strong>Très difficilement</strong></p>
                                            </div>
                                            <div className="col-6">
                                                <Form.Check type="checkbox" label="1" />
                                            </div>
                                            <div className="col-6">
                                                <Form.Check type="checkbox" label="2" />
                                            </div>
                                            <div className="col-6">
                                                <Form.Check type="checkbox" label="3" />
                                            </div>
                                            <div className="col-6">
                                                <Form.Check type="checkbox" label="4" />
                                            </div>
                                            <div className="col-12 col-sm-5">
                                                <p><strong>Jamais</strong></p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="checkboxBloc d-none d-sm-block" style={{ padding: '0 0 0 5%' }}>
                                        <div className="row d-flex align-items-center" style={{ borderBottom: '2px solid black', borderTop: '2px solid black', padding: '2% 0 2% 0' }}>
                                            <div className="col-sm-4">
                                                <strong>Très difficilement</strong>
                                            </div>

                                            <div className="col-sm-1">
                                                <Form.Check type="checkbox" label="1" />
                                            </div>
                                            <div className="col-sm-1">
                                                <Form.Check type="checkbox" label="2" />
                                            </div>
                                            <div className="col-sm-1">
                                                <Form.Check type="checkbox" label="3" />
                                            </div>
                                            <div className="col-sm-1">
                                                <Form.Check type="checkbox" label="4" />
                                            </div>

                                            <div className="col-sm-4 d-flex justify-content-end" style={{ display: 'flex', alignItems: 'center' }}>
                                                <strong>Jamais</strong>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>

                            {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <span>
                                        <strong>
                                            4. Je dispose d'un moyen de locomotion.
                                        </strong></span><p style={{ fontSize: '0.8rem' }}> Par exemple me rendre à un rendez-vous, aller au travail, aller chez le médecin, etc ...</p>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Une seule réponse possible.
                                </p>

                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-7">
                                            <Form.Check type="checkbox" label="Un membre de ma famille peut me conduire à mes rendez-vous." />
                                        </div>
                                        <div className="col-12 col-sm-5 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 1 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-7">
                                            <Form.Check type="checkbox" label="J'utilise les transports en commun" />
                                        </div>
                                        <div className="col-12 col-sm-5 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 2 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-7">
                                            <Form.Check type="checkbox" label="Je pratique le co-voiturage" />
                                        </div>
                                        <div className="col-12 col-sm-5 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 3 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-7">
                                            <Form.Check type="checkbox" label="Je possède une voiture" />
                                        </div>
                                        <div className="col-12 col-sm-5 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 4 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-7">
                                            <Form.Check type="checkbox" label="Je possède un deux-roues (mobylette, scooter, moto...)" />
                                        </div>
                                        <div className="col-12 col-sm-5 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 5 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-2">
                                            <Form.Check type="checkbox" label="Autre" />
                                        </div>
                                        <div className="col-12 col-sm-10">
                                            <textarea name="" id="" rows="2" style={{ border: 'none', backgroundColor: 'white', borderBottom: '1px solid black' }}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <span>
                                        <strong>
                                            5. Je suis mobile dans un rayon de :
                                        </strong></span><p style={{ fontSize: '0.8rem' }}> Je suis mobile pour un rendez-vous, un travail, un stage, une formation, un atelier...</p>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Une seule réponse possible.
                                </p>

                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-7">
                                            <Form.Check type="checkbox" label="Je ne suis pas mobile" />
                                        </div>
                                        <div className="col-12 col-sm-5 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 1 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-7">
                                            <Form.Check type="checkbox" label="Moins de 10 km" />
                                        </div>
                                        <div className="col-12 col-sm-5 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 2 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-7">
                                            <Form.Check type="checkbox" label="De 10 à 20 km" />
                                        </div>
                                        <div className="col-12 col-sm-5 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 3 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-7">
                                            <Form.Check type="checkbox" label="De 20 à 30 km" />
                                        </div>
                                        <div className="col-12 col-sm-5 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 4 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-7">
                                            <Form.Check type="checkbox" label="De 30 à 50 km" />
                                        </div>
                                        <div className="col-12 col-sm-5 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 5 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-7">
                                            <Form.Check type="checkbox" label="Au-delà de 50 km" />
                                        </div>
                                        <div className="col-12 col-sm-5 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 6 &nbsp; </strong>
                                        </div>
                                    </div>


                                </div>
                            </div>

                            {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                            <div className="section-checkbox" style={{ marginTop: '5%' }}>

                                <div className="section-checkbox" style={{ marginTop: '5%' }}>

                                    <p>
                                        <span>
                                            <strong>
                                                6. J'ai des difficultés financières liées à mes déplacements
                                            </strong>
                                        </span>
                                    </p>
                                    <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                        Une seule réponse possible.
                                    </p>

                                    <div className="checkboxBloc d-block d-sm-none" style={{ padding: '0 0 0 5%' }}>
                                        <div className="row">
                                            <div className="col-12 col-sm-5">
                                                <p><strong>Toujours</strong></p>
                                            </div>
                                            <div className="col-4">
                                                <Form.Check type="checkbox" label="1" />
                                            </div>
                                            <div className="col-4">
                                                <Form.Check type="checkbox" label="2" />
                                            </div>
                                            <div className="col-4">
                                                <Form.Check type="checkbox" label="3" />
                                            </div>
                                            <div className="col-4">
                                                <Form.Check type="checkbox" label="4" />
                                            </div>
                                            <div className="col-4">
                                                <Form.Check type="checkbox" label="5" />
                                            </div>
                                            <div className="col-4">
                                                <Form.Check type="checkbox" label="6" />
                                            </div>
                                            <div className="col-12 col-sm-5">
                                                <p><strong>Jamais</strong></p>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="checkboxBloc d-none d-sm-block" style={{ padding: '0 0 0 5%' }}>
                                        <div className="row d-flex align-items-center" style={{ borderBottom: '2px solid black', borderTop: '2px solid black', padding: '2% 0 2% 0' }}>
                                            <div className="col-sm-3">
                                                <strong>Toujours</strong>
                                            </div>

                                            <div className="col-sm-1">
                                                <Form.Check type="checkbox" label="1" />
                                            </div>
                                            <div className="col-sm-1">
                                                <Form.Check type="checkbox" label="2" />
                                            </div>
                                            <div className="col-sm-1">
                                                <Form.Check type="checkbox" label="3" />
                                            </div>
                                            <div className="col-sm-1">
                                                <Form.Check type="checkbox" label="4" />
                                            </div>
                                            <div className="col-sm-1">
                                                <Form.Check type="checkbox" label="5" />
                                            </div>
                                            <div className="col-sm-1">
                                                <Form.Check type="checkbox" label="6" />
                                            </div>

                                            <div className="col-sm-3 d-flex justify-content-end" style={{ display: 'flex', alignItems: 'center' }}>
                                                <strong>Jamais</strong>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ----------------------------------------------------------------------------------------------------------------------- santé -------------------------------------------------------- */}

                            <div className="col-12" style={{ borderBottom: '2px solid black', marginTop: '2%', display: 'flex', justifyContent: 'space-between' }}>
                                <h2>Santé</h2>
                                <div className="d-flex  d-none d-md-block">
                                    <FontAwesomeIcon
                                        icon="heart"
                                        size='xl'
                                        id='icones'
                                    />
                                </div>
                            </div>

                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        7. Sur le plan administratif.
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Plusieures réponses possibles.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je possède une crate vitale à jour" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 4 &nbsp; </strong>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je possède une mutuelle de santé" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 3 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je suis bénéficiaire de la Couverture Maladie Universelle(CMU)" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 2 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je ne sais pas" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 1 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-1">
                                            <Form.Check type="checkbox" label="Autre" />
                                        </div>
                                        <div className="col-12 col-sm-11">
                                            <textarea name="" id="" rows="1" style={{ border: 'none', backgroundColor: 'white', borderBottom: '1px solid black' }}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>



                            {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        8. La dernière fois que je suis allé chez le medecin c'était :
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Une seule réponse possible.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Il y a plus de 3 mois" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 4 &nbsp; </strong>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Il y a plus de 6 mois" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 3 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Il y a plus d'un an " />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 2 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je ne sais plus" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 1 &nbsp; </strong>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        9. Parmi les affirmations ci-dessous, laquelle correspond le mieux à ma situation actuelle ?
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Plusieures réponses possibles.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai besoin de rencontrer un medecin pour faire un point sur ma santé de façon générale" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 4 &nbsp; </strong>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai besoin d'un rendez-vous médical car j'ai un doute sur ma santé" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 3 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai besoin d'un rendez-vous rapide car j'ai des symptômes " />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 2 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai besoin d'un rendez-vous rapide avec un médecin car j'ai eu récemment un comportement à risque " />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 1 &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je ne ressens pas le besoin de voir un medecin" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 5 &nbsp; </strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        10. Parmi la liste qui suit, quels sont les professionnels que j'ai déjà rencontrés?
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Plusieures réponses possibles.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Assistant-e social-e" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ? &nbsp; </strong>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Educateur, éducatrice" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ? &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Medecin spécialisé" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ? &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Aucun de ces professionnels" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ? &nbsp; </strong>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        11. J'ai obtenu une reconnaissance de travailleur handicapé
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Une seule réponse possible.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ? &nbsp; </strong>
                                        </div>

                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ? &nbsp; </strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je ne sais pas" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ? &nbsp; </strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------Logement------------- */}

                            <div className="col-12" style={{ borderBottom: '2px solid black', marginTop: '2%', display: 'flex', justifyContent: 'space-between' }}>
                                <h2>Logement</h2>
                                <div className="d-flex  d-none d-md-block">
                                    <FontAwesomeIcon
                                        icon="home"
                                        size='xl'
                                        id='icones'
                                    />
                                </div>
                            </div>
                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        12. Parmi les affirmations suivantes, laquelle correspond le mieux à votre situation ?
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Plusieures réponses possibles.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="Je n'ai pas de logement" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 1</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'habite en foyer" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 2</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'habite chez des amis (hors co-location, c'est à dire que je ne contribue pas au loyer)" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 3</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'habite chez un membre de ma famille " />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 4</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'habite chez mes parents" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 5</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai un logement à moi (co-location, co-propriété, avec des amis, avec un conjoint" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 6</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}

                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        13. Parmi les informations suivantes, je choisi celles qui correspondent le mieux à mes besoins.
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Plusieures réponses possibles.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai besoin d'informations sur l'accès au logement, (à qui s'adresser, quels organismes proposent des logements, quel type de logement...)" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai besoin d'informations sur les aides financières liées au logement." />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai besoin d'informations pour comprendre les règles de base liées au logement (les cautions, les adssurances,les dorits et devoirs du loactaireet du propriétaire, etc.)" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --------------------------------------------------------------------------------------------------------------------------------------------Finance------------------------------------ */}

                            <div className="col-12" style={{ borderBottom: '2px solid black', marginTop: '2%', display: 'flex', justifyContent: 'space-between' }}>
                                <h2>Finance</h2>
                                <div className="d-flex  d-none d-md-block">
                                    <FontAwesomeIcon
                                        icon="euro-sign"
                                        size='xl'
                                        id='icones'
                                    />
                                </div>
                            </div>

                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        14. J'ai des difficultés financières
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Une seule réponse possible.
                                </p>
                                {/* <div className="checkboxBloc d-block d-sm-none" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <p><strong>Très souvent</strong></p>
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="1" value={this.state.valeur} onChange={this.onChangevaleur} />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="2" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="3" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="4" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="5" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="6" />
                                        </div>
                                        <div className="col-12 col-sm-5">
                                            <p><strong>Très rarement</strong></p>
                                        </div>
                                    </div>

                                </div>
                                 */}
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

                                <div className="checkboxBloc d-none d-sm-block" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row d-flex align-items-center" style={{ borderBottom: '2px solid black', borderTop: '2px solid black', padding: '2% 0 2% 0' }}>
                                        <div className="col-sm-3">
                                            <strong>Très souvent</strong>
                                        </div>

                                        <div className="col-sm-1">
                                            <Form.Check type="checkbox" label="1" />
                                        </div>
                                        <div className="col-sm-1">
                                            <Form.Check type="checkbox" label="2" />
                                        </div>
                                        <div className="col-sm-1">
                                            <Form.Check type="checkbox" label="3" />
                                        </div>
                                        <div className="col-sm-1">
                                            <Form.Check type="checkbox" label="4" />
                                        </div>
                                        <div className="col-sm-1">
                                            <Form.Check type="checkbox" label="5" />
                                        </div>
                                        <div className="col-sm-1">
                                            <Form.Check type="checkbox" label="6" />
                                        </div>

                                        <div className="col-sm-3 d-flex justify-content-end" style={{ display: 'flex', alignItems: 'center' }}>
                                            <strong>Très rarement</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        15. J'ai déjà été à découvert
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Une seule réponse possible.
                                </p>
                                <div className="checkboxBloc d-block d-sm-none" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <p><strong>Très souvent</strong></p>
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="1" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="2" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="3" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="4" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="5" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="6" />
                                        </div>
                                        <div className="col-12 col-sm-5">
                                            <p><strong>Très rarement</strong></p>
                                        </div>
                                    </div>

                                </div>

                                <div className="checkboxBloc d-none d-sm-block" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row d-flex align-items-center" style={{ borderBottom: '2px solid black', borderTop: '2px solid black', padding: '2% 0 2% 0' }}>
                                        <div className="col-sm-3">
                                            <strong>Très souvent</strong>
                                        </div>

                                        <div className="col-sm-1">
                                            <Form.Check type="checkbox" label="1" />
                                        </div>
                                        <div className="col-sm-1">
                                            <Form.Check type="checkbox" label="2" />
                                        </div>
                                        <div className="col-sm-1">
                                            <Form.Check type="checkbox" label="3" />
                                        </div>
                                        <div className="col-sm-1">
                                            <Form.Check type="checkbox" label="4" />
                                        </div>
                                        <div className="col-sm-1">
                                            <Form.Check type="checkbox" label="5" />
                                        </div>
                                        <div className="col-sm-1">
                                            <Form.Check type="checkbox" label="6" />
                                        </div>

                                        <div className="col-sm-3 d-flex justify-content-end" style={{ display: 'flex', alignItems: 'center' }}>
                                            <strong>Très rarement</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        16. Je possède :
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Plusieures réponses possibles.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="Un compte en banque" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Un chéquier" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Une carte de paiement" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Une solution de paiement enligne (Paypal ou autre)" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Aucun de ces moyens bancaires" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        17. Je perçois les ressources financières suivantes :
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Plusieures réponses possibles.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="Un salaire" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 4</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Des allocations (CAF, Pole emploi)" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 3</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Une aide regulière de ma famille" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 2</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je suis sans ressources" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 1</strong>
                                        </div>
                                    </div>
                                </div>
                                <button onClick={this.saveFinance} className="btn btn-success">
                                    Submit
                                </button>
                            </div>

                            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------Citoyenneté------------- */}

                            <div className="col-12" style={{ borderBottom: '2px solid black', marginTop: '2%', display: 'flex', justifyContent: 'space-between' }}>
                                <h2>Citoyenneté</h2>
                                <div className="d-flex  d-none d-md-block">
                                    <FontAwesomeIcon
                                        icon="handshake"
                                        size='xl'
                                        id='icones'
                                    />
                                </div>

                            </div>
                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        18. Mes expériences citoyennes et associatives :
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Plusieures réponses possibles.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="J'ai été bénévole dans une association" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 4</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai réalisé la journée de Défense et de Citoyenneté" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 3</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai été déélgué de classe " />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 2</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai participé à des projets citoyens dans le cadre de ma scolarité'" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 1</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-1">
                                            <Form.Check type="checkbox" label="Autre" />
                                        </div>
                                        <div className="col-12 col-sm-11">
                                            <textarea name="" id="" rows="1" style={{ border: 'none', backgroundColor: 'white', borderBottom: '1px solid black' }}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        19. L'administration française
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Plusieures réponses possibles.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="Je suis recensé auprès de la mairie de ma commune" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 4</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je déclare mes impôts" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 3</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je suis inscrit au pôle emploi" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 2</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je suis allocataire de la Caisse d'allocations familale" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 1</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je sais remplir undocument administratif (CERFA, dossier d'inscription, ...)" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 1</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je suis en difficultés avec les démarches administratives" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 1</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-1">
                                            <Form.Check type="checkbox" label="Autre" />
                                        </div>
                                        <div className="col-12 col-sm-11">
                                            <textarea name="" id="" rows="1" style={{ border: 'none', backgroundColor: 'white', borderBottom: '1px solid black' }}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* --------------------------------------------------------------------------------------------------------------------------------------------------Sports et loisirs------------- */}

                            <div className="col-12" style={{ borderBottom: '2px solid black', marginTop: '2%', display: 'flex', justifyContent: 'space-between' }}>
                                <h2>Sports et loisirs</h2>
                                <div className="d-flex  d-none d-md-block">
                                    <FontAwesomeIcon
                                        icon="swimmer"
                                        size='xl'
                                        id='icones'
                                    />
                                </div>
                            </div>
                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        20. Quelles sont mes pratiques en matière de sport, loisirs et culture
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Une seule réponse par ligne.
                                </p>
                                <div className="checkboxBloc d-block d-sm-none" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12">
                                            <p><strong>Je suis licencié dans un club de sport</strong></p>
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>

                                </div>

                                <div className="checkboxBloc d-none d-sm-block" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row d-flex align-items-center" style={{ borderBottom: '2px solid black', borderTop: '2px solid black', padding: '2% 0 2% 0' }}>
                                        <div className="col-sm-12">
                                            <strong>Je suis licencié dans un club de sport</strong>
                                        </div>

                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-lg-2 col-xl-2">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>
                                </div>

                                <div className="checkboxBloc d-block d-sm-none" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12">
                                            <p><strong>Je pratique une activité physique seul</strong></p>
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>

                                </div>

                                <div className="checkboxBloc d-none d-sm-block" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row d-flex align-items-center" style={{ borderBottom: '2px solid black', padding: '2% 0 2% 0' }}>
                                        <div className="col-sm-12">
                                            <strong>Je pratique une activité physique seul</strong>
                                        </div>

                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-lg-2 col-xl-2">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>
                                </div>
                                <div className="checkboxBloc d-block d-sm-none" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12">
                                            <p><strong>Je pratique une activité culturelle et/ou artistique (chant, dessin, sculpture...)</strong></p>
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>

                                </div>

                                <div className="checkboxBloc d-none d-sm-block" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row d-flex align-items-center" style={{ borderBottom: '2px solid black', padding: '2% 0 2% 0' }}>
                                        <div className="col-sm-12">
                                            <strong>Je pratique une activité culturelle et/ou artistique (chant, dessin, sculpture...)</strong>
                                        </div>

                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-lg-2 col-xl-2">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>
                                </div>
                                <div className="checkboxBloc d-block d-sm-none" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12">
                                            <p><strong>Je vais en bibliothèque / médiathèque</strong></p>
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>

                                </div>

                                <div className="checkboxBloc d-none d-sm-block" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row d-flex align-items-center" style={{ borderBottom: '2px solid black', padding: '2% 0 2% 0' }}>
                                        <div className="col-sm-12">
                                            <strong>Je vais en bibliothèque / médiathèque</strong>
                                        </div>

                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-lg-2 col-xl-2">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>
                                </div>
                                <div className="checkboxBloc d-block d-sm-none" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12">
                                            <p><strong>Je vais à des concerts</strong></p>
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>

                                </div>

                                <div className="checkboxBloc d-none d-sm-block" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row d-flex align-items-center" style={{ borderBottom: '2px solid black', padding: '2% 0 2% 0' }}>
                                        <div className="col-sm-12">
                                            <strong>Je vais à des concerts</strong>
                                        </div>

                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-lg-2 col-xl-2">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>
                                </div>
                                <div className="checkboxBloc d-block d-sm-none" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12">
                                            <p><strong>Je vais au cinéma</strong></p>
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>

                                </div>

                                <div className="checkboxBloc d-none d-sm-block" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row d-flex align-items-center" style={{ borderBottom: '2px solid black', padding: '2% 0 2% 0' }}>
                                        <div className="col-sm-12">
                                            <strong>Je vais au cinéma</strong>
                                        </div>

                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-lg-2 col-xl-2">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>
                                </div>
                                <div className="checkboxBloc d-block d-sm-none" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12">
                                            <p><strong>Je joue en ligne etµ/ou à des jeux sur console</strong></p>
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>

                                </div>

                                <div className="checkboxBloc d-none d-sm-block" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row d-flex align-items-center" style={{ borderBottom: '2px solid black', padding: '2% 0 2% 0' }}>
                                        <div className="col-sm-12">
                                            <strong>Je joue en ligne et/ou à des jeux sur console</strong>
                                        </div>

                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-lg-2 col-xl-2">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>
                                </div>
                                <div className="checkboxBloc d-block d-sm-none" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12">
                                            <p><strong>Je regarde des séries sur des plateformes (Netflix, OCS, Disney, Amazon prime ...)</strong></p>
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-4">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>

                                </div>

                                <div className="checkboxBloc d-none d-sm-block" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row d-flex align-items-center" style={{ borderBottom: '2px solid black', padding: '2% 0 2% 0' }}>
                                        <div className="col-sm-12">
                                            <strong>Je regarde des séries sur des plateformes (Netflix, OCS, Disney, Amazon prime ...)</strong>
                                        </div>

                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Oui" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Non" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Parfois" />
                                        </div>
                                        <div className="col-lg-2 col-xl-2">
                                            <Form.Check type="checkbox" label="Régulièrement" />
                                        </div>
                                        <div className="col-lg-2 col-xl-1">
                                            <Form.Check type="checkbox" label="Jamais" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------Emploi------------- */}

                            <div className="col-12" style={{ borderBottom: '2px solid black', marginTop: '2%', display: 'flex', justifyContent: 'space-between' }}>
                                <h2>Emploi</h2>
                                <div className="d-flex  d-none d-md-block">
                                    <FontAwesomeIcon
                                        icon="wrench"
                                        size='xl'
                                        id='icones'
                                    />
                                </div>
                            </div>
                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        21. Mes atouts liés à la recherche d'emploi
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Plusieures réponses possibles.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="J'ai un CV à jour " />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je sais rédiger une lettre de motivation" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai déjà postulé à un ou plusieurs emploi" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai déjà participé à un entretien de recrutement" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Rien de tout ça, mais je suis prêt à apprendre.." />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="OK, j'ai pas mal d'atouts mais j'ai besoin de conseils pour revoir mon CV, ma lettre de motivation, etc." />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-1">
                                            <Form.Check type="checkbox" label="Autre" />
                                        </div>
                                        <div className="col-12 col-sm-11">
                                            <textarea name="" id="" rows="1" style={{ border: 'none', backgroundColor: 'white', borderBottom: '1px solid black' }}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        22. Mes atouts pour accéder à un emploi
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Plusieures réponses possibles.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="J'ai identifié un métier idéal" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je sais à quel(s) emploi(s) je souhaite postuler" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai un diplôme en lien avec le métier que je vise " />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je souhaite me former" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je sais quelle formation je veux suivre" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Rien de tout ça, je veux être aidé pour structurer ma démarche d'accés à l'emploi" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        23. Mon expérience professionnelle
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Plusieures réponses possibles.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="J'ai travaillé comme saisonnier / job d'été" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai travaillé en apprentissage " />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai travaillé en intérim" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai travaillé en CDD ou CDI'" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je n'ai jamais travaillé mais je suis prêt pour une première expérience en entreprise" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-1">
                                            <Form.Check type="checkbox" label="Autre" />
                                        </div>
                                        <div className="col-12 col-sm-11">
                                            <textarea name="" id="" rows="1" style={{ border: 'none', backgroundColor: 'white', borderBottom: '1px solid black' }}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        24. Quelle est la durée de mon dernier contrat de travail ?
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Une seule réponse possible.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="Moins d'un mois" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="D'un mois à 3 mois" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Plus de 3 mois" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Plus de 6 mois" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je n'ai jamais travaillé" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        25. Les démarches que j'entreprends pour trouver un emploi
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Plusieures réponses possibles.
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="Je consulte les offres d'emploi" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'envoie des candidatures spontanées" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je parle de ma recherche d'emploi dans mon entourage " />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je communique sur ma recherche d'emploi sur les réseaux sociaux " />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Je participe à des forums, des job-dating, etc ..." />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="J'ai besoin d'aide, de soutien pour entreprendre des démarches de recherche d'emploi" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; ?</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-1">
                                            <Form.Check type="checkbox" label="Autre" />
                                        </div>
                                        <div className="col-12 col-sm-11">
                                            <textarea name="" id="" rows="1" style={{ border: 'none', backgroundColor: 'white', borderBottom: '1px solid black' }}></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        26. Ma dernière démarche remonte à
                                    </strong>
                                </p>
                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Une seule réponse possible .
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <div className="row">
                                        <div className="col-12 col-sm-5">
                                            <Form.Check type="checkbox" label="Quelques jours" />
                                        </div>
                                        <div className="col-12 col-sm-7 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 4</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Plusieurs semaines" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 3</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Plus de 3 mois" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 2</strong>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12 col-sm-9">
                                            <Form.Check type="checkbox" label="Plus de 6 mois" />
                                        </div>
                                        <div className="col-12 col-sm-3 d-flex justify-content-end">
                                            Valeur: <strong>&nbsp; 1</strong>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- */}


                            <div className="section-checkbox" style={{ marginTop: '5%' }}>
                                <p>
                                    <strong>
                                        27. Pour quelle(s) raison(s) je n'ai pas fait de démarche depuis longtemps
                                    </strong>
                                </p>
                                <p style={{ fontSize: '0.8rem' }}> Si ma dernière démarche remonte à plusieurs semaines et au-delà</p>

                                <p style={{ color: '#343434', fontStyle: 'italic', fontWeight: 'bold' }}>
                                    Une seule réponse possible .
                                </p>
                                <div className="checkboxBloc" style={{ padding: '0 0 0 5%' }}>
                                    <textarea name="" id="" cols="30" rows="10"></textarea>
                                </div>
                            </div>
                            <div className="row" style={{ marginTop: '2%' }}>
                                <div className="col-6 offset-6 col-sm-4 offset-sm-8">
                                    <button><Link to={'espace-personnel/:identifiant'}>Soumettre le questionnaire</Link></button>
                                </div>
                            </div>

                        </Form.Group>
                    </Form>
                </div>
            </div >
        )
    }
}





