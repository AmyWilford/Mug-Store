import decode from "jwt-decode";

// A new AuthService class to instantiate user
class AuthService {
  // Function to get userdata / user profile
  getProfile() {
    return decode(this.getToken());
  }

  // Function to check if user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Function to check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  // Function to get user token from localStorage
  getToken() {
    return localStorage.getItem("id_token");
  }

  //   Function to login user - and save user token to localStroage
  login(idToken) {
    localStorage.setItem("id_token", idToken);
    window.location.assign("/");
  }

  //   Function to logout user - and clear token and profile data from localStorage and relaod page and reset state of application
  logout() {
    localStorage.removeItem("id_token");
    window.location.assign("/");
  }
}

export default new AuthService();
