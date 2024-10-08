import axios from "axios";

class Http {
    static async get(url) {
        try {
            const res = await axios.get(url)
            return res.data
        }
        catch (err){
            throw new Error(err)
        }
    }
}

export default Http;