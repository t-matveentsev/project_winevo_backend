// import createHttpError from 'http-errors';
import UserCollection from '../db/models/User.js';

export const findUser = (query) => UserCollection.findOne(query);

// export const signupUser = async (payload) => {
//   const { email, password } = payload;
//   const user = await findUser({ email });
//   if (user) {
//     throw createHttpError(409, 'Email already in use');
//   }

//   const hashPassword = await bcrypt.hash(password, 10);

//   const newUser = UserCollection.create({ ...payload, password: hashPassword });

//   const token = jwt.sign({ email }, jwtSecret, {
//     expiresIn: '24h',
//   });

//   const templateSource = await fs.readFile(verifyEmailPath, 'utf-8');
//   const template = Handlebars.compile(templateSource);
//   const html = template({
//     verifyLink: `${appDomain}/auth/verify?token=${token}`,
//   });

//   const verifyEmail = {
//     to: email,
//     subject: 'Verify email',
//     html,
//   };

//   await sendEmail(verifyEmail);

//   return newUser;
// };
