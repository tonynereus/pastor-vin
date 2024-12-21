import { useNavigate, useParams } from "react-router-dom";
import Article1 from "./Article1";
import Header from "../LandingPage/components/header";
import { useEffect, useState } from "react";
import articles, { getArticleById } from "../../components/articles";
import Article2 from "./Article2";
import Article3 from "./Article3";
import Footer from "../LandingPage/components/footer";

export default () => {
    const { id } = useParams();
    const nav = useNavigate();

    const viewArticle = (id) => {
        nav("/article/" + id);
    }

    const [article, setArticle] = useState();
    useEffect(() => {
        setArticle(getArticleById(id));
    }, [id]);
    console.log(id);
    return (
        <>
            <div className="w-100" >
                <Header />
                {
                    article && <>
                        <h2 className="text-center projectFont">{article.title}</h2>
                        <p className="text-center">
                            {article.date} |  Vincent Akeredolu
                        </p>
                    </>
                }
                <div className="w-100 row m-0 justify-content-center mb-3">
                    <div className="col-md-10 col-12 row">
                        <div className="col-md-9 m-0 mb-3" style={{ backgroundColor: "#F4F4F4" }}>
                            {
                                article && <>
                                    <img src={article.image} className="w-100" />
                                </>
                            }
                            <div className="py-2"> </div>
                            {
                                id == 1 && <Article1 />
                            }
                            {
                                id == 2 && <Article2 />
                            }
                            {
                                id == 3 && <Article3 />
                            }
                        </div>
                        <div className="col-md-3 m-0 p-1">
                            {/* <h3>More Articles</h3> */}
                            {
                                articles.map((x, ind) =>
                                    <>
                                        {
                                            x.id != id ? <div onClick={()=>{viewArticle(x.id)}} className="w-100 p-0 mb-2" key={ind}>
                                                <img src={x.image} className="w-100" />
                                                <div className="bg-success mt-2 px-2 text-white" style={{ width: "fit-content" }}>{x.date}</div>
                                                <div>
                                                    <strong>{x.title}</strong>
                                                </div>
                                            </div> : <></>
                                        }
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </>
    )
}