// Constants
const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
    , validify = require("validify")
    , deffy = require("deffy")

/**
 * validateError
 * Validates form data.
 *
 * @name validateError
 * @function
 * @param {Object} ctx The ctx object.
 * @return {Object|null} A validate_error object (containing `error` and `fields` properties) or `null` if the form data is valid.
 */
module.exports = ctx => {

    const data = Object(ctx.data)
        , fields = []

    data.email = deffy(data.email, "").trim()
    data.name = deffy(data.name, "").trim()
    data.subject = deffy(data.subject, "").trim()
    data.message = deffy(data.message, "").trim()

    // Email
    if (!EMAIL_REGEX.test(data.email)) {
        fields.push("email")
    }

    if (data.name.length < 2) {
        fields.push("name");
    }

    if (data.subject.length < 4) {
        fields.push("subject");
    }

    if (data.message.length < 5) {
        fields.push("message");
    }

    if (fields.length) {
        return {
            error: "validate_error"
          , fields: fields
        }
    }

    return null;
};
