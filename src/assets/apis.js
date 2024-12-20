// const base = "https://chemteclabsolutions.com/filesystem/";
const base = "http://localhost/chem2/";
const apis = {
    userCheck:base+"logged.php?is_active=kqj",
    addSample:base+"addSample.php",
    activeAdmin:base+"activeAdmin.php?isActive",
    uploadSampleAdmin:base+"uploadSampleAdmin.php",
    uploadedSampleAdmin:base+"uploadedSamplesAdmin.php?uploaded",
    getAdminSample:base+"getAdminSample.php",
    updateAdminSample:base+"updateAdminSample.php",
    confimPay:base+"confirmpay.php",
    logout:base+"logout.php",
    register:base+"register.php",
    signin:base+"signin.php",
    getUsers:base+"getUsers.php",
    createOrder:base+"createOrder.php",
    openOrders:base+"openOrders.php?get_orders",
    getOrder:base+"getOrder.php",
    orderInfo:base+"orderInfo.php",
    getOrderSamples:base+"getOrderSamples.php",
    getSampleDetail:base+"getSampleDetail.php",
    allOrders:base+"getAllOrders.php",
    uploadResult:base+"uploadResult.php",
    makeEdit:base+"makeEdit.php",
    sampleTesting:base+"sampleTesting.php",
    payment:base+"gourl/processpay.php",
    payment2:base+"gourl2/processpay.php",
    publishSample:base+"publish.php",
    credentials:"include",
    cartCnt:base+"cartcnt.php",
    deleteOder:base+"deleteOrder.php" ,
    logged:function(){
        return new Promise((res,rej)=>{
            fetch(
                this.userCheck,{
                    method:"GET",
                    credentials:this.credentials
                }
            ).then(
                async (x)=>{
                    var resu = await x.json();
                    if(typeof resu == 'boolean' || resu == "ADMIN"){
                        res(resu);
                    }else{
                        res(false);
                    }
                }
            ).catch(
                (err)=>{
                    rej(true)
                }
            )
        })
    }
}
export default apis;