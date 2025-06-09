let createCollectionTable =
`CREATE TABLE collection (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	author TEXT NOT NULL
)`
 
module.exports.createCollectionTable = function() {
    return createCollectionTable;
}

let createCard =
`CREATE TABLE card (
	id INTEGER PRIMARY KEY,
	collection_id INTEGER NOT NULL,
	front TEXT NOT NULL,
    back TEXT NOT NULL,
    FOREIGN KEY(collection_id) REFERENCES collection(id)
)`

module.exports.createCard = function() {
    return createCard;
}

let insertCollection = 
`
	INSERT INTO collection(name, author) VALUES (?, ?)
`
module.exports.insertCollection = function() {
    return insertCollection;
}

let insertCard = 
`
	INSERT INTO card(collection_id, front, back) VALUES (?, ?, ?)
`
module.exports.insertCard = function() {
    return insertCard;
}

let getCollections = 
`
SELECT * FROM collection
`

module.exports.getCollections = function() {
    return getCollections;
}

let getCardsByCollection = `
SELECT * FROM card WHERE collection_id = ?`

module.exports.getCardsByCollection = function() {
	return getCardsByCollection;
}
