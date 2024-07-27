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
// FKEY needs proper implementaion

//************************ LoginDetails ***********************//
//create table
app.get('/createLoginDetailsTable', (req, res) => {
  let sql1 = "SHOW TABLES LIKE 'LoginDetails';"
  db.query(sql1, (err, result) => {
    if(err) throw err;
    console.log(result, result.length);
    if (result.length > 0) {
      res.send('LoginDetails table exists...');
    } else {
      let sql2 = "CREATE TABLE IF NOT EXISTS LoginDetails (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, LoginID int(32) UNSIGNED NOT NULL, " + 
      "Username VARCHAR(50) NOT NULL, Password VARCHAR(250) NOT NULL, PRIMARY KEY (LoginID), KEY (autonumID)) ENGINE = InnoDB;";
      db.query(sql2, (err1, result1) => {
          if(err1) throw err1;
          console.log(result1);
          res.send('LoginDetails table created...');
      })
    }
  })
})

//insert
app.get('/addNewLoginDetail', (req, res) => {
  let sql = "INSERT INTO LoginDetails (LoginID, Username, Password) VALUES (" + req.body.LoginID + ", '" + req.body.Username + "', '" + req.body.Password + "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to LoginDetails Table: ' + JSON.stringify(req.body));
  })
})

//select all
app.get('/getLoginDetails', (req, res) => {
  let sql = "SELECT * FROM LoginDetails;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('LoginDetails Table: ' + JSON.stringify(result));
  })
})

//drop table
app.get('/dropLoginDetailsTable', (req, res) => {
  let sql = "DROP TABLE LoginDetails"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted LoginDetails Table: ' + JSON.stringify(req.body));
  })
})

//find row
app.get('/findLoginDetail', (req, res) => {
  let sql = "SELECT * FROM LoginDetails WHERE LoginID = " + req.body.LoginID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row found in LoginDetails Table: ' + JSON.stringify(result));
  })
})

//delete row
app.get('/deleteLoginDetail', (req, res) => {
  let sql = "DELETE FROM LoginDetails WHERE LoginID = " + req.body.LoginID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted row in LoginDetails Table: ' + JSON.stringify(result));
  })
})

//************************ CustomerDetails ***********************//
//creat table
app.get('/createCustomerDetailsTable', (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS CustomerDetails (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, CustomerID int(32) UNSIGNED NOT NULL, " + 
    "LoginID int(32) UNSIGNED NOT NULL, FirstName VARCHAR(50) NOT NULL, LastName VARCHAR(50) NOT NULL, PhoneNumber VARCHAR(15), " + 
    "JoinDate DATETIME, BirthdayDate DATE, Height int(16), Age int(8), Sex VARCHAR(10), Athlete BOOL, DefaultLang VARCHAR(5), " +
    "PRIMARY KEY (CustomerID), KEY (autonumID)) ENGINE = InnoDB;";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('CustomerDetails table created/exists...');
    })
})

//insert
app.get('/addNewCustomer', (req, res) => {
  let sql = "INSERT INTO CustomerDetails (CustomerID, LoginID, FirstName, LastName, PhoneNumber, JoinDate,"+
  " StartingWeight, BirthdayDate, Age, Sex, Athlete, DefaultLang) VALUES (" + req.body.ID + ", " +
  req.body.LoginID + ", '" + req.body.FirstName + "', '" + req.body.LastName + "','" + 
  req.body.PhoneNumber + "'," + new Date(req.body.JoinDate) + ", " + req.body.StartingWeight + ", " + 
  new Date(req.body.BirthdayDate) + ", " + req.body.Age + " ,'" + req.body.Sex + "', " + req.body.Athlete +  ", '" + req.body.DefaultLang + "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to CustomerDetails Table: ' + JSON.stringify(req.body));
  })
})

//select all
app.get('/getCustomerDetails', (req, res) => {
  let sql = "SELECT * FROM CustomerDetails;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

//drop table
app.get('/dropCustomerDetailsTable', (req, res) => {
  let sql = "DROP TABLE CustomerDetails"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted CustomerDetails Table: ' + JSON.stringify(req.body));
  })
})

//find row
app.get('/findCustomerDetail', (req, res) => {
  let sql = "SELECT * FROM CustomerDetails WHERE CustomerID = " + req.body.CustomerID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row found in CustomerDetails Table: ' + JSON.stringify(result));
  })
})

//delete row
app.get('/deleteCustomerDetail', (req, res) => {
  let sql = "DELETE FROM CustomerDetails WHERE CustomerID = " + req.body.CustomerID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted row in CustomerDetails Table: ' + JSON.stringify(result));
  })
})


