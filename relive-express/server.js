const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
var cors = require('cors')
const DBName = 'relive_database';
const { spawn } = require('child_process')
const session = require('express-session');
// const jwt = require('jsonwebtoken');
const { generateToken, validateToken } = require('./utils/jwt-utils');
// const fs = require('fs');
// const { EmptyResultError } = require("sequelize");

// create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'v0lcaner',
  password: 'v0lcaner2',
  database: DBName
});

const app = express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// const RSA_PRIVATE_KEY = fs.readFileSync('./demos/jwtRS256.key');

// function loginRoute(req, res) {

//   const username = req.body.UserName, 
//         password = req.body.Password;

//   if (validateUserNameAndPassword()) {
//     const userId = findUserIdForUserName(username);

//     const jwtBearerToken = jwt.sign({}, RSA_PRIVATE_KEY, {
//             algorithm: 'RS256',
//             expiresIn: 120,
//             subject: userId
//         })

//         // send the JWT back to the user
//         // TODO - multiple options available

//         // set it in an HTTP Only + Secure Cookie
//         res.cookie("SESSIONID", jwtBearerToken, {httpOnly:true, secure:true});

//         // set it in the HTTP Response body
//         res.status(200).json({
//           idToken: jwtBearerToken, 
//           expiresIn: 16665
//         });
//   }
//   else {
//       // send status 401 Unauthorized
//       res.sendStatus(401); 
//   }
// }

app.get('/', (req, res) => {
  res.send('Relive Webapp Backend is running')
})

//************************ functionality ***********************//

app.post('/api/loginauth', (req, res) => {
  console.log("step 1", req.body)
  let username = req.body.UserName;
	let password = req.body.Password;
  console.log("step 1", username, password)
  if (username && password) {
    console.log("step 1")
    db.query('SELECT * FROM LoginDetails WHERE username = ? AND password = ?', [username, password], (err, results) => {
      if (err) throw err;
			// If the account exists
			if (results.length == 1) {
        // console.log(results, results[0].Role)
				// Authenticate the user
				// req.session.loggedin = true;
				// req.session.username = username;
        // req.session.role = results[0].Role;
        user = {
          id: results[0].LoginID,
          username: results[0].UserName,
          password: results[0].Password,
          role: results[0].Role
        }
        console.log(results[0], user)
        const token = generateToken(user);
        console.log("step 2")
				// Redirect to home page
        res.json({
          success: true,
          message: 'Welcome Back, ' + username,
          success_token: token,
          LoginID: user.id,
        });
				// response.redirect('/home');
			} else {
				res.status(401).json({
          success: false,
          message: 'Incorrect Username and/or Password!',
        });
			}			
			res.end();
    });
  } else {
		res.json({
      success: false,
      message: 'Please enter Username and Password!',
    });
		res.end();
	}
})

// Protected Route
app.get('/api/protected', validateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to the protected route!',
    user: req.user,
  });
});

//************************ functionality-over ***********************//

//************************ createNewUser-start ***********************//

app.post('/api/createNewUser', (req, res) => {
  if (req.body.LoginID == -1){
    let sql1 = "SELECT * FROM LoginDetails";
    db.query(sql1, (err, result) => {
      let LoginID = result.length
      if(err) throw err;
      db.query('INSERT INTO LoginDetails (LoginID, UserName, Password, Role) VALUES (?, ?, ?, ?)', 
        [LoginID, req.body.UserName, req.body.Password, req.body.Role], (err, res1) =>{
          if(err) throw err;
          console.log(res1)
          db.query('SELECT * FROM CustomerDetails', (err, res2) =>{
            if (err) throw err;
            let CustomerID = res2.length
            db.query("INSERT INTO CustomerDetails (CustomerID, LoginID, FirstName, LastName, PhoneNumber, CardID, JoinDate, " +
              "BirthdayDate, Email, Sex, Athlete, DefaultLang) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, "+ req.body.Athlete +", ?)", 
              [CustomerID, LoginID, req.body.FirstName, req.body.LastName, req.body.PhoneNumber, req.body.CardID, req.body.JoinDate, req.body.BirthdayDate, req.body.Email, req.body.Sex, req.body.DefaultLang], 
              (err, res3) => {
                if(err) {
                  db.query("DELETE FROM LoginDetails WHERE LoginID = ?;", [LoginID], (err2, result) => {
                    if(err2) throw err2;
                    console.log(result);
                    // res.send(result);
                  })
                  throw err;
                }
                console.log(res3);
                res.json({ 
                  success: true,
                  message: "successfully created New User",
                  customerID: CustomerID,
                });
                res.end()
              })
          })
      })
    });
  }
})

//************************ createNewUser-over ***********************//
//************************ PullDataQueries-start ***********************//

// get all Recent Users, getAll already available
app.get('/api/CustomerDetails/getLatest100', (req, res) => {
  let sql = "SELECT * FROM CustomerDetails ORDER BY joinDate DESC LIMIT 200"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result)
    res.json(result)
    res.end()
  })
})

