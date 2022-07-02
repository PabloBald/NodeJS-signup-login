require('dotenv').config()
const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const passport = require('./passport')
const flash = require('express-flash')
const session = require("express-session");
const port = process.env.PORT || 3000;
console.log(process.env.PORT)
app.use(flash())
app.use(
	session({
		secret: "Secret",
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: true,
		},
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.engine(".hbs", exphbs.engine());
app.set("view engine", ".hbs");

app.use(require("./routes/index"));
app.use(require("./routes/auth"));

app.listen(port, () => {
	console.log(`http://localhost:${port}`);
});