//************************ MeasurementDetails ***********************//
//create table
app.get('/createMeasurementsTable', (req, res) => {
  let sql = "CREATE TABLE IF NOT EXISTS MeasurementDetails (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, MeasureID int(32) UNSIGNED NOT NULL, " + 
  "CustomerID int(32) UNSIGNED NOT NULL, MeasureDate DATETIME NOT NULL, FatPercentage float(5, 2), AbdominalFatPercentage float(5, 2), " + 
  "Muscles int(16), Bones int(16), BMI int(16), BMR int(16), Liquids int(16), TotalWeight int(32), WaistCircumference int(16), HandCircumference int(16), BellyCircumference int(16), " +
  "PRIMARY KEY (MeasureID), KEY (autonumID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('MeasurementDetails table created/exists...');
  })
})

//insert 
app.get('/addNewMeasurementDetail', (req, res) => {
  let sql = "INSERT INTO MeasurementDetails (MeasureID, CustomerID, MeasureDate, FatPercentage, AbdominalFatPercentage, Muscles,"+
  " Bones, BMI, BMR, Liquids, TotalWeight, WaistCircumference, HandCircumference, BellyCircumference) VALUES (" + req.body.MeasureID + ", " +
  req.body.CustomerID + ", " + new Date(req.body.MeasureDate) + ", " + req.body.FatPercentage + ", " + req.body.AbdominalFatPercentage + ", " + 
  req.body.Muscles + ", " + req.body.Bones + ", " + req.body.BMI + ", " + req.body.BMR + ", " + req.body.Liquids + ", " + req.body.TotalWeight + ", " + 
  req.body.WaistCircumference + ", " + req.body.HandCircumferencea + ", " + req.body.BellyCircumference + ")"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to MeasurementDetails Table: ' + JSON.stringify(req.body));
  })
})

//select all
app.get('/getMeasurementDetails', (req, res) => {
  let sql = "SELECT * FROM MeasurementDetails;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('MeasurementDetails Table: ' + JSON.stringify(result));
  })
})
//drop table
app.get('/dropMeasurementDetailsTable', (req, res) => {
  let sql = "DROP TABLE MeasurementDetails"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted MeasurementDetails Table: ' + JSON.stringify(req.body));
  })
})

//find row
app.get('/findMeasurementDetail', (req, res) => {
  let sql = "SELECT * FROM MeasurementDetails WHERE MeasureID = " + req.body.MeasureID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row found in MeasurementDetails Table: ' + JSON.stringify(result));
  })
})
//delete row
app.get('/deleteMeasurementDetails', (req, res) => {
  let sql = "DELETE FROM MeasurementDetails WHERE MeasureID = " + req.body.MeasureID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted row in MeasurementDetails Table: ' + JSON.stringify(result));
  })
})

//************************ FoodItems ***********************//

app.get('/createfooditemstable', (req, res) => {
  let sql = "CREATE TABLE IF NOT EXISTS FoodItems (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, FoodID int(32) UNSIGNED NOT NULL, " + 
  "FoodName VARCHAR(50) NOT NULL, FoodNameDisp VARCHAR(50) NOT NULL, Category VARCHAR(50), Calories int(8), Proteins int(8), Fats int(8), Carbohydrates int(8), " + 
  "Sugars int(8), Sodium int(8), ImagePath VARCHAR(255), " +
  "PRIMARY KEY (FoodID), KEY (autonumID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('FoodItems table created/exists...');
  })
})

app.get('/getFoodItems', (req, res) => {
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

app.get('/getFoodItem/:id', (req, res) => {
  const id = req.params.id
  let sql = 'SELECT * FROM FoodItems WHERE FoodID = '+id+';'
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
    // res.send('FoodItems Table: ' + JSON.stringify(result));
  })
})


app.post('/addFoodItem', (req, res) => {
  let sql = "INSERT INTO FoodItems (FoodID, FoodName, FoodNameDisp, Category, Calories, Proteins, Fats, Carbohydrates, Sugars, Sodium, ImagePath) Values" + 
  "(" + req.body.FoodID + ", '" + req.body.FoodName + "', '" + req.body.FoodNameDisp + "', '" + req.body.Category + "', " + req.body.Calories + ", " + req.body.Proteins + ", " + req.body.Fats + ", " 
  + req.body.Carbohydrates + ", " + req.body.Sugars + ", " + req.body.Sodium + ", '" + req.body.ImagePath + "' )"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to FoodItems Table: ' + JSON.stringify(req.body));
  })
})

