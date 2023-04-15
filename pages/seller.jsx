import React from "react";
import { useSession, signOut } from "next-auth/react";
import Temp from "@/components/temp";
import Dashboard from "@/components/seller/sellerDashboard";

export default function Seller() {
  const { status, data } = useSession();
  console.log(status, data);

  if (status === "authenticated") {
    return <Dashboard id={data.token.id} name={data.token.name} />;
  } else {
    // return <Temp id={data.token.id} />;
  }
}
