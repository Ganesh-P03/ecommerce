import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { hash } from "bcryptjs";
import mysql from "mysql2/promise";
import { signIn } from "next-auth/react";

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
            let passwordMatch = false;
            //const hashedPassword = await hash(password, 10);

            // if (hashedPassword === user.password) {
            //   passwordMatch = true;
            // }
            // console.log(hashedPassword);
            // console.log(passwordMatch);

            if (password === user.password) {
              passwordMatch = true;
            }

            if (!passwordMatch) {
              return null;
            }
            console.log("hey");
            console.log(user);
            return user;
          } else {
            return {
              id: "1234",
              name: "Doe",
              email: "john@gmail.com",
              role: "admin",
            };
          }
        } catch (error) {
          console.error(error);
          return {
            id: "1234",
            name: "awh",
            email: "john@gmail.com",
            role: "admin",
          };
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
