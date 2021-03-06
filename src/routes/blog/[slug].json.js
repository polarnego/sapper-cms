import getFaunaposts from "./_faunaposts";

export async function get(req, res, next) {
	const lookup = new Map()
	let faunaposts = await getFaunaposts()
	faunaposts.forEach((post) => {
		lookup.set(post.slug, JSON.stringify(post))
	});

	const {slug} = req.params
	if (lookup.has(slug)) {
		res.writeHead(200, {
			"Content-Type": "applicaiton/json",
		})
		res.end(lookup.get(slug))
	} else {
		res.writeHead(404, {
			"Content-Type": "application/json",
		})

		res.end(
			JSON.stringify({
				message: 'Not Found'
			})
		)
	}
}