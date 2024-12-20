import { useNavigate } from "react-router-dom"
import articles from "../components/articles"
import Footer from "./LandingPage/components/footer"
import Header from "./LandingPage/components/header"

export default () => {
    const nav = useNavigate();
    const viewArticle = (id) => {
        nav("/article/" + id);
    }
    return (
        <div className="w-100 d-flex flex-column justify-content-between" style={{ minHeight: "100vh" }}>
            <div className="w-100">
                <Header />
                <div className="py-2 px-3">
                    <h3 className="projectFont">
                        Articles
                    </h3>
                </div>
                <div className="w-100 m-0 row py-2 px-3 mb-5">
                    {
                        articles.map(x =>
                            <div key={x.id} onClick={() => { viewArticle(x.id) }} className="col-md-4 col-lg-3 p-2">
                                <div className="W-100">
                                    <img src={x.image} className="w-100 " />
                                </div>
                                <div className="bg-success mt-2 px-2 text-white" style={{ width: "fit-content" }}>{x.date}</div>
                                <div>
                                    <strong>{x.title}</strong>
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
            <Footer />
        </div>
    )
}