// get measurements by user
app.get('/api/MeasurementDetails/getByCustomer/:id', (req, res) => {
  const id = req.params.id
  let sql = "SELECT * FROM MeasurementDetails WHERE CustomerID = ?"
  db.query(sql, [id], (err, result) => {
    if(err) throw err;
    console.log(result)
    res.json(result)
    res.end()
  })
})

// get dietplan by user
app.get('/api/DietPlan/getByCustomer/:id', (req, res) =>{
  const id = req.params.id
  let sqlNowDate = Date.now()
  sqlNowDate = sqlNowDate.toISOString
  let sql1 = "SELECT * FROM CustomerPrograms WHERE CustomerID = " + id + " and (ProgramEnd >= '"+ sqlNowDate +"' or ProgramEnd IS NULL)"
  // let sql2 = "SELECT * FROM DietaryPrograms WHERE ProgramID IN ("+sql1+")"
  let sql3 = "SELECT * FROM ("+sql1+") AS SelectPrograms INNER JOIN DietaryPrograms ON SelectPrograms.ProgramID = DietaryPrograms.ProgramID"
  db.query(sql3, (err, result1) => {
    if(err) throw err
    console.log(result1)
    res.json(result1)
    res.end()
  })
})

// get meals by dietplan with nutrient summary
app.get('/api/MealsSum/getByPlan/:id', (req, res) =>{
  const id = req.params.id
  // let sqlNowDate = Date.now()
  // sqlNowDate = sqlNowDate.toISOString
  let sql1 = "SELECT ProgramMealID, ProgramID, MealID FROM ProgramMeals WHERE ProgramID = " + id;
  let sql2 = "SELECT SelectMeals.ProgramID, Meals.MealID, Meals.MealStartPeriod, Meals.MealEndPeriod " +
  "FROM ("+sql1+") AS SelectMeals INNER JOIN Meals ON SelectMeals.MealID = Meals.MealID";
  let sql3 = "SELECT SelectMeals.ProgramID, SelectMeals.MealID, SelectMeals.MealStartPeriod, SelectMeals.MealEndPeriod, MealFoodItems.FoodID " +
  "FROM ("+sql2+") AS SelectMeals INNER JOIN MealFoodItems ON SelectMeals.MealID = MealFoodItems.MealID";
  let sql4 =  "SELECT SelectMeals.ProgramID, SelectMeals.MealID, SelectMeals.MealStartPeriod, SelectMeals.MealEndPeriod, " +
  "SUM(FoodItems.Calories) AS TotalCalories, " +
  "SUM(FoodItems.Proteins) AS TotalProteins, " +
  "SUM(FoodItems.Fats) AS TotalFats, " +
  "SUM(FoodItems.Carbohydrates) AS TotalCarbohydrates, " +
  "SUM(FoodItems.Sugars) AS TotalSugars, " +
  "SUM(FoodItems.Sodium) AS TotalSodium " +
  "FROM ("+sql3+") AS SelectMeals " +
  "INNER JOIN FoodItems ON SelectMeals.FoodID = FoodItems.FoodID " +
  "GROUP BY SelectMeals.ProgramID, SelectMeals.MealID, SelectMeals.MealStartPeriod, SelectMeals.MealEndPeriod " +
  "ORDER BY SelectMeals.MealID DESC";
  db.query(sql4, (err, result1) => {
    if(err) throw err
    console.log(result1)
    res.json(result1)
    res.end()
    // db.query(sql2, [result1], (err, result2)=>{
    //   if(err) throw err
    //   console.log(result2)
    //   res.json(result2)
    //   res.end()
    // })
  })
})


// get foods by meal
app.get('/api/MealFoods/getByMeal/:id', (req, res) =>{
  const MealID = req.params.id
  let sql1 = "SELECT * FROM MealFoodItems WHERE MealID = " + MealID;
  // let sql2 = "SELECT * FROM DietaryPrograms WHERE ProgramID IN ("+sql1+")"
  let sql3 = "SELECT * FROM ("+sql1+") AS MealFoods INNER JOIN FoodItems ON MealFoods.FoodID = FoodItems.FoodID"
  db.query(sql3, (err, result1) => {
    if(err) throw err
    console.log(result1)
    res.json(result1)
    res.end()
  })
})


//************************ PullDataQueris-over ***********************//
//************************ PushDataQueries-start ***********************//

// add new measurements
// app.post('/api/AddNewMeasurements', (req, res) => {
 
// })

// add/edit dietplan (and all that which it entails)

// add customerhistory entry

//************************ PushDataQueries-over ***********************//


//************************ getSystemRecommendation-start ***********************//

// run model and get dietplan

//************************ getSystemRecommendation-over ***********************//
// each table gets its own section


