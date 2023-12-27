import React from 'react';
import Wrapper from '../../layout/wrapper';
import SEO from '../../common/seo';
import InvoicesDetails from '../../components/invoices-details';

const index = () => {
    return (
        <Wrapper>
            <SEO pageTitle={"Sectox - CCTV & Security"} />
            <InvoicesDetails />            
        </Wrapper>
    );
};

export default InvoicesDetails;