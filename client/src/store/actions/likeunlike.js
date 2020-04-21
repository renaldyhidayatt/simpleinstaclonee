export const likePost = (id) => {
    fetch('/api/posts/like',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body: JSON.stringify({
            postId:id
        })
    }).then(res=>res.json())
    .then(result => {
        const newData = data.map(item => {
            if(item._id==result._id){
                return result
            }else{
                return item
            }
        })
        setData(newData)
    }).catch(err => {
        console.log(err)
    })
}

export const unlikePost = (id) => {
    fetch('/api/posts/unlike',{
        method: "put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId:id
        })
    }).then(res=>res.json())
    .then(result=>{
        const newData = data.map(item=>{
            if(item._id=result._id){
                return result;
            }else{
                return item
            }
        })
        setData(newData)
    }).catch(err => {
        console.log(err)
    })
}