//************************ LoginDetails ***********************//
//create table
app.get('/api/LoginDetails/createTable', (req, res) => {
  let sql1 = "SHOW TABLES LIKE 'LoginDetails';"
  db.query(sql1, (err, result) => {
    if(err) throw err;
    console.log(result, result.length);
    if (result.length > 0) {
      res.send('LoginDetails table exists...');
    } else {
      // let sql2 = "CREATE TABLE IF NOT EXISTS LoginDetails (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, LoginID int(32) UNSIGNED NOT NULL, " + 
      // "PhoneNumber VARCHAR(15) NOT NULL, CardID VARCHAR(15) NOT NULL, PRIMARY KEY (LoginID), KEY (autonumID)) ENGINE = InnoDB;";
      let sql2 = "CREATE TABLE IF NOT EXISTS LoginDetails (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, LoginID int(32) UNSIGNED NOT NULL, " + 
      "UserName VARCHAR(50) NOT NULL, Password VARCHAR(20), Role VARCHAR(10), PRIMARY KEY (LoginID), KEY (autonumID)) ENGINE = InnoDB;";
      db.query(sql2, (err1, result1) => {
          if(err1) throw err1;
          console.log(result1);
          res.send('LoginDetails table created...');
      })
    }
  })
})

//insert
app.post('/api/LoginDetails/addNew', (req, res) => {
  console.log(req.body)
  let sql = "INSERT INTO LoginDetails (LoginID, UserName, Password, Role) VALUES (" + req.body.LoginID + ", '" + req.body.UserName  + "', '" + req.body.Password + "', '" + req.body.Role + "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to LoginDetails Table: ' + JSON.stringify(req.body));
  })
})

// this version doesnt rely on sending the getting a correct ID
// app.get('/addNewLoginDetail', (req, res) => {
//   let sqlCount = "SELECT * FROM LoginDetails"
//   db.query(sqlCount, (err, result) => {
//     if(err) throw err;
//     console.log(result.length);
//     LoginID = result.length+1
//     if (req.body.Phonenumber == undefined)
//       res.send({error: "invalid parameters"});
//     else {
//       let sql = "INSERT INTO LoginDetails (LoginID, Phonenumber) VALUES (" + LoginID + ", '" + req.body.Phonenumber + "')"
//       db.query(sql, (err, result) => {
//         if(err) throw err;
//         console.log(result);
//         res.send(req.body);
//       })
//     }
//   })
// })

//select all
app.get('/api/LoginDetails/getAll', (req, res) => {
  let sql = "SELECT * FROM LoginDetails;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//drop table
app.get('/api/LoginDetails/dropTable', (req, res) => {
  let sql = "DROP TABLE LoginDetails"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted LoginDetails Table: ' + JSON.stringify(req.body));
  })
})

