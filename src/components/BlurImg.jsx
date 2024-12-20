import { LazyLoadImage } from "react-lazy-load-image-component";
export default(props)=>{
    return(
        <div className={props.className} >
            <LazyLoadImage {...props} effect="blur"/>
        </div>
    )
}