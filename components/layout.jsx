import Navbar from "./navBar";
import Footer from "./footer";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div style={{ margin: "10px" }}>{children}</div>
      <Footer />
    </div>
  );
}
