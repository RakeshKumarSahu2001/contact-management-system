import mongoose from 'mongoose'

async function mongoConnection(uri){
    return await mongoose.connect(uri)
}
export default mongoConnection 