app.post('/updateFoodItem', (req, res) => {
  let sql = "UPDATE FoodItems SET FoodName = '" + req.body.FoodName + "', FoodNameDisp = '" + req.body.FoodNameDisp + 
  "', Category = '" + req.body.Category + "', Calories = " + req.body.Calories + ", Proteins = " + req.body.Proteins + 
  ", Fats = " + req.body.Fats + ", Carbohydrates = " + req.body.Carbohydrates + ", Sugars = " + req.body.Sugars + 
  ", Sodium = " + req.body.Sodium + ", ImagePath = '" + req.body.ImagePath + 
  "' WHERE FoodID = " + req.body.FoodID + ";"
  console.log(req.body.Sodium, req.body.Sugars, sql);
  // res.send(sql);
  // console.log("updateFoodItem: ", req)
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send(result);
  })
})

app.get('/dropFoodItemsTable', (req, res) => {
  let sql = "DROP TABLE FoodItems"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('Dropped FoodItems Table: ' + JSON.stringify(req.body));
  })
})

//delete row
app.get('/deleteFoodItems', (req, res) => {
  let sql = "DELETE FROM FoodItems WHERE FoodID = " + req.body.FoodID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted row in FoodItems Table: ' + JSON.stringify(result));
  })
})

//************************ DietaryPrograms ***********************//

//create diet programs table
app.get('/createDietaryProgramsTable', (req, res) => {
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
app.get('/getDietPrograms', (req, res) => {
  let sql = "SELECT * FROM DietaryPrograms;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('DietaryPrograms Table: ' + JSON.stringify(result));
  })
})

// add row to DietPrograms
app.get('/createDietProgram', (req, res) => {
  let sql = "INSERT INTO DietaryPrograms (ProgramID, ProgramName, TasteProfile, Description) Values" + 
  "(" + req.body.ProgramID + ", '" + req.body.ProgramName + "', '" + req.body.TasteProfile + "', '" + req.body.Description + "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('DietaryProgram row Added: ' + JSON.stringify(req.body));
  })
})

// find row in DietPrograms
app.get('/findDietProgram', (req, res) => {
  let sql = "SELECT * FROM DietaryPrograms WHERE ProgramID = " + req.body.AssignmentID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row found in DietaryPrograms Table: ' + JSON.stringify(result));
  })
})

// update row in DietPrograms
app.get('/updateDietProgram', (req, res) => {
  let sql = "UPDATE DietaryPrograms SET (ProgramID, ProgramName, TasteProfile, Description) Values" + 
  "(" + req.body.ProgramID + ", '" + req.body.ProgramName + "', '" + req.body.TasteProfile + "', '" + req.body.Description + "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('DietaryProgram row updated: ' + JSON.stringify(req.body));
  })
})

//delete row
app.get('/deleteDietaryProgram', (req, res) => {
  let sql = "DELETE FROM DietaryPrograms WHERE ProgramID = " + req.body.ProgramID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted row in DietaryPrograms Table: ' + JSON.stringify(result));
  })
})

//************************ CustomerPrograms ***********************//
//create table
app.get('/createCustomerProgramstable', (req, res) => {
  let sql ="CREATE TABLE IF NOT EXISTS CustomerPrograms (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, CustomerProgramID int(32) UNSIGNED NOT NULL, " + 
  "CustomerID int(32) UNSIGNED NOT NULL, ProgramID int(32) UNSIGNED NOT NULL, ProgramStart DATETIME NOT NULL, ProgramEnd DATETIME, Notes VARCHAR(1000)," + 
  "PRIMARY KEY (CustomerProgramID), KEY (autonumID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('CustomerPrograms table created or already exists...');
  })
})

//insert 
app.get('/createCustomerProgram', (req, res) => {
  let sql = "INSERT INTO CustomerPrograms (CustomerProgramID, CustomerID, ProgramID, ProgramStart, ProgramEnd, Notes) VALUES (" + req.body.CustomerProgramID + ", " +
  req.body.CustomerID + ", " + req.body.ProgramID + ", '" + new Date(req.body.ProgramStart) + "', '" + new Date(req.body.ProgramEnd) + "', '" + req.body.Notes + "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to CustomerPrograms Table: ' + JSON.stringify(req.body));
  })
})

//select all
app.get('/getCustomerPrograms', (req, res) => {
  let sql = "SELECT * FROM CustomerPrograms;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('CustomerPrograms Table: ' + JSON.stringify(result));
  })
})

