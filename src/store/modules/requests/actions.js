export default {
  async contactCoach(context, payload) {
    const newRequest = {
      // id: new Date().toISOString(),
      // coachId: payload.coachId,
      userEmail: payload.email,
      message: payload.message
    };
    const response = await fetch(
      `https://find-a-coach-39701-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,
      {
        method: 'POST',
        body: JSON.stringify(newRequest)
      }
    );

    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to send request.'
      );
      throw error;
    }
    // FB returns a UID for every new posted req (.name per FB docs)
    newRequest.id = responseData.name;
    newRequest.coachId = payload.coachId; // stores in local data
    // pass mutation name, payload name
    context.commit('addRequest', newRequest);
  },
  async fetchRequests(context) {
    // only requests for active user (coach)
    const coachId = context.rootGetters.userId;
    const token = context.rootGetters.token;
    const response = await fetch(
      // GET all requests with coachId passed in
      `https://find-a-coach-39701-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=` +
        token
    );
    const responseData = await response.json();

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to fetch requests.'
      );
      throw error;
    }

    // transform data from FB into obj we need
    const requests = [];

    for (const key in responseData) {
      const request = {
        id: key,
        coachId: coachId,
        userEmail: responseData[key].userEmail,
        message: responseData[key].message
      };
      requests.push(request);
    }
    // send to mutation
    context.commit('setRequests', requests);
  }
};
