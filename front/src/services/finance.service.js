import http from "../common/http-common";



class FinanceDataService {
  getAll() {
    return http.get("/donnees/finance");
  }

  get(id) {
    return http.get(`/donnees/finance/${id}`);
  }

  create(data) {
    return http.post("/donnees/finance", data);
  }

  update(id, data) {
    return http.put(`/donnees/finance/${id}`, data);
  }

  delete(id) {
    return http.delete(`/donnees/finance/${id}`);
  }

  deleteAll() {
    return http.delete(`/donnees/finance`);
  }

  findBymois(mois) {
    return http.get(`/donnees/finance?mois=${mois}`);
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
    
  }
  
}

export default new FinanceDataService();