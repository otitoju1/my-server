

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
                return http.findOne({ _id: id})
            }
            return http.find({}).sort({ "_id": -1})
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
