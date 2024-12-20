import style from "./style.module.css";
import colors from "../../assets/colors";
export default ({ children, active, link2 = false }) => {
    return (
        <>
            <div className={style.mylink} style={{ backgroundColor: active ? colors.activeLink : "#ccc",...(active ? {border:"none"} : {})}}>
                {children}
            </div>
        </>
    )
}
