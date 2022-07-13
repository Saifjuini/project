const mysql = require("mysql2");
const createTables = require("./config");
const Promise = require("bluebird");
const database = "registrer";

const connection = mysql.createConnection({
  user: "root",
  password: "root",
});

const db = Promise.promisifyAll(connection, { multiArgs: true });

const getAllNames = (username, callback) => {
  const sql = "SELECT * FROM accounts WHERE username = ? ";
  connection.query(sql, [username], (err, result) => {
    callback(err, result);
  });
};

const getAllEmails = (email, callback) => {
  const sql = "SELECT * FROM accounts WHERE email = ? ";
  connection.query(sql, [email], (err, result) => {
    callback(err, result);
  });
};

const signupAdmin = (username, email, image, password, role, callback) => {
  const sql =
    "INSERT INTO accounts (username,email,image,password,role) VALUES (?,?,?,?,?)";
  connection.query(
    sql,
    [username, email, image, password, role],
    (err, result) => {
      callback(err, result);
    }
  );
};

const signup = (username, email, image, password, callback) => {
  const sql =
    "INSERT INTO accounts (username,email,image,password) VALUES (?,?,?,?)";
  connection.query(sql, [username, email, image, password], (err, result) => {
    callback(err, result);
  });
};

const signupWithoutimg = (username, email, password, callback) => {
  const sql = "INSERT INTO accounts (username,email,password) VALUES (?,?,?)";
  connection.query(sql, [username, email, password], (err, result) => {
    callback(err, result);
  });
};

const getPasswordByEmail = (email, callback) => {
  const sql = "SELECT password FROM accounts WHERE email = ?;";
  connection.query(sql, [email], (err, result) => {
    callback(err, result);
  });
};

const getUserNameandImage = (email, callback) => {
  const sql = "SELECT username, image FROM accounts WHERE email = ?;";
  connection.query(sql, [email], (err, result) => {
    callback(err, result);
  });
};
const getusername = (email, callback) => {
  const sql = "SELECT username FROM accounts WHERE email =?";
  connection.query(sql, [email], (err, result) => {
    callback(err, result);
  });
};

const postItemwithdisc = (
  title,
  description,
  image,
  price,
  discount,
  gender,
  callback
) => {
  const sql =
    "INSERT INTO items (title,description,image,price,discount,gender) VALUES (?,?,?,?,?,?)";
  connection.query(
    sql,
    [title, description, image, price, discount, gender],
    (err, result) => {
      callback(err, result);
    }
  );
};
const postItemwithoutdisc = (
  title,
  description,
  image,
  price,
  gender,
  callback
) => {
  const sql =
    "INSERT INTO items (title,description,image,price,gender) VALUES (?,?,?,?,?)";
  connection.query(
    sql,
    [title, description, image, price, gender],
    (err, result) => {
      callback(err, result);
    }
  );
};

const getItem = (callback) => {
  const sql = " SELECT * FROM items; ";
  connection.query(sql, (err, result) => {
    callback(err, result);
  });
};

const getRole = (email, callback) => {
  const sql = "SELECT role FROM accounts WHERE email =?";
  connection.query(sql, [email], (err, result) => {
    callback(err, result);
  });
};

const deleteitem = (id, callback) => {
  const sql = "DELETE FROM items WHERE id = ?;";
  connection.query(sql, id, (err, result) => {
    callback(err, result);
  });
};

const updateitem = (  id ,title, description, image, price,discount, gender, callback) => {
  const sql = "UPDATE items SET title = ? , description = ?, image = ?, price = ?,discount=?, gender = ? WHERE id = ?;"
  connection.query(sql, [title, description, image, price,discount, gender,id],(err, result)=>{
    callback(err, result);
  })
}

const getman = (callback)=>{
const sql = "SELECT * FROM items WHERE gender = 'male' " 
connection.query(sql,(err, result)=>{
  callback(err, result);
})
}
const getfemale = (callback)=>{
  const sql = "SELECT * FROM items WHERE gender = 'female' " 
  connection.query(sql,(err, result)=>{
    callback(err, result);
  })
  }

  const getkids = (callback)=>{
    const sql = "SELECT * FROM items WHERE gender = 'kids' " 
    connection.query(sql,(err, result)=>{
      callback(err, result);
    })
    }
   const creerpost =(title,
    description,
    image,
    callback
    ) => {
    const sql =
    "INSERT INTO entreprise (title,description,image) VALUES (?,?,?)";
    connection.query(
      sql,
      [title,description,image],
      (err,result) => {
        callback(err,result);
      }
      );
   };

    const postuler = (
      name,
      lasname,
      email,
      numtel,
      image,
      gender,
      callback
    ) => {
      const sql =
        "INSERT INTO postuler (name,lasname,email,numtel,image,gender) VALUES (?,?,?,?,?,?)";
      connection.query(
        sql,
        [name,lasname,email,numtel,image,gender],
        (err, result) => {
          callback(err, result);
        }
      );
    };

    const getpostuler = (callback)=>{
      const sql = ('SELECT * FROM postuler;')
      connection.query(sql,(err,result)=>{
        callback(err,result)
      })
    }


    const deletepost = (id, callback) => {
      const sql = "DELETE FROM postuler WHERE id = ?;";
      connection.query(sql, id, (err, result) => {
        callback(err, result);
      });
    };


    const updatepost = (  id ,name, lastname,email, image,numtel, gender, callback) => {
      const sql = "UPDATE postuler SET name = ? ,lastname=?,email=?, image = ?,numtel=?, gender = ? WHERE id = ?;"
      connection.query(sql, [name, lastname,email, image,numtel, gender,id],(err, result)=>{
        callback(err, result);
      })
    }
    const getpublication =(callback) => {
      const sql = "SELECT * FROM entreprise;"
      connection.query(sql,(err,result) => {
        callback(err,result);
      })
    }
    




    

db.connectAsync()
  .then(() =>
    console.log(`Connected to ${database} database as ID ${db.threadId}`)
  )
  .then(() => db.queryAsync(`CREATE DATABASE IF NOT EXISTS ${database}`))
  .then(() => db.queryAsync(`USE ${database}`))
  .then(() => createTables(db));

module.exports = {
  getman,
  getfemale,
  getkids,
  deleteitem,
  getRole,
  signupAdmin,
  signupWithoutimg,
  postItemwithoutdisc,
  getusername,
  getAllNames,
  getAllEmails,
  signup,
  getPasswordByEmail,
  getUserNameandImage,
  postItemwithdisc,
  getItem,
  updateitem,
  postuler,
  getpostuler,
  deletepost,
  updatepost,
  getpublication,
  creerpost
};
