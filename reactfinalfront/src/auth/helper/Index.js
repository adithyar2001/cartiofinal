import { emptyCart } from "../../core/helper/Carthelper";
// export const signup = (user)=>{
//     return fetch (`${http://127.0.0.1:8000/api}/user/`,{
//         method:"POST",
//         headers:{     
//             Accept:"application/json", 
//             "content-Type":"application/json"
//         },
//         body:JSON.stringify(user)
//         })
//         .then(response=>{
//             return response.json()
//         })
//         .catch(err=>console.log(err))
// }
// export const signup = (user) => {
//     return fetch(`http://127.0.0.1:8000/api/user/`, {
//         method: "POST",
//         headers: {     
//             Accept: "application/json", 
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(user)
//     })
//     .then(response => {
//         return response.json();
//     })
//     .catch(err => console.log(err));
// }

export const signup = (user) => {
    console.log("User data:", user);
    return fetch(`http://127.0.0.1:8000/api/user/`, {
        method: "POST",
        headers: {     
            Accept: "application/json", 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => {
        console.log("Response:", response);
        return response.json();
    })
    .catch(err => {
        console.error("Error:", err); 
    });
}
export const authenticate =(data,next)=>{
    if(typeof window !== undefined){
        localStorage.setItem("jwt",JSON.stringify(data));
        next();
    }
}

export const isAuthenticated =()=>{
    if(typeof window == undefined){
        return false
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }
    else{
        return false;
    }
}
export const signout =(next)=>{
    const userId = isAuthenticated()&& isAuthenticated().user.id
    if(typeof window !== undefined){
        localStorage.removeItem('jwt')
        emptyCart(()=>{})
        
        return fetch(`http://127.0.0.1:8000/api/user/logout/${userId}`,{
            method:"GET"
        })
        .then(response=>{
            console.log('Logged out')
        next()
    })

        .catch((err)=>{console.log(err);})
    }
}