//find row
app.get('/api/LoginDetails/find', (req, res) => {
  let sql = "SELECT * FROM LoginDetails WHERE LoginID = " + req.body.LoginID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//delete row
app.delete('/api/LoginDetails/delete', (req, res) => {
  let sql = "DELETE FROM LoginDetails WHERE LoginID = " + req.body.LoginID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//************************ CustomerDetails ***********************//
//creat table
app.get('/api/CustomerDetails/createTable', (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS CustomerDetails (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, CustomerID int(32) UNSIGNED NOT NULL, " + 
    "LoginID int(32) UNSIGNED NOT NULL, FirstName VARCHAR(50) NOT NULL, LastName VARCHAR(50) NOT NULL, PhoneNumber VARCHAR(15), CardID VARCHAR(15), " + 
    "JoinDate DATETIME, BirthdayDate DATE, Email VARCHAR(50), Sex VARCHAR(10), Athlete BOOL, DefaultLang VARCHAR(5), " +
    "PRIMARY KEY (CustomerID), KEY (autonumID), FOREIGN KEY (LoginID) REFERENCES LoginDetails(LoginID)) ENGINE = InnoDB;";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('CustomerDetails table created/exists...');
    })
})

//insert
app.post('/api/CustomerDetails/addNew', (req, res) => {
  let sql = "INSERT INTO CustomerDetails (CustomerID, LoginID, FirstName, LastName, PhoneNumber, CardID, JoinDate, " +
  "BirthdayDate, Email, Sex, Athlete, DefaultLang) VALUES (" + req.body.CustomerID + ", " + req.body.LoginID + ", '" + 
  req.body.FirstName + "', '" + req.body.LastName + "','" + req.body.PhoneNumber + "', '" + req.body.CardID + "', '" +
  req.body.JoinDate + "', '" + req.body.BirthdayDate + "' ,'" + req.body.Email + "', '" +
  req.body.Sex + "', " + req.body.Athlete +  ", '" + req.body.DefaultLang + "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to CustomerDetails Table: ' + JSON.stringify(req.body));
  })
})

//select all
app.get('/api/CustomerDetails/getAll', (req, res) => {
  let sql = "SELECT * FROM CustomerDetails;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//select by customer
app.get('/api/CustomerDetails/get/:id', (req, res) => {
  const id = req.params.id
  let sql = "SELECT * FROM CustomerDetails WHERE CustomerID = " + id + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//drop table
app.get('/api/CustomerDetails/dropTable', (req, res) => {
  let sql = "DROP TABLE CustomerDetails"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted CustomerDetails Table: ' + JSON.stringify(req.body));
  })
})

//find row
app.get('/api/CustomerDetails/find', (req, res) => {
  let sql = "SELECT * FROM CustomerDetails WHERE CustomerID = " + req.body.CustomerID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//delete row
app.delete('/api/CustomerDetails/delete', (req, res) => {
  let sql = "DELETE FROM CustomerDetails WHERE CustomerID = " + req.body.CustomerID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})


//************************ MeasurementDetails ***********************//
//create table
app.get('/api/MeasurementDetails/createTable', (req, res) => {
  let sql = "CREATE TABLE IF NOT EXISTS MeasurementDetails (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, MeasureID int(32) UNSIGNED NOT NULL, " + 
  "CustomerID int(32) UNSIGNED NOT NULL, MeasureDate DATETIME NOT NULL, TotalWeight int(16), Height int(16), " + 
  "BMI float(5, 2), BMR int(16), FatPercentage float(5, 2), AbdominalFatPercentage float(5, 2), Muscles float(5, 2), Bones float(5, 2), Liquids float(5, 2), " +
  "HipCircumference float(5, 2), HandCircumference float(5, 2), ThighCircumference float(5, 2), ChestCircumference float(5, 2), " +
  "PRIMARY KEY (MeasureID), KEY (autonumID), FOREIGN KEY (CustomerID) REFERENCES CustomerDetails(CustomerID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('MeasurementDetails table created/exists...');
  })
})

//insert 
app.post('/api/MeasurementDetails/addNew', (req, res) => {
  console.log("hello?", req.body)
  if (req.body.CustomerID == -1){
    let sql1 = "SELECT * FROM MeasurementDetails";
    db.query(sql1, (err, result) => {
      let MeasureID = result.length
      if(err) throw err;
      db.query("INSERT INTO MeasurementDetails (MeasureID, CustomerID, MeasureDate, TotalWeight, Height, BMI, BMR, " + 
        "AbdominalFatPercentage, FatPercentage, Muscles, Bones, Liquids, HipCircumference, HandCircumference, ThighCircumference, ChestCircumference) VALUES " + 
        "(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [MeasureID, req.body.CustomerID, req.body.MeasureDate, req.body.TotalWeight, req.body.Height, req.body.BMI, req.body.BMR, req.body.AbdominalFatPercentage, 
          req.body.FatPercentage, req.body.Muscles, req.body.Bones, req.body.Liquids, req.body.HipCircumference, req.body.HandCircumference, req.body.ThighCircumference, req.body.ChestCircumference], 
        (err, res3) => {
          if(err) {
            db.query("DELETE FROM LoginDetails WHERE LoginID = ?;", [LoginID], (err2, result) => {
              if(err2) throw err2;
              console.log(result);
              // res.send(result);
            })
            throw err;
          }
          console.log(res3);
          res.json({ 
            success: true,
            message: "Successfully Added Measurement Detail",
            customerID: CustomerID,
          });
          res.end()
        })
    });
  }
  // let sql = "INSERT INTO MeasurementDetails (MeasureID, CustomerID, MeasureDate, TotalWeight, Height, BMI, BMR, "+
  // "AbdominalFatPercentage, FatPercentage, Muscles, Bones, Liquids, HipCircumference, HandCircumference, ThighCircumference, ChestCircumference) VALUES (" + 
  // req.body.MeasureID + ", " + req.body.CustomerID + ", '" + req.body.MeasureDate + "', " + req.body.TotalWeight + ", " + req.body.Height + ", " + 
  // req.body.BMI + ", " + req.body.BMR + ", " + req.body.AbdominalFatPercentage + ", " + req.body.FatPercentage + ", " + req.body.Muscles + ", " + 
  // req.body.Bones + ", " + req.body.Liquids + ", " + req.body.HipCircumference + ", " + req.body.HandCircumference + ", " + req.body.ThighCircumference + ", " + 
  // req.body.ChestCircumference + ")"
  // db.query(sql, (err, result) => {
  //   if(err) throw err;
  //   // console.log("NewMeasurement" + String(result));
  //   res.send('row added to MeasurementDetails Table: ' + JSON.stringify(req.body));
  // })
})

//select all
app.get('/api/MeasurementDetails/getAll', (req, res) => {
  let sql = "SELECT * FROM MeasurementDetails;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

app.post('/api/MeasurementDetails/update', (req, res) => {
  db.query("UPDATE MeasurementDetails SET MeasureDate = ?, TotalWeight = ?, Height = ?, BMI = ?, BMR = ?, AbdominalFatPercentage = ?, FatPercentage = ?, Muscles = ?, Bones = ?, Liquids = ?, HipCircumference = ?, HandCircumference = ?, "+ 
    "ThighCircumference = ?, ChestCircumference = ? WHERE MeasureID = ?", [req.body.MeasureDate, req.body.TotalWeight, req.body.Height, req.body.BMI, req.body.BMR, req.body.AbdominalFatPercentage, 
    req.body.FatPercentage, req.body.Muscles, req.body.Bones, req.body.Liquids, req.body.HipCircumference, req.body.HandCircumference, req.body.ThighCircumference, req.body.ChestCircumference, MeasureID], (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//drop table
app.get('/api/MeasurementDetails/dropTable', (req, res) => {
  let sql = "DROP TABLE MeasurementDetails"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted MeasurementDetails Table: ' + JSON.stringify(req.body));
  })
})

//find row
app.get('/api/MeasurementDetails/find/:id', (req, res) => {
  const id = req.params.id
  let sql = "SELECT * FROM MeasurementDetails WHERE MeasureID = " + id + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.json(result);
  })
})
//delete row
app.get('/api/MeasurementDetails/delete', (req, res) => {
  let sql = "DELETE FROM MeasurementDetails WHERE MeasureID = " + req.body.MeasureID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//************************ FoodItems ***********************//

app.get('/api/FoodItems/createTable', (req, res) => {
  let sql = "CREATE TABLE IF NOT EXISTS FoodItems (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, FoodID int(32) UNSIGNED NOT NULL, " + 
  "FoodName VARCHAR(50) NOT NULL, FoodNameDisp VARCHAR(50) NOT NULL, Category VARCHAR(50), Calories int(8), Proteins int(8), Fats int(8), Carbohydrates int(8), " + 
  "Sugars int(8), Sodium int(8), ImagePath VARCHAR(500), " +
  "PRIMARY KEY (FoodID), KEY (autonumID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('FoodItems table created/exists...');
  })
})

app.get('/api/FoodItems/getAll', (req, res) => {
  let sql = "SELECT * FROM FoodItems;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
    // res.send('FoodItems Table: ' + JSON.stringify(result));
  })
})


// app.get('/changeCharsetFoodItems', (req, res) => {
//   let sql = "ALTER TABLE FoodItems CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci; "
//   db.query(sql, (err, result) => {
//     if(err) throw err;
//     console.log(result);
//     res.json(result);
//     // res.send('FoodItems Table: ' + JSON.stringify(result));
//   })
// })

app.get('/api/FoodItems/get/:id', (req, res) => {
  const id = req.params.id
  let sql = 'SELECT * FROM FoodItems WHERE FoodID = '+id+';'
  console.log("get specific", this.id, this.sql)
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
    // res.send('FoodItems Table: ' + JSON.stringify(result));
  })
})


