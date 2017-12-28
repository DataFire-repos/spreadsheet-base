# Spreadsheet API
Create an API using Google Sheets as a backend

[Fork this project on DataFire.io](https://app.datafire.io/projects?baseRepo=https:%2F%2Fgithub.com%2FDataFire-repos%2Fspreadsheet-base)

## Setup
You'll need to connect your Google account, and create a
new spreadsheet to store your data.

* Go to **Project** -> **Settings** and click "Run Setup"
  * Connect your Google account
  * Pick a title for your spreadsheet
* Once the setup is done, save your project

You'll see the spreadsheetId in your settings page. You can access the created spreadsheet at:
`https://docs.google.com/spreadsheets/d/$SPREADSHEET_ID`

## Desiging the API

### Inputs and Validation
The inputs for your spreadsheet are contained in Actions -> create,
under the "Inputs" section. By default, you'll see inputs for "name" and
"age". You can change these to whatever you want.

Validation is done using JSON Schema, so you can force inputs to match
minimums, maxiumums, regular expressions, etc.

### URLs
The URLs exposed by your API are under "Triggers" -> "Paths". By default
these URLs are `GET /pets`, `GET /pets/{id}`, and `POST /pets`. You can change
the word "pets" in these URLs to anything you want.

## Example: blog comments
Say we want to create an API that allows people to create comments on our blog.
Each comment will have a blog post ID, the author's email, a subject, and the content.

### Changing inputs
* Navigate to "Actions" -> "create"
* Remove the "age" and "name" inputs
* Create a new string input `email`
  * For simple validation, add the `regex` ".+\@.+\..+"
  * For more robust validation, you can use the [validator](https://github.com/chriso/validator.js/) library
  * Set default to "" if you don't want to require an e-mail address
* Create a new number input `blog_post_id`
* Create a new string input `subject`
  * Set `default` to "[no subject]"
  * Set `maxLength` to something reasonable, like 100
* Create a new  string input `content`
  * Set `maxLength` to something reasonable, like 1000
  * Set `minLength` to 1 to make sure every post has a body
  
### Changing URLs
* Navigate to "Triggers" -> "Paths"
* Change the `GET /pets` URL to `GET /comments`
* Change the `GET /pets/{id}` URL to `GET /comments/{id}`
* Change the `POST /pets` URL to `POST /comments`

### Run your project
* Click "Deploy" to launch your project
* Add a new comment:
```bash
curl -X POST https://$PROJECT_ID.dev.with-datafire.io/comments -d '{"blog_post_id": 1, "content": "Hello!"}' -H "Content-Type: application/json"
```
* Check your spreadsheet to see that the new post is there
```bash
curl https://$PROJECT_ID.dev.with-datafire.io/comments
# [{
#  "id": 1,
#  "blog_post_id": 1,
#  "content": "Hello!"
# }]
```

### Bonus: filter by blog_post_id
Currently the `GET /comments` URL returns comments for **every** post, not just the post
we care about. However, we can modify the `retrieve` action to allow filtering by `blog_post_id`.

* Navigate to "Actions" -> "retrieve"
* Add a new integer input, `blog_post_id`
  * Set the default to -1, meaning don't filter by `blog_post_id`
* In the code editor, scroll to the bottom of the code
* At the bottom of the last block, add this conditional:
```js
if (input.blog_post_id !== -1) {
  rows = rows.filter(row => row.blog_post_id === input.blog_post_id);
}
```
