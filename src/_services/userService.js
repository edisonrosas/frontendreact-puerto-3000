import { apiConstants } from "../_constants/apiConstants";
export const userService = {
  login,
  logout,
  sendVerificationEmail,
  sendforgotPasswordEmail,
  register,
  getUserData,
  resetPassword,
  updateUser,
  followUser,
  getUserProfileData,
  getPosts,
  getUserProfileFollowers,
  getUserProfileFollowings,
  getNewUsers,
};


//const urlapi = "http://localhost:5000/socialtravelapp-e6988/us-central1/app";

const urlapi = apiConstants.URLAPI;

function login(email, password) {

  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" ,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST'},
    body: JSON.stringify({ email, password }),
  };
  console.log(urlapi)
  return fetch(urlapi+"/api/user/login",requestOptions).then((res) => res.json())
      .catch(
        error => {
         // console.error('Error:', error)
          return JSON.parse(JSON.stringify({message: "Error de conexión" }));
        }
    ).then(
      (res) => 
      { 
        console.log(res);
        /*console.log(res.user  === undefined);
        console.log(res.message  === undefined);
        console.log(res.user === "");
        console.log(res.message === "");*/
        if(res.user  !== undefined){
          console.log("se inidió")
          localStorage.setItem("user", JSON.stringify({ token: res.user.token }));
        }
        return res;
      }
    );
/*
    .then((res) => {
   
      localStorage.setItem("user", JSON.stringify({ token: res.user.token }));
      return res.user;
    });*/
   

}

function getNewUsers(params) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" ,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST'
  },
    body: JSON.stringify({ ...params }),
  };

  return fetch(urlapi+"/api/user/getNewUsers", requestOptions)
    .then((response) => response.json())
      .catch(
        error => {
         // console.error('Error:', error)
          return "Error de conexión.";
        }
    ).then((res) => {
      return res;
    });
   /* .then(handleResponse)
    .then((res) => {
      return res;
    });*/
}

function resetPassword(data) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      Authorization: "Bearer " + data.jwt,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'
    },
    body: JSON.stringify({ ...data }),
  };

  return fetch(urlapi+"/api/user/passwordreset", requestOptions)
    .then(handlePasswordResetResponse)
    .then((res) => {
      return res;
    });
}

function sendVerificationEmail(email) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" ,
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST'},
    body: JSON.stringify({ email }),
  };
  return fetch(urlapi+"/api/user/sendVerificationEmail/", requestOptions).then(
    handleResponse
  );
}

function sendforgotPasswordEmail(email) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json" , 
     'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST'},
    body: JSON.stringify({ email }),
  };
  return fetch(urlapi+"/api/user/sendforgotPasswordEmail/", requestOptions).then(
    handleResponse
  );
}

function logout() {
  localStorage.removeItem("user");
}

function register(user) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: { "Content-Type": "application/json",
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST'},
    body: JSON.stringify(user),
  };
  /*const headers = { 
   'Access-Control-Allow-Origin': '*',
   "Content-Type": "application/json"
  };
  axios.post('http://localhost:5000/socialtravelapp-e6988/us-central1/app/api/user/signup',user,{ headers })
  .then(res => {
    console.log('Success:', res);
  }).catch((error)=>{
    console.log(error.toString());
  });*/
  
  return fetch(urlapi+"/api/user/signup", requestOptions)

  /*
  .then((response) => {
    response.json();
  });*/
}

function getUserData(queryParams) {

    const requestOptions = {
      mode:"cors",
      method: "POST",
      headers: {
        Authorization: JSON.parse(localStorage.getItem("user")).token,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...queryParams }),
    }
    console.log(JSON.stringify({ ...queryParams }))

    return fetch(urlapi+"/api/user/getUserData", requestOptions)
    /*.then((response) => response.json())
    .catch(
      error => {
        //console.log(response)
       // console.log("error")
       // console.error('Error:', error)
       return JSON.parse(JSON.stringify({
        estado: "Error",
        message: "Error de conexión" }));
      }
    ).then((res) => {
      console.log(res)
      return res;
    });*/
     /*
    .then(handleResponse)
    .catch(
      error => {
       // console.error('Error:', error)
        return "Error de conexión.";
      }).then((res) => {
        console.log(res)
      return res;
    });*/


}

function getPosts(queryParams) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).token,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'
    },
    body: JSON.stringify({ ...queryParams }),
  };
  return fetch(urlapi+"/api/user/getPosts", requestOptions)
    .then(handleResponse)
    .then((res) => {
      console.log(res)
      return res;
    });
}

function updateUser(user) {
  delete user.isDisabled;
  const requestOptions = {
    mode:"cors",
    method: "POST",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).token,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'
    },
    body: JSON.stringify(user),
  };

  return fetch(urlapi+"/api/user/updateUser", requestOptions)
    .then(handleResponse)
    .then((user) => {
      //localStorage.setItem("user", JSON.stringify({ token: user.token }));
      //localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function followUser(userId) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).token,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'
    },
    body: JSON.stringify({ userId }),
  };

  return fetch(urlapi+"/api/user/followUser", requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      //localStorage.setItem("user", JSON.stringify(user));

      return user;
    });
}

function getUserProfileData(username) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).token,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'
    },
    body: JSON.stringify({ username: username.trim(), profilePage: true }),
  };

  return fetch(urlapi+"/api/user/getProfilePageData", requestOptions)
    .then(handleResponse)
    .then((user) => {
      console.log(user)
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      //localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function getUserProfileFollowers(userId) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).token,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'
    },
    body: JSON.stringify({ userId }),
  };
  return fetch(urlapi+"/api/user/getUserProfileFollowers", requestOptions)
    .then(handleResponse)
    .then((res) => {
      return res;
    });
}

function getUserProfileFollowings(userId) {
  const requestOptions = {
    mode: "cors",
    method: "POST",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("user")).token,
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST'
    },
    body: JSON.stringify({ userId }),
  };
  return fetch(urlapi+"/api/user/getUserProfileFollowings", requestOptions)
    .then(handleResponse)
    .then((res) => {
      return res;
    });
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        window.location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}

function handlePasswordResetResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
