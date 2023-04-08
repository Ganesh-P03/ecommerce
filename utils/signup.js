import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import { hash } from "bcryptjs";
import { pool } from "../config/mysql";

export default signup({
  providers: [
    Providers.Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        name: { label: "Name", type: "text" },
        mobile: { label: "Mobile", type: "text" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        // Get user from MySQL database

        try {
          const { email, password, name, mobile, role } = credentials;
          const hashedPassword = await hash(password, 10);

          const connection = pool.getConnection();

          const results = await connection.query(
            `
          INSERT INTO users (name, email, password, mobile, role)
          VALUES (?, ?, ?, ?, ?)
          `,
            [name, email, hashedPassword, mobile, role]
          );

          connection.release();

          const user = {
            id: results.insertId,
            name: name,
            email: email,
            mobile: mobile,
            role: role,
          };

          return user;
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],

  database: process.env.NEXTAUTH_DATABASE_URL,
});
