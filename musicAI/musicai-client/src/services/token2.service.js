import Cookies from 'js-cookie';

class TokenService {
  getLocalRefreshToken = () => {
    return Cookies.get('refreshToken');
  }

  getLocalAccessToken = () => {
    return Cookies.get('accessToken');
  }

  updateLocalAccessToken = (token) => {
    Cookies.set('accessToken', token);
  }

  getUser = () => {
    return JSON.parse(Cookies.get('user'));
  }

  setUser = (user) => {
    Cookies.set('user', JSON.stringify(user));
  }

  removeUser = () => {
    Cookies.remove('user');
  }

  getData = (key) => {
    return JSON.parse(Cookies.get(key));
  }

  setData = (key, value) => {
    Cookies.set(key, JSON.stringify(value));
  }

  removeData = (key) => {
    Cookies.remove(key);
  }

  getUserID = () => {
    const user = this.getUser();
    return user?.id;
  }
}

export default new TokenService();
