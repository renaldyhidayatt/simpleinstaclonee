export const makeComment = (text,postId) => {
    fetch('/comment',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify({
            postId,
            text
        })
    }).then(res=>res.json())
    .then(result => {
        console.log(result)
        const newData = data.map(item=>{
            if(item._id==result._id){
                return result
            }else{
                return item;
            }
        })
        setData(newData)
    }).catch(err => {
        console.log(err)
    })
}

export const deletePost = (postid) => {
    fetch(`/deletepost/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result => {
        console.log(result)
        const newData = data.filter(item=>{
            return item._id !== result._id
        })
        setData(newData)
    })
}