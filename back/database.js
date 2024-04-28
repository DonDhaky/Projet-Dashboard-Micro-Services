const mysql = require('mysql2');

const connection = mysql.createConnection({
	host : 'localhost',
	database : 'login',
	user : 'clem',
	password : '1234'
});

connection.connect(function(error){
	if(error)
	{
		throw error;
	}
	else
	{
		console.log('MySQL Database is connected Successfully');
	}
});

module.exports = connection;
