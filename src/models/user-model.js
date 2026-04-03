let users = [
  {
    user_id: 3609,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@metropolia.fi',
    role: 'user',
    password: 'password',
  },
];

export const getUsers = () => users;

export const getUser = (id) => users.find((user) => user.user_id === id);

export const addUser = (user) => {
  const newUser = {user_id: users.length + 3609, ...user};
  users.push(newUser);
  return newUser;
};
