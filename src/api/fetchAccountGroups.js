const accountGroups = [
  {
    id: 1,
    accounts: [
      {
        email: 'bob@marley.com',
        img: 'https://randomuser.me/api/portraits/men/77.jpg',
      },
      {
        email: 'jim@marley.com',
        img: 'https://randomuser.me/api/portraits/men/21.jpg',
      },
    ],
  },
  {
    id: 2,
    accounts: [
      {
        email: 'harry@potter.com',
        img: 'https://randomuser.me/api/portraits/men/2.jpg',
      },
      {
        email: 'tony@tiger.com',
        img: 'https://randomuser.me/api/portraits/men/1.jpg',
      },
    ],
  },
];

export default function () {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(JSON.parse(JSON.stringify(accountGroups)));
    }, 3500);
  });
}
