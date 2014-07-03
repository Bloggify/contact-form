// Dependencies
var Mandrill = require("mandrill-api/mandrill");

// Mandrill configuration
var MandrillClient = new Mandrill.Mandrill(Config.mandrillConfig.key);

// Attach the new form
Bloggify.form.contact = {
    handler: function (req, res, formData) {

        // TODO Antispam
        MandrillClient.messages.send({
            message: {
                from_email: formData.email
              , from_name: formData.name
              , to: [
                    {
                        email: Config.contact.email
                      , name: Config.contact.name
                    }
                ]
              , subject: formData.subject
              , text: formData.message
            }
        }, function(result) {
            Debug.log(result, "info");
            if (result.reject_reason) {
                return Statique.sendRes(
                    res, 400, "text",
                    JSON.stringify({ message: "Sorry, an error ocured. "
                      + "Try again. If the "
                      + "problem persists, open an issue. We log such "
                      + "errors, so hopefully we will fix them."
                    })
                );
            }

            Statique.sendRes(
                res, 200, "text",
                JSON.stringify({ message: "Thank you for getting in touch. "
                   + "I will try to reply you as soon as posible."
                })
            );
        }, function (error) {
            Debug.log(error, "error");
            return Statique.sendRes(
                res, 400, "text",
                JSON.stringify({ message: "Sorry, an error ocured. "
                  + "Try again. If the "
                  + "problem persists, open an issue. We log such "
                  + "errors, so hopefully we will fix them."
                })
            );
        });
    }
  , validate: {
        email: "email"
      , name: "string,non-empty"
      , subject: "string,non-empty"
      , message: "string,non-empty"
    }
};
