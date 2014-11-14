// Dependencies
var Mandrill = require("mandrill-api/mandrill")
  , MandrillClient = null
  ;

module.exports = function (config, data, callback) {

    MandrillClient = MandrillClient || new Mandrill.Mandrill(config.mandrill_key);

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

    MandrillClient.messages.send({
        message: {
            from_email: data.from.email
          , from_name: data.from.name
          , to: [
                {
                    email: config.contact.email
                  , name: config.contact.name
                }
            ]
          , subject: data.subject
          , text: data.message
        }
    }, function(result) {
        if (result.reject_reason) {
            return singleClb(result);
        }
        singleClb(null)
    }, function (error) {
        singleClb(error);
    });
};
