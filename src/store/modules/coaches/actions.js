export default {
  // data = payload = formData
  async registerCoach(context, payload) {
    const userId = context.rootGetters.userId; // pass this to FB
    const coachData = {
      // this lines up our formData key names with the store key names
      // id: context.rootGetters.userId,
      firstName: payload.first,
      lastName: payload.last,
      description: payload.desc,
      hourlyRate: payload.rate,
      areas: payload.areas
    };
    // token from root store
    const token = context.rootGetters.token;
    // add token as query param (?auth=) in req
    const response = await fetch(
      `https://find-a-coach-39701-default-rtdb.firebaseio.com/coaches/${userId}.json?auth=` +
        token,
      {
        method: 'PUT', // POST will create new entry, not override if exists
        body: JSON.stringify(coachData)
      }
    );
    // once above request is done
    // const responseData = await response.json();
    if (!response.ok) {
      // error
    }
    context.commit('registerCoach', {
      ...coachData, // merge all coachData PLUS id into new obj
      id: userId
    });
  },
  // loaded from FB
  async loadCoaches(context, payload) {
    if (!payload.forceRefresh && !context.getters.shouldUpdate) {
      // if falsey, won't send below request
      return;
    }

    const response = await fetch(
      `https://find-a-coach-39701-default-rtdb.firebaseio.com/coaches.json`
    );
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || 'Failed to fetch!');
      // when thrown, cpmnt that threw it can handle it (CoachesList)
      throw error;
    }
    const coaches = [];
    // key is coach id in FB (c3, etc)
    for (const key in responseData) {
      const coach = {
        id: key,
        firstName: responseData[key].firstName,
        lastName: responseData[key].lastName,
        description: responseData[key].description,
        hourlyRate: responseData[key].hourlyRate,
        areas: responseData[key].areas
      };
      coaches.push(coach);
    }
    // mutation name
    context.commit('setCoaches', coaches);
    context.commit('setFetchTimestamp');
  }
};
