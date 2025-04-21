import { useLocation, useNavigate, Link } from "react-router-dom";
import Header from "./components/header";
import Footer from "./components/footer";
import pastorVinImage from "../../assets/pastor.png";
import articles from "../../components/articles";

export default () => {
    const location = useLocation();
    const nav = useNavigate();
    const viewArticle = (id) => {
        nav("/article/" + id);
    }
    return (
        <div className="w-100 m-0 p-0 app-bg">
            <Header />
            <div className="w-100 mb-5 row m-0 justify-content-center">
                <div className="col-md-10 col-12 row reverse-columns">
                    <div className="col-md-6">
                        <div>
                            <h1 className="projectFont text-center">
                                Lessons from the life of David (1)
                            </h1>
                            <address>
                                18 JUN, 2024 | Vincent Akeredolu
                            </address>
                            <p>
                                <b>
                                    “… David in spirit call him Lord, saying, The LORD said to my Lord, sit thou on my right hand, till I make thy enemies thy footstool” (Matt 22:43-44)  David In The Spirit </b>
                                David was a king of Israel and was also a prophet. The Spirit of the Lord God was upon him and he heard His word several times. He was one of the few prophets that saw Jesus Christ in the spirit realm during their lifetime............
                                <Link to={"/article/2"}>
                                    <span>Read more</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="w-100 p-3 row m-0 align-items-center reverse-columns" style={{ backgroundColor: "#466854", borderRadius: 20 }}>
                            <div className="col-md-4 text-white">
                                <h2 className="projectFont">
                                    Vincent
                                    Akeredolu
                                </h2>
                                <Link to={"/about"}>
                                    <p className="text-underline  text-white" style={{ textDecoration: "underline" }}>
                                        My message to you
                                    </p>
                                </Link>
                            </div>
                            <div className="col-md-8">
                                <img src={pastorVinImage} className="w-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* video preview */}
            <div className="w-100 row m-0 justify-content-center ">
                <div className="col-md-10 col-12 row gap-2">
                    <div className="col-md-5 mb-3 p-0">
                        <div>
                            <iframe className="w-100" height="315"
                                src="https://www.youtube.com/embed/I3a-UOO0j1M"
                                srcb="https://youtu.be/9IiTdSnmS7E?si=FiDVuVFbW0x8FC4r">
                            </iframe>
                        </div>
                    </div>
                    <div className="col-md-6  px-1">
                        <div className="text">
                            <h5>
                                Recent Articles
                            </h5>
                        </div>
                        {
                            articles.map((x, ind) => {
                                return (
                                    <>
                                        {
                                            ind < 2 ? <div onClick={() => { viewArticle(x.id) }} key={ind} className="w-100 row m-0 align-items-stretch">
                                                <div className="col-md-5 p-0  text-white mb-1">
                                                    <img src={x.image} className="w-100 h-100" />
                                                </div>
                                                <div className="col-md-7 py-2" style={{paddingLeft:"10px"}}>
                                                    <strong>{x.title}</strong>
                                                    <p>{x.lesson}</p>
                                                </div>
                                            </div> : <></>
                                        }
                                    </>
                                )
                            })
                        }

                    </div>
                </div>
            </div>
            {/* articles section */}
            <div className="w-100 mt-5 row m-0 justify-content-center">
                <div className="col-md-10 col-12 p-0">
                    <div className="px-1">
                        <h1 className="projectFont">
                            Articles
                        </h1>
                    </div>
                    <div className="row m-0 w-100 align-items-stretch">
                        {
                            articles.map((x, ind) => {
                                return (
                                    <>
                                        {
                                            ind > 1 ? <div onClick={() => { viewArticle(x.id) }} key={ind} className="p-2 col-sm-6 col-md-4 col-lg-3 m-0">
                                                <div style={{ height: 150 }}>
                                                    <img src={x.image} className="w-100 h-100" />
                                                </div>
                                                <div className="py-2">
                                                    <div className="bg-success text-white px-1" style={{ width: "fit-content" }}>
                                                        {x.date}
                                                    </div>
                                                    <strong>{x.title}</strong>
                                                </div>
                                            </div> : <></>
                                        }
                                    </>
                                )
                            })
                        }
                    </div>

                </div>
            </div>
            <div className="mt-5">

            </div>
            <Footer />
        </div>
    )
}