app.post('/api/FoodItems/addNew', (req, res) => {
  let sql = "INSERT INTO FoodItems (FoodID, FoodName, FoodNameDisp, Category, Calories, Proteins, Fats, Carbohydrates, Sugars, Sodium, ImagePath) Values" + 
  "(" + req.body.FoodID + ", '" + req.body.FoodName + "', '" + req.body.FoodNameDisp + "', '" + req.body.Category + "', " + req.body.Calories + ", " + req.body.Proteins + ", " + req.body.Fats + ", " 
  + req.body.Carbohydrates + ", " + req.body.Sugars + ", " + req.body.Sodium + ", '" + req.body.ImagePath + "' )"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to FoodItems Table: ' + JSON.stringify(req.body));
  })
})

app.post('/api/FoodItems/update', (req, res) => {
  let sql = "UPDATE FoodItems SET FoodName = '" + req.body.FoodName + "', FoodNameDisp = '" + req.body.FoodNameDisp + 
  "', Category = '" + req.body.Category + "', Calories = " + req.body.Calories + ", Proteins = " + req.body.Proteins + 
  ", Fats = " + req.body.Fats + ", Carbohydrates = " + req.body.Carbohydrates + ", Sugars = " + req.body.Sugars + 
  ", Sodium = " + req.body.Sodium + ", ImagePath = '" + req.body.ImagePath + 
  "' WHERE FoodID = " + req.body.FoodID + ";"
  // console.log(req.body.Sodium, req.body.Sugars, sql);
  // res.send(sql);
  // console.log("updateFoodItem: ", req)
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

app.get('/api/FoodItems/dropTable', (req, res) => {
  let sql = "DROP TABLE FoodItems"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Dropped FoodItems Table: ' + JSON.stringify(req.body));
  })
})

//delete row
app.get('/api/FoodItems/delete', (req, res) => {
  let sql = "DELETE FROM FoodItems WHERE FoodID = " + req.body.FoodID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//************************ DietaryPrograms ***********************//

//create diet programs table
app.get('/api/DietaryPrograms/createTable', (req, res) => {
  let sql = "CREATE TABLE IF NOT EXISTS DietaryPrograms (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, ProgramID int(32) UNSIGNED NOT NULL, " + 
  "ProgramName VARCHAR(50) NOT NULL, TasteProfile VARCHAR(1000), Description VARCHAR(1000), " + 
  "PRIMARY KEY (ProgramID), KEY (autonumID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('DietaryPrograms table created/exists...');
  })
})

// get all rows of table
app.get('/api/DietaryPrograms/getAll', (req, res) => {
  let sql = "SELECT * FROM DietaryPrograms;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//drop table
app.get('/api/DietaryPrograms/dropTable', (req, res) => {
  let sql = "DROP TABLE DietaryPrograms"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted DietaryPrograms Table: ' + JSON.stringify(req.body));
  })
})

// add row to DietPrograms
app.post('/api/DietaryPrograms/addNew', (req, res) => {
  let sql = "INSERT INTO DietaryPrograms (ProgramID, ProgramName, TasteProfile, Description) Values" + 
  "(" + req.body.ProgramID + ", '" + req.body.ProgramName + "', '" + req.body.TasteProfile + "', '" + req.body.Description + "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('DietaryProgram row Added: ' + JSON.stringify(req.body));
  })
})

