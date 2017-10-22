import accountGroups from './accountGroups.json';

export default function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(accountGroups);
    }, 3500);
  });
}
