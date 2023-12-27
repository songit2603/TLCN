import HeaderOne from "@/src/layout/headers/header";
import React from "react";
import InvoicesDetailsArea from "./invoices-details-area";
import Footer from "@/src/layout/footers/footer";

const InvoicesDetail = () => {
  return (
    <>
      <HeaderOne />
        <InvoicesDetailsArea />
      {/*<Footer />*/}
    </>
  );
};

export default InvoicesDetail;