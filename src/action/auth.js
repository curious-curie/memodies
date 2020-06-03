
import axios from 'axios';

export const loadUser = () => {
    return (dispatch, getState) => {
      dispatch({type: "USER_LOADING"});
  
      const token = getState().auth.token;
  
      let headers = {
        "Content-Type": "application/json",
      };
  
      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }
      return axios.get('https://memodies-back.herokuapp.com/api/auth/user/', {headers})
        .then(res => {
          if (res.status === 200) {
            dispatch({type: 'USER_LOADED', user: res.data });
            return res.data;
          } else if (res.status >= 400 && res.status < 500) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          }
        }).catch( (err) => {
          dispatch({type: "AUTHENTICATION_ERROR", data: err});
        })
    }
  }

  export const login = (username, password) => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
      let body = JSON.stringify({username, password});
  
      return axios.post('https://memodies-back.herokuapp.com/api/auth/login/', { username, password }, { headers })
        .then(res => {
          if (res.status === 200) {
            dispatch({type: 'LOGIN_SUCCESSFUL', data: res.data });
            return res.data;
          } else if (res.status === 403 || res.status === 401) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          } else {
            dispatch({type: "LOGIN_FAILED", data: res.data});
            throw res.data;
          }
        })
    }
  }

  export const register = (username, password) => {
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
  
      return axios.post('https://memodies-back.herokuapp.com/api/auth/register/',  { username, password }, { headers })
        .then(res => {
          if (res.status === 200) {
            alert("Registered Successfuly! Welcome!")
            dispatch({type: 'REGISTRATION_SUCCESSFUL', data: res.data });
            return res.data;
          } else if (res.status === 403 || res.status === 401) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          } else {
            dispatch({type: "REGISTRATION_FAILED", data: res.data});
            throw res.data;
          }
        })
    }
  }



export const logout = () => {
  return (dispatch, getState) => {
      const token = getState().auth.token;
  
      let headers = {
        "Content-Type": "application/json",
      };
  
      if (token) {
        headers["Authorization"] = `Token ${token}`;
      }

      return axios.post("https://memodies-back.herokuapp.com/api/auth/logout/", {headers})
          .then(res => {
              if (res.status === 204) {
                  return {status: res.status, data: {}};
              } else if (res.status < 500) {
                  return res.json().then(data => {
                      return {status: res.status, data};
                  })
              } else {
                  throw res;
              }
          })
          .then(res => {
              if (res.status === 204) {
                  alert("See You Again!")
                  dispatch({type: 'LOGOUT_SUCCESSFUL'});
                  return res.data;
              } else if (res.status === 403 || res.status === 401) {
                  dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
                  throw res.data;
              }
          })
  }
}