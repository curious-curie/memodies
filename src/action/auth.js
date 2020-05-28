
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
      return fetch('https://memodies-back.herokuapp.com/api/auth/user/', {headers})
        .then(res => {
          if (res.status < 500) {
            return res.json().then(data => {
              return {status: res.status, data};
            })
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
        .then(res => {
          if (res.status === 200) {
            console.log("loaded")
            dispatch({type: 'USER_LOADED', user: res.data });
            return res.data;
          } else if (res.status >= 400 && res.status < 500) {
            dispatch({type: "AUTHENTICATION_ERROR", data: res.data});
            throw res.data;
          }
        })
    }
  }

  export const login = (username, password) => {
    console.log(username, password);
    return (dispatch, getState) => {
      let headers = {"Content-Type": "application/json"};
      let body = JSON.stringify({username, password});
  
      return fetch('https://memodies-back.herokuapp.com/api/auth/login/', {headers, body, method: "POST"})
        .then(res => {
          if (res.status < 500) {
            return res.json().then(data => {
              return {status: res.status, data};
            })
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
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
      let body = JSON.stringify({username, password});
  
      return fetch('https://memodies-back.herokuapp.com/api/auth/register/', {headers, body, method: "POST"})
        .then(res => {
          if (res.status < 500) {
            return res.json().then(data => {
              return {status: res.status, data};
            })
          } else {
            console.log("Server Error!");
            throw res;
          }
        })
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

      return fetch("https://memodies-back.herokuapp.com/api/auth/logout/", {headers, body: "", method: "POST"})
          .then(res => {
              if (res.status === 204) {
                  return {status: res.status, data: {}};
              } else if (res.status < 500) {
                  return res.json().then(data => {
                      return {status: res.status, data};
                  })
              } else {
                  console.log("Server Error!");
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