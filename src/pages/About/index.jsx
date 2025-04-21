import { FacebookFilled, XOutlined } from "@ant-design/icons";
import pastorVinImage from "../../assets/pastor.png";
import articles from "../../components/articles";
import Header from "../LandingPage/components/header";

export default () => {
    return (
        <div className="w-100 m-0 p-0 app-bg">
            <Header />
            <div className="w-100 mb-5 row m-0 justify-content-center">
                <div className="col-md-10 col-11 row p-2" style={{ backgroundColor: "#466854" }}>
                    <h1 className="text-white projectFont">
                        About Pastor Vincent
                    </h1>
                    <div className="col-md-8">
                        <div>
                            <p className="text-white">
                                Pastor Sunday Vincent Akeredolu, the President and Founder of Disciples' Charismatic Mission International (incorporated), Ado-Ekiti, Ekiti State, South-Western Nigeria. Born on the 25th of July, some decades ago in Oye-Ekiti, Ekiti State, he started his elementary education at St. Mary's Catholic Primary School, and was admitted into the defunct Christ's National High School (a private secondary school) until the demise of his father. This made him to proceed to St. Augustine's Comprehensive High School, Oye - Ekiti (a public secondary school) where he wrote his WAEC. Due to his poor performance, he started again from SSS2 at Itapa/Osin Comprehensive High School Itapa-Ekiti where he passed his SSCE while he engaged in farming activities to support himself at the same time.
                                He gained admission into College of Education Ikere-Ekiti where he studied Agricultural Education (Double Major) in 2001. He went further to study B. A. (Ed) Primary Education in National Open University of Nigeria. Later, he further his academic career to study Masters in Social Work in Ladoke Akintola University of Technology (LAUTECH), Ogbomoso, Oyo Sate.
                                He was under the tutelage of Rev. J. O. Omoboye at Christian Faith and Fellowship Bible College. He was a summer school student under Rev. Moses Aransiola of Gethsemane Prayer School, Ibadan, Oyo State. He also attended Daniel Prophetic International Bible College under Prophet D. K. Akinboye.
                            </p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div>
                            <img src={pastorVinImage} className="w-100" />
                        </div>
                        <h3 className="text-white projectFont">
                            Vincent
                            Akeredolu
                        </h3>

                    </div>
                </div>
            </div>
            <div className="w-100 mb-5 row m-0 justify-content-center">
                <div className="col-md-10 col-11 row p-2">
                   <div className="px-2">
                    <h3>Connect With Me</h3>
                    <div className="d-flex gap-3 text-dark">
                        <a href="https://www.facebook.com/akeredolu.vincent" target="_blank">
                            <FacebookFilled />
                        </a>
                        <a href="https://x.com/Akeredoluvin?t=ctsZhrnPbKo8NoeVzXRBbg&s=09" target="_blank">
                           <XOutlined />
                        </a>
                    </div>
                   </div>
                </div>
            </div>
        </div>
    )
}