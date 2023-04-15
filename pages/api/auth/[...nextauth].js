import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { hash } from "bcryptjs";
import mysql from "mysql2/promise";
import { signIn } from "next-auth/react";
const bcrypt = require("bcrypt");
const saltRounds = 10;

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 50,
});

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        try {
          const connection = await pool.getConnection();
          const email = credentials.username;
          const usertype = credentials.userType;
          const password = credentials.password;

          console.log(email, usertype, password);

          const [rows] = await connection.query(
            "SELECT * FROM users WHERE email = ? AND role = ?",
            [email, usertype]
          );
          console.log("hello");
          console.log(rows);

          connection.release();

          if (rows.length > 0) {
            const user = rows[0];

            const passwordMatch = await bcrypt.compare(password, user.password);

            if (!passwordMatch) {
              return null;
            }
            console.log("hey");
            console.log(user);
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
      if (params.user?.role) {
        params.token.role = params.user.role;
      }
      if (params.user?.mobile) {
        params.token.mobile = params.user.mobile;
      }
      if (params.user?.id) {
        params.token.id = params.user.id;
      }
      return params.token;
    },
    session(session, token) {
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
