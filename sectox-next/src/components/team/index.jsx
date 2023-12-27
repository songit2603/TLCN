import Breadcrumb from "@/src/common/breadcrumbs/breadcrumb";
import Footer from "@/src/layout/footers/footer";
import HeaderOne from "@/src/layout/headers/header";
import React from "react";
import TeamArea from "./team-area";
import SkillArea from "./skill-area";

const Team = () => {
  return (
    <>
      <HeaderOne />
      <main>
        <Breadcrumb title=" Team" innertitle=" Team Page" />
        <TeamArea />
        <SkillArea />
      </main>
      <Footer />
    </>
  );
};

export default Team;
