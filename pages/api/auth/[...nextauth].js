import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { hash } from "bcryptjs";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10,
});

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          const connection = await pool.getConnection();
          // const { username, password, usertype } = credentials;

          const [rows] = await connection.query("SELECT * FROM users ");

          connection.release();

          //check if rows is empty

          if (rows.length > 0) {
            const user = rows[0];
            // let passwordMatch = false;
            // const hashedPassword = await hash(password, 10);

            // if (hashedPassword === user.password) {
            //   passwordMatch = true;
            // }

            // if (!passwordMatch) {
            //   return null;
            // }

            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
  },

  callbacks: {
    jwt(params) {
      console.log(params);
      return params;
    },
  },
});
