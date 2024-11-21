function generateRandomName() {
  const firstNames = [
    "Alex", "Taylor", "Jordan", "Morgan", "Chris", "Jamie", "Casey", "Robin", "Riley", "Peyton"
  ];
  const lastNames = [
    "Smith", "Johnson", "Brown", "Taylor", "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin"
  ];

  const randomFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const randomLastName = lastNames[Math.floor(Math.random() * lastNames.length)];

  return `${randomFirstName} ${randomLastName}`;
}

const getUsers = async () => {
  const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return new Promise((resolve, reject) => {
    resolve(
      users.map(number => {
        return {
          id: number,
          name: generateRandomName(),
        }
      })
    );
  })
}

module.exports = {getUsers}
