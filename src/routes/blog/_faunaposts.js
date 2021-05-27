// Ordinarily, you'd generate this data from markdown files in your
// repo, or fetch them from a database of some kind. But in order to
// avoid unnecessary dependencies in the starter template, and in the
// service of obviousness, we're just going to leave it here.

// This file is called `_posts.js` rather than `posts.js`, because
// we don't want to create an `/blog/posts` route — the leading
// underscore tells Sapper not to do that.

const faunadb = require('faunadb')
const q = faunadb.query
const client = new faunadb.Client({secret: 'fnAEKNl-WHACCkJRfCaeZZRUqTeh8Z2qko5JHFCM'})

const getFaunaposts = async() => {
	try {
		const {data} = await client.query(
			q.Map(
				q.Paginate(q.Documents(q.Collection('posts'))),
				q.Lambda(x => q.Select(['data'], q.Get(x)))
			)
		)
		return data
	} catch(e) {
		console.log(e)
	}
}

export default getFaunaposts;
