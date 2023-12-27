import SEO from "../common/seo";
import HomeOne from "../components/homes/home";
import Wrapper from "../layout/wrapper";

export default function Home() {
  return (
    <Wrapper>
      <SEO pageTitle={"Sectox - CCTV & Security"} />
      <HomeOne /> 
    </Wrapper>
  );
}
