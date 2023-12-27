import React from 'react';
import Wrapper from '../layout/wrapper';
import SEO from '../common/seo';
import Profile from '../components/profile';

const index = () => {
    return (
        <Wrapper>
            <SEO pageTitle={"Sectox - CCTV & Security"} />
            <Profile />            
        </Wrapper>
    );
};

export default index;