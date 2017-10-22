
export function isTransient(resource) {
  return resource.id
    && resource.id.startsWith
    && resource.id.startsWith('new');
}

export function generateTransientId() {
  return `new-${Math.floor(Math.random() * 99999999)}`;
}
