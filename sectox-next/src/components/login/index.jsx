import HeaderOne from "@/src/layout/headers/header";
import React from "react";
import Login from "./Login";
import Footer from "@/src/layout/footers/footer";

const LoginPage = () => {
  return (
    <>
      <HeaderOne />
      <main>
        <Login />
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;