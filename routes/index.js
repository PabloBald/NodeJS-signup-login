const express = require("express");
const router = express.Router();
const moment = require("moment");
const connection = require("../database");

router.get("/", async (req, res) => {
	try {
		const results = await connection.query("SELECT * FROM posts");
		res.render("index", { results });
	} catch ($e) {
		res.render("errorpage");
	}
});
router.get("/show/:id", (req, res) => {
	const { id } = req.params;
	connection.query(
		`SELECT * FROM posts WHERE id = ${id}`,
		(err, results) => {
			if (err) throw err;
			res.render("show", { article: results[0] });
		}
	);
});
router.get("/create", (req, res) => {
	res.render("create");
});
router.post("/store", (req, res) => {
	const { title, body, publish_date } = req.body;
	connection.query(
		`INSERT INTO posts SET ?`,
		{ title, body, publish_date },
		(err, results) => {
			if (err) throw err;
			console.log(results);
			res.redirect("/");
		}
	);
});

router.get("/edit/:id", (req, res) => {
	const { id } = req.params;
	connection.query(
		`SELECT * FROM posts WHERE id = ${id}`,
		(err, results) => {
			if (err) throw err;
			results[0].publish_date = moment(results[0].publish_date).format(
				"YYYY-MM-DD"
			);
			res.render("edit", { article: results[0] });
		}
	);
});
router.post("/update/:id", (req, res) => {
	const { id } = req.params;
	const { title, body, publish_date } = req.body;
	connection.query(
		`UPDATE posts SET ? WHERE id = ${id}`,
		{ title, body, publish_date },
		(err) => {
			if (err) throw err;
			res.redirect("/");
		}
	);
});
router.get("/delete/:id", (req, res) => {
	const { id } = req.params;
	connection.query(`DELETE FROM posts WHERE id=${id}`, (err) => {
		if (err) throw err;
		res.redirect("/");
	});
});

module.exports = router

