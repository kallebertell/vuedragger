import { isTransientId } from './idTool';

/**
 * Since we create transient account groups on the frontend and can move accounts to them
 * before they are actually persisted in the backend, we'll create a dirty little
 * stateful registry here to make the code simpler in the components.
 */
const registry = {};

export default {
  register(transientId, persistentId) {
    registry[transientId] = persistentId;
  },

  resolve(id) {
    if (!isTransientId(id)) {
      return id;
    }

    const persistedId = registry[id];

    if (!persistedId) {
      throw new Error('Tried to resolve transient id for something which hasn\'t been persisted yet');
    }

    return persistedId;
  },

  isRegistered(transientId) {
    return !!registry[transientId];
  },
};
