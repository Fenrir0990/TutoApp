const axios = require("axios");
const { urlApi } = require(".");
/********** Validators **********/
 const isValidUrl = (str) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
     return pattern.test(str);
}

const validateForm = (data)=>{
    var {title,description,url} = data;
    let not = true
    var error = {
        description:{},
        url:{}
    }
    
    if(!title) {
        error.title = true
        not = false
    }
    else{
        error.title = false
    }
    if(!description) {
        error.description.required = true
        not = false
    }
    else {
        error.description.required = false
    }
    if(description.length < 10){
        error.description.min = true
        not = false
    }else{
        error.description.min = false
    }
    if(!isValidUrl(url)){
        error.url.notValid = true
        not = false
        
        }
    else{
        error.url.notValid = false
    }
    
    return {not,error}
              
               
}
/********** Functions Axios **********/
const getAllTutorials = async () => {
    const {data} = await axios.get( urlApi + "/tutorials" ).then(r => r)
    if(typeof data === 'object') return []
    return data
};
const post = async (payload) => {
    if( typeof payload === "object") return "Data type error, expected object"
    const {data} = await axios.post(urlApi + "/tutorials", payload)
    return data
};
const put = async (payload,id) => {
    if( typeof payload === "object") return "Data type error, expected object"
    const {data} = await axios.put(urlApi + `/tutorials/${id}`,payload)
    return data
};
const deleteId = async (id) => {
    const {data} = await axios.delete( urlApi + `/tutorials/${id}`)
    return data
};
const deleteAll = async () => {
    const {data} = await axios.delete( urlApi + "/tutorials/mass_delete")
    return data
};
module.exports = {
    validateForm,
    getAllTutorials,
    deleteAll,
    deleteId,
    post,
    put
}