//drop table
app.get('/dropCustomerProgramsTable', (req, res) => {
  let sql = "DROP TABLE CustomerPrograms"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted CustomerPrograms Table: ' + JSON.stringify(req.body));
  })
})

//find row
app.get('/findCustomerProgram', (req, res) => {
  let sql = "SELECT * FROM CustomerPrograms WHERE CustomerProgramID = " + req.body.CustomerProgramID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row found in CustomerPrograms Table: ' + JSON.stringify(result));
  })
})

// update row
app.get('/updateCustomerProgram', (req, res) => {
  let sql = "UPDATE CustomerPrograms SET (CustomerProgramID, CustomerID, ProgramID, ProgramStart, ProgramEnd, Notes) VALUES" + 
  "(" + req.body.CustomerProgramID + ", " + req.body.CustomerID + ", " + req.body.ProgramID +  ", '" + 
  new Date(req.body.ProgramStart) + "', '" + new Date(req.body.ProgramEnd) + "', '" + req.body.Notes + "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('CustomerPrograms row updated: ' + JSON.stringify(req.body));
  })
})

//delete row
app.get('/deleteCustomerProgram', (req, res) => {
  let sql = "DELETE FROM CustomerPrograms WHERE CustomerProgramID = " + req.body.CustomerProgramID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted row in CustomerPrograms Table: ' + JSON.stringify(result));
  })
})


//************************ MealItems ***********************//
//create table
app.get('/createMealItemstable', (req, res) => {
  let sql ="CREATE TABLE IF NOT EXISTS MealItems (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, MealItemID int(32) UNSIGNED NOT NULL, " + 
  "FoodID int(32) UNSIGNED NOT NULL, MealID int(32) UNSIGNED NOT NULL, Portion int(16) UNSIGNED NOT NULL, WeekDay int(4) UNSIGNED NOT NULL, Time VARCHAR(10)," + 
  "PRIMARY KEY (AssignmentID), KEY (autonumID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('MealItems table created or already exists...');
  })
})

//insert
app.get('/createMealItem', (req, res) => {
  let sql = "INSERT INTO MealItems (MealItemID, FoodID, MealID, Portion, WeekDay, Time) VALUES (" + req.body.MealItemID + ", " +
  req.body.FoodID + ", " + req.body.MealID + ", " + req.body.Portion + ", " + req.body.WeekDay + ",'" + req.body.Time + "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to MealItems Table: ' + JSON.stringify(req.body));
  })
})

//select all
app.get('/getMealItems', (req, res) => {
  let sql = "SELECT * FROM MealItems;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('MealItems Table: ' + JSON.stringify(result));
  })
})

//drop table
app.get('/dropMealItemsTable', (req, res) => {
  let sql = "DROP TABLE MealItems"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted MealItems Table: ' + JSON.stringify(req.body));
  })
})

//find row
app.get('/findMealItem', (req, res) => {
  let sql = "SELECT * FROM MealItems WHERE MealItemID = " + req.body.MealItemID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row found in MealItems Table: ' + JSON.stringify(result));
  })
})

// update row
app.get('/updateCustomerProgram', (req, res) => {
  let sql = "UPDATE MealItems SET (MealItemID, FoodID, MealID, Portion, WeekDay, Time) VALUES (" + 
  req.body.MealItemID + ", " + req.body.FoodID + ", " + req.body.MealID + ", " + req.body.Portion + 
  ", " + req.body.WeekDay + ",'" + req.body.Time + "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('CustomerPrograms row updated: ' + JSON.stringify(req.body));
  })
})

//delete row
app.get('/deleteMealItem', (req, res) => {
  let sql = "DELETE FROM MealItems WHERE MealItemID = " + req.body.MealItemID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted row in MealItems Table: ' + JSON.stringify(result));
  })
})

//************************ ProgramMeals ***********************//
//create table
app.get('/createProgramMealsTable', (req, res) => {
  let sql ="CREATE TABLE IF NOT EXISTS ProgramMeals (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, ProgramMealID int(32) UNSIGNED NOT NULL, " + 
  "ProgramID int(32) UNSIGNED NOT NULL, MealID int(32) UNSIGNED NOT NULL, " + 
  "PRIMARY KEY (ProgramMealID), KEY (autonumID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('ProgramMeals table created/exists...');
  })
})

//insert
app.get('/createProgramMeal', (req, res) => {
  let sql = "INSERT INTO ProgramMeals (ProgramMealID, ProgramID, MealID) VALUES (" + req.body.ProgramMealID + ", " +
  req.body.ProgramID + ", " + req.body.MealID + ")"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to ProgramMeals Table: ' + JSON.stringify(req.body));
  })
})

