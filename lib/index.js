// Dependencies
var Jade = require("jade")
  , Send = require("./send")
  , ValidateError = require("./validate_error")
  ;

// Init function
module.exports = function (config) {

    // Prepare processors, compile jade file
    var contactForm = this.plugin
      , processor = Bloggify.processors.sitePage[config.contact_page] = Bloggify.processors.sitePage[config.contact_page] || []
      , contactView = Jade.compileFile(__dirname + "/views/contact.jade")
      ;

    // Add the new processor
    processor.push(function (lien, data, content, callback) {

        // Post requests
        if (lien.method === "post") {

            // Validate data
            var err = ValidateError(lien);
            if (err) {
                var result = {
                    error: err.error
                  , fields: err.fields
                  , data: lien.data
                };
                callback(content.replace("{contact_form}", contactView({
                    contactForm: contactForm
                  , result: result
                })));
                return;
            }

            // Send email message
            Send(config, {
                from: {
                    email: lien.data.email
                  , name: lien.data.name
                }
              , subject: lien.data.subject
              , message: lien.data.message
            }, function (err, result) {
                content = content.replace("{contact_form}", contactView({
                    contactForm: contactForm
                  , result: err || result
                }));
                callback(content);
            });
        } else {
            // Handle GET or other method requests
            callback(content.replace("{contact_form}", contactView({
                contactForm: contactForm
            })));
        }
    });
};
