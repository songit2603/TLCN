import team_data from '@/src/data/team-data';
import Link from 'next/link';
import React from 'react';

const TeamArea = () => {
    return (
        <>
            <div className="tp-team-area pt-115 pb-80">
                <div className="container">
                    <div className="row">
                        {team_data.map((item, i) => 
                            <div key={i} className="col-xl-3 col-lg-4 col-md-6">
                                <div className="tp-team-item mb-30">
                                    <div className="tp-team-img p-relative">
                                        <div className="fix"><a href="#"><img src={item.img} /></a></div>
                                        <div className="tp-team-overlay">
                                            <div className="team-overlay-icon">
                                            <a className="team-icon-main" href="#"><i className="fal fa-plus"></i></a>
                                            <div className="team-icon-bottom">
                                                <a href="#"><i className="fab fa-instagram"></i></a>
                                                <a href="#"><i className="fab fa-google"></i></a>
                                                <a href="#"><i className="fab fa-facebook-f"></i></a>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="tp-team-designation text-center pt-35">
                                        <h5 className="client-name"><Link href="/team-details">Alexios D. Dowson</Link></h5>
                                        <a className="client-position" href="#">Founder</a>
                                    </div>
                                </div>
                            </div>                        
                        )} 
                    </div>
                </div>
            </div>            
        </>
    );
};

export default TeamArea;