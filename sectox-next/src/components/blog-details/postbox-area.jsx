import CommentForm from '@/src/forms/comment-form';
import React from 'react';
import CommentBox from './comment-box';
import SidebarSearch from '@/src/forms/sidebar-search';
import RecentPost from '../blog/recent-post';
import Category from '../blog/category';
import Tags from '../blog/tags';
import Link from 'next/link';


const post_content = {
    des_1: <>Nancy boy Charles down the pub get stuffed mate easy peasy brown bread car boot squiffy loo, blimey arse over tit it's your round cup of char horse play chimney pot old. Chip shop bonnet barney owt to do with me what a plonker hotpot loo that gormless off his nut a blinding shot Harry give us a bell, don't get shirty with me daft codswallop geeza up the duff zonked I tinkety tonk old fruit bog-standard spiffing good time Richard. Are you taking the piss young delinquent wellies absolutely bladdered the BBC Eaton my good sir, cup of tea spiffing bleeder David mufty you mug <span>cor blimey guvnor, burke bog-standard brown</span> bread wind up barney. Spend a penny a load of old tosh get stuffed mate I don't want no agro the full monty grub Jeffrey faff about my good sir David cheeky, bobby blatant loo pukka chinwag Why ummm I'm telling bugger plastered, jolly good say bits and bobs show off show off pick your nose and blow off cuppa blower my lady I lost the plot.</>,

    img: "/assets/img/news/blog-details-5.jpg",
    title: "Sectox is the only theme you will ever need",

    des_2: <>Are you taking the piss young delinquent wellies absolutely bladdered the Eaton my good sir, cup of tea spiffing bleeder David mufty you mug cor blimey guvnor, burke bog-standard brown bread wind up barney. Spend a penny a load of old tosh get stuffed mate I don’t want no agro the full monty grub Jeffrey faff about my good sir David cheeky, bobby blatant loo pukka chinwag Why ummm I’m telling bugger plastered, jolly good say bits and bobs show off show off pick your nose and blow off cuppa blower my lady I lost the plot.</>,
    des_3: <>Cheeky bugger cracking goal starkers lemon squeezy lost the plot pardon me no biggie the BBC burke gosh boot so I said wellies, zonked a load of old tosh bodge barmy skive off he legged it morish spend a penny my good sir wind up hunky-dory. Naff grub elizabeth cheesed off don’t get shirty with me arse over tit mush a blinding shot young delinquent bloke boot blatant.</>,    
}
const {des_1, img, title, des_3, des_2}  = post_content

const PostboxArea = () => {
    return (
        <>
            <div className="postbox__area pt-120 pb-120">
                <div className="container">
                <div className="row">
                    <div className="col-xxl-8">
                        <div className="postbox__wrapper pr-20">

                            <article className="postbox__item format-image mb-50 transition-3">
                            <div className="postbox__content">
                                <div className="postbox__meta">
                                    <span><i className="far fa-calendar-check"></i> July 21, 2020 </span>
                                    <span><a href="#"><i className="far fa-user"></i> jamil rayhan</a></span>
                                    <span><a href="#"><i className="fal fa-comments"></i> 02 Comments</a></span>
                                </div>
                                <h3 className="postbox__title">
                                    How to Clean Your Home Faster and More Efficiently
                                </h3>
                                <div className="postbox__text">
                                    <p>{des_1}</p>        
                                    <p><img src={img} alt="theme-pure" /></p>    
                                    <h3>{title}</h3>    
                                    <p>{des_2}</p>    
                                    <p>{des_3}</p>

                                </div>
    
                                <div className="postbox__tag tagcloud">
                                    <span>Post Tags :</span>
                                    <Link href="/blog-details">Fresh</Link>
                                    <Link href="/blog-details">Home</Link>
                                    <Link href="/blog-details">Kitchen</Link>
                                </div>
                            </div>
                            </article>

                            <div className="postbox__comment mb-65">
                            <h3 className="postbox__comment-title">3 Comments</h3>
                            <CommentBox /> 
                            </div>
                            <div className="postbox__comment-form">
                                <h3 className="postbox__comment-form-title">Write a comment</h3>
                                <CommentForm /> 
                            </div>

                        </div>
                    </div>
                    <div className="col-xxl-4 col-xl-4 col-lg-4">
                        <div className="sidebar__wrapper">
                            <SidebarSearch /> 
                            <RecentPost /> 
                            <Category /> 
                            <Tags />  
                            <div className="sidebar__widget mb-40">
                            <h3 className="sidebar__widget-title">Sponsor Adds</h3>
                            <div className="sidebar__banner w-img p-relative text-center">
                                <img src="/assets/img/news/side-details-img.jpg" alt="theme-pure" />
                                <div className="sidebar__banner-content">
                                    <h4>270x240</h4>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            
        </>
    );
};

export default PostboxArea;