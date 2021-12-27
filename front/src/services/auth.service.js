import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(nom, prenom, password, telephone, id) {
    return axios
      .post(API_URL + "signin", {
        nom,
        prenom,
        password,
        telephone,
        id
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;

      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(nom, prenom, telephone, datedenaissance, adresse, email, password) {
    return axios.post(API_URL + "signup", {
      nom,
      email,
      password,
      prenom,
      adresse,
      datedenaissance,
      telephone
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));

  }

  update(telephone,nom, prenom, password) {
    return axios.put(API_URL + "update", {
      nom,
      prenom,
      password,
      telephone
    })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;

      });
  }
}

export default new AuthService();
