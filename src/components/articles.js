import articleImg1 from "../assets/article1.png";
import articleImg2 from "../assets/article2.png";
import articleImg3 from "../assets/article3.png";
import articleImg4 from "../assets/article4.jpg";

const articles = [
    {
        id: 4,
        image: articleImg4,
        title: "SIMON THE CROSS-BEARER", // AND WHY AFRICANS SHOULD EMBRACE JESUS CHRIST
        lesson: '“And as they led Him (Jesus Christ) away, they laid hold upon one Simon, a Cyrenian, coming out of the country, and on him they laid the cross, that he might bear it after Jesus” (cf. Luke 23:26)',
        date: "21 April 2025"
    },
    {
        id: 1,
        image: articleImg1,
        title: "Lessons from the life of David (2)",
        lesson: '“Nevertheless for David’s sake did the Lord his God give him a lamp in Jerusalem, to set up his son after him, to establish Jerusalem” (1Kings 15:4)',
        date: "13 Nov 2024"
    },
    {
        id: 2,
        image: articleImg2,
        title: "Lessons from the life of David (1)",
        lesson: '“… David in spirit call him Lord, saying, The LORD said to my Lord, sit thou on my right hand, till I make thy enemies thy footstool” (Matt 22:43-44)',
        date: "13 Nov 2024"
    },
    {
        id: 3,
        image: articleImg3,
        title: "Christian youths and dating (Jer 35 : 1-10) (Boyfriend and girlfriend affairs)",
        lesson: 'Love your self',
        date: "13 Nov 2024"
    },
];

export function getArticleById(id) {
    let target;
    articles.map(x => {
        x.id == id ? target = x : null;
    });

    !target ? target = articles[0] : null;

    return target;
}

export default articles;