// find row in DietPrograms
app.get('/api/DietaryPrograms/find', (req, res) => {
  let sql = "SELECT * FROM DietaryPrograms WHERE ProgramID = " + req.body.AssignmentID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

// update row in DietPrograms
app.get('/api/DietaryPrograms/update', (req, res) => {
  let sql = "UPDATE DietaryPrograms SET ProgramName = '" + req.body.ProgramName + "', TasteProfile = '" + req.body.TasteProfile + 
  "', Description = '" + req.body.Description + "' WHERE ProgramID = " + req.body.ProgramID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('DietaryProgram row updated: ' + JSON.stringify(req.body));
  })
})

//delete row
app.get('/api/DietaryPrograms/delete', (req, res) => {
  let sql = "DELETE FROM DietaryPrograms WHERE ProgramID = " + req.body.ProgramID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//************************ CustomerPrograms ***********************//

//create table
app.get('/api/CustomerPrograms/createTable', (req, res) => {
  let sql ="CREATE TABLE IF NOT EXISTS CustomerPrograms (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, CustomerProgramID int(32) UNSIGNED NOT NULL, " + 
  "CustomerID int(32) UNSIGNED NOT NULL, ProgramID int(32) UNSIGNED NOT NULL, ProgramStart DATETIME NOT NULL, ProgramEnd DATETIME, Notes VARCHAR(1000), " + 
  "PRIMARY KEY (CustomerProgramID), KEY (autonumID), FOREIGN KEY (CustomerID) REFERENCES CustomerDetails(CustomerID), " +
  "FOREIGN KEY (ProgramID) REFERENCES DietaryPrograms(ProgramID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('CustomerPrograms table created or already exists...');
  })
})

//insert 
app.post('/api/CustomerPrograms/addNew', (req, res) => {
  let sql = "INSERT INTO CustomerPrograms (CustomerProgramID, CustomerID, ProgramID, ProgramStart, Notes) VALUES (" + req.body.CustomerProgramID + ", " +
  req.body.CustomerID + ", " + req.body.ProgramID + ", '" + req.body.ProgramStart + "', '" + req.body.Notes + "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to CustomerPrograms Table: ' + JSON.stringify(req.body));
  })
})

//select all
app.get('/api/CustomerPrograms/getAll', (req, res) => {
  let sql = "SELECT * FROM CustomerPrograms;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//drop table
app.get('/api/CustomerPrograms/dropTable', (req, res) => {
  let sql = "DROP TABLE CustomerPrograms"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted CustomerPrograms Table: ' + JSON.stringify(req.body));
  })
})

//find row
app.get('/api/CustomerPrograms/find', (req, res) => {
  let sql = "SELECT * FROM CustomerPrograms WHERE CustomerProgramID = " + req.body.CustomerProgramID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

// update row
app.get('/api/CustomerPrograms/update', (req, res) => {
  let sql = "UPDATE CustomerPrograms SET CustomerID = " + req.body.CustomerID + ", ProgramID = " + req.body.ProgramID + 
  ", ProgramStart = '" + new Date(req.body.ProgramStart) + ", ProgramEnd = '" + new Date(req.body.ProgramEnd) + 
  ", Notes = '" + req.body.Notes + "' WHERE CustomerProgramID = " + req.body.CustomerProgramID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('CustomerPrograms row updated: ' + JSON.stringify(req.body));
  })
})

//delete row
app.get('/api/CustomerPrograms/delete', (req, res) => {
  let sql = "DELETE FROM CustomerPrograms WHERE CustomerProgramID = " + req.body.CustomerProgramID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})


//************************ Meals ***********************//
//create table
app.get('/api/Meals/createTable', (req, res) => {
  let sql ="CREATE TABLE IF NOT EXISTS Meals (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, MealID int(32) UNSIGNED NOT NULL, " + 
  "MealDay int(8) NOT NULL, MealStartPeriod time NOT NULL, MealEndPeriod time, " + 
  "PRIMARY KEY (MealID), KEY (autonumID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('Meals table created or already exists...');
  })
})

//insert
app.post('/api/Meals/addNew', (req, res) => {
  let sql = "INSERT INTO Meals (MealID, MealDay, MealStartPeriod, MealEndPeriod) VALUES (" + req.body.MealID + ", " + 
  req.body.MealDay + ", '" + req.body.MealStartPeriod + "', '" + req.body.MealEndPeriod + "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to Meals Table: ' + JSON.stringify(req.body));
  })
})

//select all
app.get('/api/Meals/getAll', (req, res) => {
  let sql = "SELECT * FROM Meals;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//drop table
app.get('/api/Meals/dropTable', (req, res) => {
  let sql = "DROP TABLE Meals"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted Meals Table: ' + JSON.stringify(req.body));
  })
})

//find row
app.get('/api/Meals/find', (req, res) => {
  let sql = "SELECT * FROM Meals WHERE MealID = " + req.body.MealID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

// update row
app.get('/api/Meals/update', (req, res) => {
  let sql = "UPDATE Meals SET MealDay = " + req.body.MealDay + 
  ", MealStartPeriod = '" + new Date(req.body.MealStartPeriod) + ", MealEndPeriod = '" + new Date(req.body.MealEndPeriod) + 
  ", Notes = '" + req.body.Notes + "' WHERE MealID = " + req.body.MealID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Meals row updated: ' + JSON.stringify(req.body));
  })
})

