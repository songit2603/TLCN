import React from 'react';


const comment_data = [
    {
        id: 1, 
        children: "",
        img: "/assets/img/testimonial/test3.png",
        user: "Eleanor Fant",
        date: "July 14, 2022",
        comment: <>So I said lurgy dropped a clanger Jeffrey bugger cuppa gosh David blatant have it, standard A bit of how's your father my lady absolutely.</>,
    },
    {
        id: 2, 
        children: "children",
        img: "/assets/img/testimonial/test2.png",
        user: "jamil rayhan",
        date: "July 14, 2022",
        comment: <>So I said lurgy dropped a clanger Jeffrey bugger cuppa gosh David blatant have it, standard A bit of how's your father my lady absolutely.</>,
    },
    {
        id: 3, 
        children: "",
        img: "/assets/img/testimonial/test1.png",
        user: "Salim Rana",
        date: "July 14, 2022",
        comment: <>So I said lurgy dropped a clanger Jeffrey bugger cuppa gosh David blatant have it, standard A bit of how's your father my lady absolutely.</>,
    },
]


const CommentBox = () => {
    return (
        <>
            <ul>
                {comment_data.map((item, i) =>
                    <li key={i} className={item.children}>
                            <div className="postbox__comment-box  d-flex">
                                <div className="postbox__comment-info">
                                <div className="postbox__comment-avater mr-20">
                                    <img src={item.img} alt={item.user} />
                                </div> 
                                </div>
                                <div className="postbox__comment-text">
                                <div className="postbox__comment-name">
                                    <h5>{item.user}</h5>
                                    <span className="post-meta">{item.date}</span>
                                </div>
                                <p>{item.comment}</p>
                                <div className="postbox__comment-reply">
                                    <a href="#">Reply</a>
                                </div>
                                </div>
                            </div>
                        </li>            
                        )} 
                </ul>
        </>
    );
};

export default CommentBox;