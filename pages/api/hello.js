import connectMongo from "@/config/connectMongo";

export default async function handler(req, res) {
  try {
    await connectMongo();
    console.log("MongoDB connected");
    res.status(200).json({ name: "John Doe" });
  } catch (error) {
    console.error(error);
    res.status(400).send("An error occurred");
  }
}
