const mongoose = require("mongoose")

const connectDatabase = () => {
	mongoose
		.connect(process.env.DB_LOCAL_URI, {
			useUnifiedTopology: true,
		})
		.then(con => {
			console.log(`Baza MongoDB połączyła się z HOSTEM ${con.connection.host}`)
		})
}

module.exports = connectDatabase
