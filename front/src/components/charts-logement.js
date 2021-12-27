import axios from 'axios';
import React, { Component } from 'react'
import { Line } from 'react-chartjs-2';
import AuthService from "../services/auth.service";



class chartsLogement extends Component {
    state = {
        mois: [],
        valeur: [],
        data: [],
        currentUser: { prenom: "", nom: "", id: "" }
    };
    componentDidMount() {
        const currentUser = AuthService.getCurrentUser();
        this.setState({ currentUser: currentUser, userReady: true, id: currentUser.id });

        axios.get('http://localhost:8080/api/donnees/categories/2')
            .then(res => {
                const data = res.data;
                console.log(data)
                // const mois = JSON.stringify(preMois);
                // mois.toString();
                // const valeur = res.data;
                this.setState({ data });
                console.log(data)
                //  console.log(valeur)
                return JSON.stringify(data);

            });
        // .then(function (response) {
        //     console.log(response);
        //     const data=response.data[3]
        //     return JSON.stringify(data[3]);

        //   })
        

    }




    render() {

        const { currentUser, data } = this.state;
const Mois = data.map((mois) => {
            if (
                mois.userId === currentUser.id
            ) {
                console.log(mois.mois)
                return JSON.stringify(mois.mois);
            }
        });
        const mooois = Mois
        const Valeur = data.map((valeur) => {
            if (
                valeur.userId === currentUser.id
            ) {
                return (
                    valeur.valeur
                )
            }
        })
        const chartData = {

            labels: mooois,
            datasets: [
                {
                    label: '# of Votes',
                    data: Valeur,
                    fill: true,
                    backgroundColor: 'rgb(255, 99, 132)',
                    borderColor: 'rgba(255, 99, 132, 0.2)',
                },
            ],
        };

        return (
            <div>
                {currentUser.id}
                <ul>
                    {/* {this.state.mois.map(tutorial => <li>{tutorial.mois}  {tutorial.valeur}</li>)}  */}


                </ul>
                <h3>Bar Chart</h3>
                <div>
                    <Line
                        data={chartData}
                        options={{
                            responsive: true,
                            title: { text: "THICCNESS SCALE", display: true },
                            scales: {
                                yAxes: {
                                    ticks: {
                                        beginAtZero: true
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </div>);

    }
}
export default chartsLogement;
