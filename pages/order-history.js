import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { Store } from "../utils/Store";

function OrderHistory() {
  const { state } = useContext(Store);
  const router = useRouter();
  const { userInfo } = state;
  useEffect(() => {
    if (!userInfo) {
      router.push("/login");
    }
  }, []);
  return <div></div>;
}

export default dynamic(() => Promise.resolve(OrderHistory), { ssr: false });
