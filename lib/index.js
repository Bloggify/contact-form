const Pug = require("pug")
    , ValidateError = require("./validate_error")

const RESPONSES = {
    ERROR: { error: "Sorry, an error ocured. In the meantime, open an issue <a href='https://github.com/BloggifyPlugins/contact-form/issues/new' target='_blank'>here</a>." }
  , SUCCESS: { success: "Thank you for getting in touch. I will reply you soon! <i class='fa fa-smile-o'></i>" }
}

// Init function
module.exports = config => {

    let sendEmail = null
    Bloggify.initPlugin("sendgrid", {
        key: config.sendgrid_key
    }).then(sendgrid => {
        sendEmail = Bloggify.require("sendgrid", true).send
    }).catch(err => {
        Bloggify.log(err)
    })

    const contactView = Pug.compileFile(__dirname + "/views/contact.pug")

    Bloggify.server.hook("after", config.contact_page, (context, cb) => {
        const ctx = context.lien
        debugger
        // Post requests
        if (ctx.method === "post") {
            // Validate data
            const err = ValidateError(ctx)
            if (err) {
                const result = {
                    error: err.error
                  , fields: err.fields
                  , data: ctx.data
                }
                context.content = context.content.replace("{contact_form}", contactView({
                    contactForm: config
                  , result
                  , ctx
                }))
                cb()
            } else {
                sendEmail({
                    to: config.contact.email
                  , from: {
                      email: ctx.data.email
                    , name: ctx.data.name
                    }
                  , subject: ctx.data.subject
                  , text: ctx.data.message
                }).then(res => {
                    context.content = context.content.replace("{contact_form}", contactView({
                        contactForm: config
                      , result: err ? RESPONSES.ERROR : RESPONSES.SUCCESS
                      , ctx
                    }))
                    cb()
                }).catch(err => {
                    Bloggify.log(err, "error")
                    context.content = context.content.replace("{contact_form}", contactView({
                        contactForm: config
                      , result: RESPONSES.ERROR
                      , ctx
                    }))
                    cb()
                })
            }
        } else {
            // Handle GET or other method requests
            context.content = context.content.replace("{contact_form}", contactView({
                contactForm: config
              , ctx
            }))
            cb()
        }
    })
}
