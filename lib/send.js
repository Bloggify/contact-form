// Dependencies
var sendgrid  = require("sendgrid");

var client;

/**
 * send
 * Sends the email to the configured email address.
 *
 * @name send
 * @function
 * @param {Object} config The plugin configuration.
 * @param {Object} data The form data.
 * @param {Function} callback The callback function.
 * @return {undefined}
 */
module.exports = function (config, data, callback) {

    // Configure Mandrill
    client = client || sendgrid(config.api_key);

    // Single callback
    var _cAlready = false;
    function singleClb(e, d) {
        if (_cAlready) { return; }
        if (e) {
            Bloggify.log(e, "error");
            e = { error: "Sorry, an error ocured. In the meantime, open an issue <a href='https://github.com/BloggifyPlugins/contact-form/issues/new' target='_blank'>here</a>." };
        } else {
            d = { success: "Thank you for getting in touch. I will reply you soon! <i class='fa fa-smile-o'></i>" };
        }
        _cAlready = true;
        callback(e, d);
    }

    // Send email message
    client.send({
        to: config.contact.email,
        from: data.from.email,
        subject: data.subject,
        text:  data.message
    }, singleClb);
};
