export async function registerUser(req, res, next){
    try {
        throw new Error("This is a custom error")
    } catch (err) {
        err.status = 400
        next(err)
    }
}