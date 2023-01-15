var mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((client, err) => {
    if (err) {
      console.log("Something went wrong!", err);
    } else {
      const obj = {
        DB_NAME: client.connections[0].name,
        HOST: client.connections[0].host,
        PORT: client.connections[0].port,
      };
      console.log(`Connected to db`);
      console.log(obj);
    }
  })
  .catch((err) => {
    console.log("Something went wrong!", err);
  });
