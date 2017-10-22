
export function isTransientId(id) {
  return id && id.startsWith && id.startsWith('new');
}

export function isTransient(resource) {
  return isTransientId(resource.id);
}

export function generateTransientId() {
  return `new-${Math.floor(Math.random() * 99999999)}`;
}
