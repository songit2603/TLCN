import React, { useState,useEffect  } from "react";
import { Col, Container, Row } from "reactstrap";
import Widget from "./Widgets";
import BestSellingProducts from "./BestSellingProducts";
import RecentActivity from "./RecentActivity";
import RecentOrders from "./RecentOrders";
import Revenue from "./Revenue";
import SalesByLocations from "./SalesByLocations";
import PrivacyPolicy from "../../pages/Pages/PrivacyPolicy"
import Section from "./Section";
import StoreVisits from "./StoreVisits";
import TopSellers from "./TopSellers";
import { useSelector, useDispatch } from "react-redux";
import { getRevenueChartsData } from "../../slices/thunks";
import { createSelector } from "reselect";
const DashboardEcommerce = () => {
  const dispatch = useDispatch();
  const [dataRevenue, setDataRevenue] = useState([]);
  const selectDashboardData = createSelector(
    (state) => state.DashboardEcommerce.revenueData,
    (revenueData) => revenueData
  );
  // Inside your component
  const revenueData = useSelector(selectDashboardData);

  useEffect(() => {
    setDataRevenue(revenueData);
    console.log(dataRevenue);
  }, [revenueData]);

  useEffect(() => {
    dispatch(getRevenueChartsData("all"));
  }, [dispatch]);
  document.title = "Dashboard | Velzon - React Admin & Dashboard Template";

  const [rightColumn, setRightColumn] = useState(false);
  const toggleRightColumn = () => {
    setRightColumn(!rightColumn);
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
        
          <Row>
            <Col>
              <div className="h-100">
                <Section rightClickBtn={toggleRightColumn} />
               <Row>
                  <Widget dataRevenue={dataRevenue}/>
                </Row>
                {/*<Row>
                  <Col xl={8}>
                     <Revenue />
                  </Col>
                  <SalesByLocations /> 
                  
                  </Row>*/}
                <Row>
                  <BestSellingProducts  dataRevenue={dataRevenue}/>
                  <PrivacyPolicy/>
                  {/*<TopSellers />*/}
                </Row>
                {/*<Row>
                  <StoreVisits />
                  <RecentOrders />
                </Row>*/}
              </div>
            </Col>
            <RecentActivity rightColumn={rightColumn} hideRightColumn={toggleRightColumn} />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DashboardEcommerce;
