const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
var cors = require('cors')
const DBName = 'relive_database';
const { spawn } = require('child_process')


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
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});


app.get('/', (req, res) => {
  res.send('Hello World!!!!')
})

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
      let sql2 = "CREATE TABLE IF NOT EXISTS LoginDetails (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, LoginID int(32) UNSIGNED NOT NULL, " + 
      "PhoneNumber VARCHAR(15) NOT NULL, CardID VARCHAR(15) NOT NULL, PRIMARY KEY (LoginID), KEY (autonumID)) ENGINE = InnoDB;";
      db.query(sql2, (err1, result1) => {
          if(err1) throw err1;
          console.log(result1);
          res.send('LoginDetails table created...');
      })
    }
  })
})

//insert
app.get('/api/LoginDetails/addNew', (req, res) => {
  console.log(req.body)
  let sql = "INSERT INTO LoginDetails (LoginID, PhoneNumber, CardID) VALUES (" + req.body.LoginID + ", '" + req.body.PhoneNumber  + "', '" + req.body.CardID + "')"
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
app.get('/api/LoginDetails/delete', (req, res) => {
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
    "LoginID int(32) UNSIGNED NOT NULL, FirstName VARCHAR(50) NOT NULL, LastName VARCHAR(50) NOT NULL, " + 
    "JoinDate DATETIME, BirthdayDate DATE, Sex VARCHAR(10), Athlete BOOL, DefaultLang VARCHAR(5), " +
    "PRIMARY KEY (CustomerID), KEY (autonumID), FOREIGN KEY (LoginID) REFERENCES LoginDetails(LoginID)) ENGINE = InnoDB;";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('CustomerDetails table created/exists...');
    })
})

//insert
app.get('/api/CustomerDetails/addNew', (req, res) => {
  let sql = "INSERT INTO CustomerDetails (CustomerID, LoginID, FirstName, LastName, JoinDate, " +
  "BirthdayDate, Sex, Athlete, DefaultLang) VALUES (" + req.body.CustomerID + ", " +
  req.body.LoginID + ", '" + req.body.FirstName + "', '" + req.body.LastName + "','" + 
  req.body.JoinDate + "', '" + req.body.BirthdayDate + "' ,'" + 
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
app.get('/api/CustomerDetails/delete', (req, res) => {
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
app.get('/api/MeasurementDetails/addNew', (req, res) => {
  let sql = "INSERT INTO MeasurementDetails (MeasureID, CustomerID, MeasureDate, TotalWeight, Height, BMI, BMR, "+
  "AbdominalFatPercentage, FatPercentage, Muscles, Bones, Liquids, HipCircumference, HandCircumference, ThighCircumference, ChestCircumference) VALUES (" + req.body.MeasureID + ", " +
  req.body.CustomerID + ", '" + req.body.MeasureDate + "', " + req.body.TotalWeight + ", " + req.body.Height + ", " + req.body.BMI + ", " + req.body.BMR + ", " + req.body.AbdominalFatPercentage + ", " + 
  req.body.FatPercentage + ", " + req.body.Muscles + ", " + req.body.Bones + ", " + req.body.Liquids + ", " + 
  req.body.HipCircumference + ", " + req.body.HandCircumference + ", " + req.body.ThighCircumference + ", " + req.body.ChestCircumference + ")"
  db.query(sql, (err, result) => {
    if(err) throw err;
    // console.log("NewMeasurement" + String(result));
    res.send('row added to MeasurementDetails Table: ' + JSON.stringify(req.body));
  })
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
app.get('/api/MeasurementDetails/find', (req, res) => {
  let sql = "SELECT * FROM MeasurementDetails WHERE MeasureID = " + req.body.MeasureID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
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
app.get('/api/DietPrograms/getAll', (req, res) => {
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
app.get('/api/DietProgram/addNew', (req, res) => {
  let sql = "INSERT INTO DietaryPrograms (ProgramID, ProgramName, TasteProfile, Description) Values" + 
  "(" + req.body.ProgramID + ", '" + req.body.ProgramName + "', '" + req.body.TasteProfile + "', '" + req.body.Description + "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('DietaryProgram row Added: ' + JSON.stringify(req.body));
  })
})

// find row in DietPrograms
app.get('/api/DietProgram/find', (req, res) => {
  let sql = "SELECT * FROM DietaryPrograms WHERE ProgramID = " + req.body.AssignmentID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

// update row in DietPrograms
app.get('/api/DietProgram/update', (req, res) => {
  let sql = "UPDATE DietaryPrograms SET ProgramName = '" + req.body.ProgramName + "', TasteProfile = '" + req.body.TasteProfile + 
  "', Description = '" + req.body.Description + "' WHERE ProgramID = " + req.body.ProgramID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('DietaryProgram row updated: ' + JSON.stringify(req.body));
  })
})

//delete row
app.get('/api/DietaryProgram/delete', (req, res) => {
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
app.get('/api/CustomerProgram/addNew', (req, res) => {
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
app.get('/api/CustomerProgram/find', (req, res) => {
  let sql = "SELECT * FROM CustomerPrograms WHERE CustomerProgramID = " + req.body.CustomerProgramID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

// update row
app.get('/api/CustomerProgram/update', (req, res) => {
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
app.get('/api/CustomerProgram/delete', (req, res) => {
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
app.get('/api/Meals/addNew', (req, res) => {
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
app.get('api/ProgramMeals/createTable', (req, res) => {
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
app.get('/api/ProgramMeals/addNew', (req, res) => {
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
app.get('/api/MealFoodItems/addNew', (req, res) => {
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

//get all
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
app.get('/api/CustomerMealHistory/addNew', (req, res) => {
  let sql = "INSERT INTO CustomerMealHistory (CustomerMealLogID, CustomerID, MealID, TimeLogged, CustomerNote) VALUES (" + req.body.CustomerMealLogID + ", " +
  req.body.CustomerID + ", " + req.body.MealID + ", " + new Date(req.body.TimeLogged) + ", '" + req.body.CustomerNote +  "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to CustomerMealHistory Table: ' + JSON.stringify(req.body));
  })
})

//find row
//update row
//delete row

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
  let sql = "DROP TABLE IF EXISTS test;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
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



