const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");
const bcrypt = require("bcrypt");
const connection = require("./database");

passport.use('local.login', new LocalStrategy({
	usernameField:'email',
	passwordField:'password'
},async(username,password,done)=>{
	const rows = await connection.query(`SELECT * FROM users where email = '${username}'`)
	
	console.log(rows.length)
	if(rows.length > 0){
	
	}else{
		return done(null,false,{message:"No existe el usuario"})
	}
}))

passport.use(
	"local.signup",
	new LocalStrategy(
		{
			usernameField: "email",
			passwordField: "password",
		},
		async (username, password, done) => {
			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			const user = { email: username, password: hash };

			const result = await connection.query("INSERT INTO users SET ?", user);
			user.id = result.insertId;
			done(null, user);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
	const rows = await connection.query(`SELECT * FROM users WHERE id = ${id}`);
	done(null, rows[0]);
});

module.exports = passport