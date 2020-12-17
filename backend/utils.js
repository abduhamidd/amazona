import jwt from 'json-web-token';
export const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET || 'something else',
    {
      expiresIn: '30d',
    },
  );
};