//select all
app.get('/getProgramMeals', (req, res) => {
  let sql = "SELECT * FROM ProgramMeals;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('ProgramMeals Table: ' + JSON.stringify(result));
  })
})

//drop table
app.get('/dropProgramMealsTable', (req, res) => {
  let sql = "DROP TABLE ProgramMeals"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted ProgramMeals Table: ' + JSON.stringify(req.body));
  })
})

//find row
app.get('/findProgramMeal', (req, res) => {
  let sql = "SELECT * FROM ProgramMeals WHERE ProgramMealID = " + req.body.ProgramMealID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row found in ProgramMeals Table: ' + JSON.stringify(result));
  })
})

// update row
app.get('/updateProgramMeal', (req, res) => {
  let sql = "UPDATE ProgramMeals SET (ProgramMealID, ProgramID, MealID) VALUES (" + req.body.ProgramMealID + ", " +
  req.body.ProgramID + ", " + req.body.MealID + ")"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('ProgramMeals row updated: ' + JSON.stringify(req.body));
  })
})

//delete row
app.get('/deleteProgramMeal', (req, res) => {
  let sql = "DELETE FROM ProgramMeals WHERE ProgramMealID = " + req.body.ProgramMealID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted row in ProgramMeals Table: ' + JSON.stringify(result));
  })
})


//************************ MealFoodItems ***********************//
//create table
app.get('/createMealFoodItemsTable', (req, res) => {
  let sql ="CREATE TABLE IF NOT EXISTS MealFoodItems (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, MealFoodItemID int(32) UNSIGNED NOT NULL, " + 
  "MealID int(32) UNSIGNED NOT NULL, FoodID int(32) UNSIGNED NOT NULL, " + 
  "PRIMARY KEY (MealFoodItemID), KEY (autonumID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('MealFoodItems table created/exists...');
  })
})

//insert
app.get('/createProgramMeal', (req, res) => {
  let sql = "INSERT INTO MealFoodItems (MealFoodItemID, MealID, FoodID) VALUES (" + req.body.MealFoodItemID + ", " +
  req.body.MealID + ", " + req.body.FoodID + ")"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to MealFoodItems Table: ' + JSON.stringify(req.body));
  })
})

//select all
app.get('/getMealFoodItems', (req, res) => {
  let sql = "SELECT * FROM MealFoodItems;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('MealFoodItems Table: ' + JSON.stringify(result));
  })
})

//drop table
app.get('/dropMealFoodItemsTable', (req, res) => {
  let sql = "DROP TABLE MealFoodItems"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted MealFoodItems Table: ' + JSON.stringify(req.body));
  })
})

//find row
app.get('/findMealFoodItem', (req, res) => {
  let sql = "SELECT * FROM MealFoodItems WHERE MealFoodItemID = " + req.body.MealFoodItemID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row found in MealFoodItems Table: ' + JSON.stringify(result));
  })
})

// update row
app.get('/updateMealFoodItem', (req, res) => {
  let sql = "UPDATE MealFoodItems SET (MealFoodItemID, MealID, FoodID) VALUES (" + req.body.MealFoodItemID + ", " +
  req.body.MealID + ", " + req.body.FoodID + ")"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('MealFoodItems row updated: ' + JSON.stringify(req.body));
  })
})

//delete row
app.get('/deleteMealFoodItem', (req, res) => {
  let sql = "DELETE FROM MealFoodItems WHERE MealFoodItemID = " + req.body.MealFoodItemID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted row in MealFoodItems Table: ' + JSON.stringify(result));
  })
})

//************************ Basics ***********************//


app.listen("8080", () => {
  console.log("Server started on port 8080");
});

//************************ Tests ***********************//

app.post('/testpost', (req, res) => {
  let sql = "INSERT INTO FoodItems (FoodID, FoodName, FoodNameDisp, Category, Calories, Proteins, Fats, Carbohydrates, Sugars, Sodium, ImagePath) Values(0, 'דייסת קוואקר, 'דייסת קוואקר', 'undefined', 91, 4, 1, 16, 1, 7, 'מנה בינונית' )"
  let data = req.body;
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('testpassed: ' + JSON.stringify(result));
  })
  // res.send('Data Received: ' + JSON.stringify(data), req, res);
})

app.get('/testPythonChildProcess', (req, res) => {
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

app.get('/exportLoginDetails', (req, res) => {
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