//delete row
app.get('/api/Meals/delete', (req, res) => {
  let sql = "DELETE FROM MealItems WHERE MealItemID = " + req.body.MealItemID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//************************ ProgramMeals ***********************//
//create table
app.get('/api/ProgramMeals/createTable', (req, res) => {
  let sql ="CREATE TABLE IF NOT EXISTS ProgramMeals (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, ProgramMealID int(32) UNSIGNED NOT NULL, " + 
  "ProgramID int(32) UNSIGNED NOT NULL, MealID int(32) UNSIGNED NOT NULL, PRIMARY KEY (ProgramMealID), " + 
  "KEY (autonumID), FOREIGN KEY (ProgramID) REFERENCES DietaryPrograms(ProgramID), FOREIGN KEY (MealID) REFERENCES Meals(MealID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('ProgramMeals table created/exists...');
  })
})

//insert
app.post('/api/ProgramMeals/addNew', (req, res) => {
  let sql = "INSERT INTO ProgramMeals (ProgramMealID, ProgramID, MealID) VALUES (" + req.body.ProgramMealID + ", " +
  req.body.ProgramID + ", " + req.body.MealID + ")"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to ProgramMeals Table: ' + JSON.stringify(req.body));
  })
})

//select all
app.get('/api/ProgramMeals/getAll', (req, res) => {
  let sql = "SELECT * FROM ProgramMeals;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//drop table
app.get('/api/ProgramMeals/dropTable', (req, res) => {
  let sql = "DROP TABLE ProgramMeals"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted ProgramMeals Table: ' + JSON.stringify(req.body));
  })
})

//find row
app.get('/api/ProgramMeals/find', (req, res) => {
  let sql = "SELECT * FROM ProgramMeals WHERE ProgramMealID = " + req.body.ProgramMealID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

// update row
app.get('/api/ProgramMeals/update', (req, res) => {
  let sql = "UPDATE ProgramMeals SET ProgramID = " + req.body.ProgramID + ", MealID = " + req.body.MealID + 
  " WHERE ProgramMealID = " + req.body.ProgramMealID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('ProgramMeals row updated: ' + JSON.stringify(req.body));
  })
})

//delete row
app.get('/api/ProgramMeals/delete', (req, res) => {
  let sql = "DELETE FROM ProgramMeals WHERE ProgramMealID = " + req.body.ProgramMealID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})


//************************ MealFoodItems ***********************//
//create table
app.get('/api/MealFoodItems/createTable', (req, res) => {
  let sql ="CREATE TABLE IF NOT EXISTS MealFoodItems (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, MealFoodItemID int(32) UNSIGNED NOT NULL, " + 
  "MealID int(32) UNSIGNED NOT NULL, FoodID int(32) UNSIGNED NOT NULL, FoodPortion int(8), " + 
  "PRIMARY KEY (MealFoodItemID), KEY (autonumID), FOREIGN KEY (MealID) REFERENCES Meals(MealID), " +
  "FOREIGN KEY (FoodID) REFERENCES FoodItems(FoodID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('MealFoodItems table created/exists...');
  })
})

//insert
app.post('/api/MealFoodItems/addNew', (req, res) => {
  let sql = "INSERT INTO MealFoodItems (MealFoodItemID, MealID, FoodID, FoodPortion) VALUES (" + req.body.MealFoodItemID + ", " +
  req.body.MealID + ", " + req.body.FoodID + ", "+ req.body.FoodPortion + ")"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to MealFoodItems Table: ' + JSON.stringify(req.body));
  })
})

//select all
app.get('/api/MealFoodItems/getAll', (req, res) => {
  let sql = "SELECT * FROM MealFoodItems;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//drop table
app.get('/api/MealFoodItems/dropTable', (req, res) => {
  let sql = "DROP TABLE MealFoodItems"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted MealFoodItems Table: ' + JSON.stringify(req.body));
  })
})

//find row
app.get('/api/MealFoodItems/find', (req, res) => {
  let sql = "SELECT * FROM MealFoodItems WHERE MealFoodItemID = " + req.body.MealFoodItemID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

// update row
app.get('/api/MealFoodItems/update', (req, res) => {
  let sql = "UPDATE MealFoodItems SET MealID = " + req.body.MealID + ", FoodID = " + req.body.FoodID + ", FoodPortion = " + req.body.FoodPortion + 
  " WHERE MealFoodItemID = " + req.body.MealFoodItemID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('MealFoodItems row updated: ' + JSON.stringify(req.body));
  })
})

//delete row
app.get('/api/MealFoodItems/delete', (req, res) => {
  let sql = "DELETE FROM MealFoodItems WHERE MealFoodItemID = " + req.body.MealFoodItemID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//************************ CustomerMealHistory ***********************//
//create table
app.get('/api/CustomerMealHistory/createTable', (req, res) => {
  let sql ="CREATE TABLE IF NOT EXISTS CustomerMealHistory (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, CustomerMealLogID int(32) UNSIGNED NOT NULL, " + 
  "CustomerID int(32) UNSIGNED NOT NULL, MealID int(32) UNSIGNED NOT NULL, TimeLogged datetime NOT NULL, CustomerNote varchar(500), " + 
  "PRIMARY KEY (CustomerMealLogID), KEY (autonumID), FOREIGN KEY (MealID) REFERENCES Meals(MealID), " +
  "FOREIGN KEY (CustomerID) REFERENCES CustomerDetails(CustomerID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('CustomerMealHistory table created/exists...');
  })
})

