

class UserService {

    static async post(data, http) {
        try {
            return http.create(data)
        } catch (error) {
            return error
        }
    }

    static async get(http, id) {
        try {
            if(id) {
                return http.findOne({ _id: id}).sort({ "_id": -1})
            }
            return http.find({})
        } catch (error) {
            return error
        }
    }

    static async delete(http, id) {
        try {
            return http.findOneAndDelete({ _id: id })
        } catch (error) {
            return error
        }
    }

    static async put(http, id) {
        try {
            return http.findOneAndUpdate({ _id: id })
        } catch (error) {
            return error
        }
    }
}

module.exports = UserService
