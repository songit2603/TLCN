import HeaderOne from "@/src/layout/headers/header";
import React from "react";
import Register from "./Register";
import Footer from "@/src/layout/footers/footer";

const RegisterPage = () => {
  return (
    <>
      <HeaderOne />
      <main>
        <Register />
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;