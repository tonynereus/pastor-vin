import style from "./style.module.css";
export default ({active,link,clicked})=>{
    return(
        <div className={active ? style.myLinkActive:style.myLink} onClick={clicked}>
            <div className="w-100 py-3 text-center">
                {link}
            </div>
        </div>
    )
}