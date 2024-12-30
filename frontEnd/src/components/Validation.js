const Validation=({name,password,email})=>{
    let errors={}
    if(name !== undefined && name.trim() === ''){
        errors.name="Name field requierd"
    }else{
        errors.name=""
    }

    if(password===''){
        errors.password="Password field requierd"
    }else{
        errors.password=""
    }

    if(email===''){
        errors.email="Email field requierd"
    }else{
        errors.email=""
    }
    return errors
}
export default Validation