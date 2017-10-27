import Vue from 'vue';
import Vuex from 'vuex';
import { fetchDetectionAccountGroups, createAccountGroup, moveAccount, isTransient, isTransientId, generateTransientId } from '@/api';

Vue.use(Vuex);

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  loading: false,
  error: false,
  accountGroups: [],
};

// mutations are operations that actually mutates the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
  loadDetection(newState) {
    newState.loading = true;
    newState.error = false;
  },
  loadDetectionSuccess(newState, accountGroups) {
    newState.loading = false;
    accountGroups.push({
      id: generateTransientId(),
      accounts: [],
    });
    newState.accountGroups = accountGroups;
  },
  loadDetectionFailed(newState) {
    newState.loading = false;
    newState.error = true;
  },
  detectionLoaded(newState) {
    newState.loading = false;
  }
};

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  loadDetection: ({ commit }, detectionId) => {
    commit('loadDetection');
    fetchDetectionAccountGroups(detectionId).then((result) => {
      commit('loadDetectionSuccess', result);
    }, () => {
      commit('loadDetectionFailed');
    });
  },
  detectionLoaded: ({ commit }) => {
    commit('detectionLoaded');
  },
};

// getters are functions
const getters = {
  evenOrOdd: newState => newState.count % 2 === 0 ? 'even' : 'odd'
};

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations
});
