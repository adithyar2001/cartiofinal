export  const getPtoken = (userId,token)=>{
    return fetch(`http://127.0.0.1:8000/api/payment/gettoken/${userId}/${token}/`,{
        method:'GET',
    })
    .then((response) => {
        return response.json()
    })
    .catch(err=>console.log(err))       
}
export const payemntProcess = (userId,token,paymentInfo)=>{
    const formData = new FormData();
    for(const name in paymentInfo){
        formData.append(name,paymentInfo[name])
    }
    return fetch(`http://127.0.0.1:8000/api/payment/process/${userId}/${token}/`,{
        method:'POST',
        body:formData
    })
    .then((response)=>{
        return response.json();
    })
    .catch((err)=>console.log(err))    
}