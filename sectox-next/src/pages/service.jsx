import React from 'react';
import Wrapper from '../layout/wrapper';
import SEO from '../common/seo';
import Service from '../components/service';

const index = () => {
    return (
        <Wrapper>
            <SEO pageTitle={"Sectox - CCTV & Security"} />
            <Service />            
        </Wrapper>
    );
};

export default index;