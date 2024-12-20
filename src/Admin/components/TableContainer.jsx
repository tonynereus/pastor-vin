export default ({ children }) => {
    return (
        <div className="row m-0 justify-content-center" style={{ height: "70svh" }}>
            <div className="col-md-9 col-10 h-100">
                <div className="w-100 h-100">
                    {children}
                </div>
            </div>
        </div>
    )
}