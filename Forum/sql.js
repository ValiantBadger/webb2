let getCategorySQL = `SELECT * FROM category`
 
let createCategorySQL =
`INSERT INTO category(title, description)
VALUES (?, ?)`
 
let createUserSQL =
`INSERT INTO user(username, password, icon_path, bio, creation_date)
VALUES (?, ?, ?, ?, ?)`

let createThreadSQL =
`INSERT INTO thread(title, author_id, creation_date, icon_path, category_id)
VALUES (?, ?, ?, ?, ?)`

let createPostSQL =
`INSERT INTO post(thread_id, author_id, creation_date, image_path, text)
VALUES (?, ?, ?, ?, ?)`

let getUserSQL = `SELECT * FROM user`
let getPostSQL = `SELECT * FROM post`

let getThreadByCategory = `
SELECT * FROM thread WHERE category_id = ?`

let getPostByThread = `
SELECT user.creation_date AS user_creation_date, post.creation_date AS post_creation_date, * FROM post INNER JOIN user ON user.id = post.author_id WHERE thread_id = ?`



module.exports.getThreadByCategory = function() {
    return getThreadByCategory;
}

module.exports.getPostByThread = function() {
    return getPostByThread;
}

module.exports.getCategorySQL = function() {
    return getCategorySQL;
}
 
module.exports.createCategorySQL = function() {
    return createCategorySQL;
}

module.exports.createThreadSQL = function() {
    return createThreadSQL;
}

module.exports.createPostSQL = function() {
    return createPostSQL;
}

module.exports.getPostSQL = function() {
    return getPostSQL;
}

module.exports.createUserSQL = function() {
    return createUserSQL;
}

module.exports.getUserSQL = function() {
    return getUserSQL;
}