import Layout from "@/components/layout";
import { useSession } from "next-auth/react";
import SellerDashboard from "@/components/temp";
import { useState } from "react";
import AddProducts from "@/components/addProduct";

export default function Index() {
  const { status, data } = useSession();

  const [user, setUser] = useState(null);

  const displayContent = () => {
    if (status == "uauthenticated") {
    } else if (status == "authenticated") {
      setUser(data.token);

      role = data.token.role;

      if (role == "seller") {
        return seller();
      } else if (role == "buyer") {
      } else if (role == "advertiser") {
      }
    } else if (status == "loading") {
    }
  };

  return <Layout />;
}