//select all
app.get('/api/CustomerMealHistory/getAll', (req, res) => {
  let sql = "SELECT * FROM CustomerMealHistory;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//select by customer
app.get('/api/CustomerMealHistory/getCustomer/:id', (req, res) => {
  const id = req.params.id
  let sql = "SELECT * FROM CustomerMealHistory WHERE CustomerID = " + id + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//drop table
app.get('/api/CustomerMealHistory/dropTable', (req, res) => {
  let sql = "DROP TABLE CustomerMealHistory"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted CustomerMealHistory Table: ' + JSON.stringify(req.body));
  })
})

//add row
app.post('/api/CustomerMealHistory/addNew', (req, res) => {
  // res.send(req.body)
  let sql = "INSERT INTO CustomerMealHistory (CustomerMealLogID, CustomerID, MealID, TimeLogged, CustomerNote) VALUES (" + req.body.CustomerMealLogID + ", " +
  req.body.CustomerID + ", " + req.body.MealID + ", '" + req.body.TimeLogged + "', '" + req.body.CustomerNote +  "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to CustomerMealHistory Table: ' + JSON.stringify(req.body));
  })
})

//find row
//update row
//delete row

//************************ Custom Queries ***********************//
// Query to Add User
// app.post('/api/Users/addNew', (req, res) => {
// //ha
// })


//************************ Basics ***********************//


app.listen("8080", () => {
  console.log("Server started on port 8080");
});

//************************ Tests ***********************//

app.get('/api/showTables', (req, res) => {
  let sql = "SHOW TABLES"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

app.get('/api/getDropAllTablesScript', (req, res) => {
  let sql = "SELECT GROUP_CONCAT('DROP TABLE IF EXISTS ', table_name, ';') FROM information_schema.tables WHERE table_schema = 'relive_database';"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

app.get('/api/dropAllTables', (req, res) => {
  let sql = "SET FOREIGN_KEY_CHECKS = 0;" 
  let sql1 = "drop table if exists roles;" 
  let sql2 = "drop table if exists user_roles;" 
  let sql3 = "drop table if exists users;" 
  let sql4 = "SET FOREIGN_KEY_CHECKS = 1;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    db.query(sql1, (err1, result1) => {
      if(err1) throw err1;
      console.log(result1);
      db.query(sql2, (err2, result2) => {
        if(err2) throw err2;
        console.log(result2);
        db.query(sql3, (err3, result3) => {
          if(err3) throw err3;
          console.log(result3);
          db.query(sql4, (err4, result4) => {
            if(err4) throw err4;
            console.log(result4);
            res.send(result4);
          })
          // res.send(result);
        })
        // res.send(result);
      })
      // res.send(result);
    })
    // res.send(result);
  })
})

app.get('/api/testPythonChildProcess', (req, res) => {
  // res.send('Hello World!')
  const python = spawn ('python',['test.py'])
  let data2 = ''
  python.stdout.on('data',function(data){
    console.log('Pipe data: ' + data.toString());
    data2 += data.toString()
  })
  python.on('close',function(code){
    res.send("Hello World!! - "+ data2)
  })
  python.on('error', (err) => {
    console.error('Failed to start subprocess.', err);
  });
})

app.get('/api/exportLoginDetails', (req, res) => {
  let sql = "SELECT * FROM LoginDetails;"
  let temp_res = ''
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    // res.send('LoginDetails Table: ' + JSON.stringify(result));
    // temp_res += JSON.stringify(result)
    // Query the database
// connection.query('SELECT * FROM your_table', (error, results) => {
  if (err) {
    console.error('Error executing query:', err);
    return;
  }

  // Convert the query results to JSON
  const data = JSON.stringify(result);

  // Spawn a Python process
  const pythonProcess = spawn('python', ['loginanalysis.py']);

  // Send the data to the Python script
  pythonProcess.stdin.write(data);
  pythonProcess.stdin.end();

  // Handle data returned from the Python script
  pythonProcess.stdout.on('data', (data) => {
    console.log('Data from Python:', data.toString());
    res.send(data.toString());
  });

  // Handle errors from the Python script
  pythonProcess.stderr.on('data', (data) => {
    console.error('Error from Python:', data.toString());
    res.send('Error from Python script');
  });

  // Handle process exit
  pythonProcess.on('close', (code) => {
    console.log(`Python process exited with code ${code}`);
  });
// });
  })
  
})

// app.post('/addfooditem', (req, res) => {
//   let sql = "INSERT INTO FoodItems (FoodID, FoodName, Category, Calories, Proteins, Fats, Carbohydrates, Sugars, ImagePath) Values" + 
//   "();"
//   console.log("post request, req: " + req)
//   console.log(JSON.stringify(req.body))
//   res.json(req.body)
// })



