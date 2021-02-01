let timer;
export default {
  async login(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'login',
    });
  },
  async signup(context, payload) {
    return context.dispatch('auth', {
      ...payload,
      mode: 'signup',
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      // from FB auth api docs + apikey
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKoUmBqjT4katRbDTQ6XU35SmMASqHyJQ';

    if (mode === 'signup') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKoUmBqjT4katRbDTQ6XU35SmMASqHyJQ';
    }
    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Account already exists! Please login instead.'
      );
      throw error;
    }
    const expiresIn = +responseData.expiresIn * 1000; // get # in ms
    // const expiresIn = 5000; // to test autologout after 5s
    const expirationDate = new Date().getTime() + expiresIn;

    // for auto log in
    localStorage.setItem('token', responseData.idToken);
    localStorage.setItem('userId', responseData.localId);
    localStorage.setItem('tokenExpiration', expirationDate);

    // timer on autologout
    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    context.commit('setUser', {
      // our name: FB auth api name
      token: responseData.idToken,
      userId: responseData.localId,
      // tokenExpiration: expirationDate // dont need in vuex cuz now in localStorage
    });
  },
  autoLogin(context) {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const tokenExpiration = localStorage.getItem('tokenExpiration');

    // diff in ms btwn time when token expires & current time
    const expiresIn = +tokenExpiration - new Date().getTime();

    if (expiresIn < 0) {
      // timer expired, exit fxn
      return;
    }

    timer = setTimeout(() => {
      context.dispatch('autoLogout');
    }, expiresIn);

    // won't set user if we don't have token/userId
    if (token && userId) {
      context.commit('setUser', {
        token: token,
        userId: userId,
      });
    }
  },
  logout(context) {
    // clear data to logout
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('tokenExpiration');

    clearTimeout(timer); // clear timer when logging out

    context.commit('setUser', {
      token: null,
      userId: null,
    });
  },
  // set when autoLogout dispatched
  autoLogout(context) {
    context.dispatch('logout');
    context.commit('setAutoLogout');
  },
};
