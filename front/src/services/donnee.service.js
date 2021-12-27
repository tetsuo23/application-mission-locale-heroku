import http from "../common/http-common";
import axios from "axios";


class DonneeDataService {
  getAll() {
    return http.get("/donnees");
  }

  get(id) {
    return http.get(`/donnees/${id}`);
  }

  create(data) {
    return http.post("/donnees", data);
  }

  update(id, data) {
    return http.put(`/donnees/${id}`, data);
  }

  delete(id) {
    return http.delete(`/donnees/${id}`);
  }

  deleteAll() {
    return http.delete(`/donnees`);
  }

  findBymois(mois) {
    return http.get(`/donnees?mois=${mois}`);
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
    
  }
  get(userId, data) {
    return http.get(`/donnees/${userId}`, data)
    
  }
}

export default new DonneeDataService();