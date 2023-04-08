import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { hash } from "bcryptjs";
import { pool } from "../../../config/mysql";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const connection = pool.getConnection();
          console.log("here");

          const [rows] = await connection.query(
            "SELECT * FROM users WHERE username = ? AND role = ?",
            [credentials.username, credentials.role]
          );
          connection.release();
          if (rows.length > 0) {
            const user = rows[0];
            let passwordMatch = false;
            const hashedPassword = await hash(password, 10);

            if (credentials.password === hashedPassword) {
              passwordMatch = true;
            }

            if (!passwordMatch) {
              return null;
            }

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

  database: process.env.NEXTAUTH_DATABASE_URL,
});
