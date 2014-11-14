const EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
module.exports = function (lien) {
    var data = Object(lien.data)
      , fields = []
      ;

    if (typeof data.email !== "string" || !EMAIL_REGEX.test(data.email)) {
        fields.push("email");
    }

    if (typeof data.name !== "string" || !data.name.length) {
        fields.push("name");
    }

    if (typeof data.subject !== "string" || !data.subject.length) {
        fields.push("subject");
    }

    if (typeof data.message !== "string" || !data.message.length) {
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
