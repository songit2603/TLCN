import React from 'react';
import Wrapper from '../../layout/wrapper';
import SEO from '../../common/seo';
import OrderDetails from '../../components/order-details';

const index = () => {
    return (
        <Wrapper>
            <SEO pageTitle={"Sectox - CCTV & Security"} />
            <OrderDetails />            
        </Wrapper>
    );
};

export default index;