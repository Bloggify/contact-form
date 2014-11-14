Contact Form
============

The official contact form plugin for Bloggify

## Configuration

```json
{
  "name": "contact-form",
  "source": "git@github.com:BloggifyPlugins/contact-form.git",
  "version": "2.0.0",
  "config": {
    "mandrill_key": "6hv.......grag",
    "contact_page": "/contact",
    "contact": {
        "email": "whoyouare@example.com",
        "name": "Who You Are"
    }
  }
}
```

## Screenshot

> ![](http://i.imgur.com/v566p7k.png)

## Documentation

### `send(config, data, callback)`
Sends the email to the configured email address.

#### Params
- **Object** `config`: The plugin configuration.
- **Object** `data`: The form data.
- **Function** `callback`: The callback function.

### `validateError(lien)`
Validates form data.

#### Params
- **Object** `lien`: The lien object.

#### Return
- **Object|null** A validate_error object (containing `error` and `fields` properties) or `null` if the form data is valid.


## License

See the [LICENSE](./LICENSE) file.
