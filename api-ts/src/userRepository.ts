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

type UserModel = { id: number, name: string }

const getUsers: () => Promise<UserModel[]> = async () => {
  const users = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return new Promise<UserModel[]>((resolve, reject) => {
    resolve(
      users.map(num => {
        return {
          id: num,
          name: generateRandomName(),
        } as UserModel
      })
    );
  })
}

export default {getUsers}
