const express = require("express");
const mysql = require("mysql");
const bodyParser = require('body-parser');
var cors = require('cors')
const DBName = 'relive_database';

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
app.use(cors())


app.get('/', (req, res) => {
  res.send('Hello World!!!!')
})

// each table gets its own section

//************************ LoginDetails ***********************//
//create table
app.get('/createlogindetailstable', (req, res) => {
  let sql = "CREATE TABLE IF NOT EXISTS LoginDetails (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, LoginID int(32) UNSIGNED NOT NULL, " + 
  "Username VARCHAR(50) NOT NULL, Password VARCHAR(250) NOT NULL, PRIMARY KEY (LoginID), KEY (autonumID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('LoginDetails table created/exists...');
  })
})

//insert
app.get('/createnewlogin', (req, res) => {
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
app.get('/findLoginDeatail', (req, res) => {
  let sql = "SELECT * FROM LoginDetails WHERE LoginID = " + req.body.LoginID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row found in LoginDetails Table: ' + JSON.stringify(result));
  })
})

//delete row
app.get('/deleteLoginDeatail', (req, res) => {
  let sql = "DELETE FROM LoginDetails WHERE LoginID = " + req.body.LoginID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted row in LoginDetails Table: ' + JSON.stringify(result));
  })
})

//************************ CustomerDetails ***********************//
//creat table
app.get('/createcustomerdetailstables', (req, res) => {
    let sql = "CREATE TABLE IF NOT EXISTS CustomerDetails (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, ID int(32) UNSIGNED NOT NULL, " + 
    "LoginID int(32) UNSIGNED NOT NULL, FirstName VARCHAR(50) NOT NULL, LastName VARCHAR(50) NOT NULL, PhoneNumber VARCHAR(15), " + 
    "JoinDate DATETIME, StartingWeight int(32), BirthdayDate DATE, Height int(16), Age int(8), Sex VARCHAR(10), Athlete BOOL, " +
    "PRIMARY KEY (ID), KEY (autonumID)) ENGINE = InnoDB;";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('CustomerDetails table created/exists...');
    })
})

//insert
app.get('/createnewcustomer', (req, res) => {
  let sql = "INSERT INTO CustomerDetails (ID, LoginID, FirstName, LastName, PhoneNumber, JoinDate,"+
  " StartingWeight, BirthdayDate, Height, Age, Sex, Athlete) VALUES (" + req.body.ID + ", " +
  req.body.LoginID + ", '" + req.body.FirstName + "', '" + req.body.LastName + "','" + 
  req.body.PhoneNumber + "'," + new Date(req.body.JoinDate) + ", " + req.body.StartingWeight + ", " + 
  new Date(req.body.BirthdayDate) + ", " + req.body.Height + ", " + req.body.Age + " ,'" + req.body.Sex + "', " + req.body.Athlete + ")"
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
    res.send('CustomerDetails Table: ' + JSON.stringify(result));
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
app.get('/findCustomerDetails', (req, res) => {
  let sql = "SELECT * FROM CustomerDetails WHERE ID = " + req.body.ID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row found in CustomerDetails Table: ' + JSON.stringify(result));
  })
})

//delete row
app.get('/deleteCustomerDetails', (req, res) => {
  let sql = "DELETE FROM CustomerDetails WHERE ID = " + req.body.ID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted row in CustomerDetails Table: ' + JSON.stringify(result));
  })
})


//************************ MeasurementDetails ***********************//
//create table
app.get('/createmeasurementstable', (req, res) => {
  let sql = "CREATE TABLE IF NOT EXISTS MeasurementDetails (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, MeasureID int(32) UNSIGNED NOT NULL, " + 
  "CustomerID int(32) UNSIGNED NOT NULL, MeasureDate DATETIME NOT NULL, FatPercentage int(16), AbdominalFatPercentage int(16), " + 
  "Muscles int(16), Bones int(16), BMI int(16), BMR int(16), Liquids int(16), TotalWeight int(32), WaistCircumference int(16), HandCircumference int(16), BellyCircumference int(16), " +
  "PRIMARY KEY (MeasureID), KEY (autonumID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('MeasurementDetails table created/exists...');
  })
})

//insert 
app.get('/createnewmeasurement', (req, res) => {
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
app.get('/findMeasurementDetails', (req, res) => {
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
  "FoodName VARCHAR(50) NOT NULL, Category VARCHAR(50), Calories int(8), Proteins int(8), Fats int(8), Carbohydrates int(8), " + 
  "Sugars int(8), ImagePath VARCHAR(255), " +
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


app.get('/addfooditem', (req, res) => {
  let sql = "INSERT INTO FoodItems (FoodID, FoodName, Category, Calories, Proteins, Fats, Carbohydrates, Sugars, ImagePath) Values" + 
  "(" + req.body.FoodID + ", '" + req.body.FoodName + "', '" + req.body.Category + "', " + req.body.Calories + ", " + req.body.Proteins + ", " + req.body.Fats + ", " 
  + req.body.Carbohydrates + ", " + req.body.Sugars + ", '" + req.body.ImagePath + "' )"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to FoodItems Table: ' + JSON.stringify(req.body));
  })
})

app.post('/updatefooditem', (req, res) => {
  let sql = "UPDATE FoodItems SET FoodName = '" + req.body.FoodName + "', Category = '" + req.body.Category + "', Calories = " + req.body.Calories + 
  ", Proteins = " + req.body.Proteins + ", Fats = " + req.body.Fats + ", Carbohydrates = " + req.body.Carbohydrates + ", Sugars = " + req.body.Sugars + 
  ", ImagePath = '" + req.body.ImagePath + "' WHERE FoodID = " + req.body.FoodID + ";"
  console.log(sql);
  res.send(sql);
  // db.query(sql, (err, result) => {
  //   if(err) throw err;
  //   console.log(result);
  //   res.send('row added to FoodItems Table: ' + JSON.stringify(req.body));
  // })
})

app.get('/dropFoodItemsTable', (req, res) => {
  let sql = "DROP TABLE FoodItems"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to FoodItems Table: ' + JSON.stringify(req.body));
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
app.get('/createdietaryprogramstable', (req, res) => {
  let sql = "CREATE TABLE IF NOT EXISTS DietaryPrograms (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, ProgramID int(32) UNSIGNED NOT NULL, " + 
  "ProgramName VARCHAR(50) NOT NULL, MealIDs VARCHAR(1000), TasteProfile VARCHAR(1000), Description VARCHAR(1000), " + 
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
  let sql = "INSERT INTO DietaryPrograms (ProgramID, ProgramName, MealIDs, TasteProfile, Description) Values" + 
  "(" + req.body.ProgramID + ", '" + req.body.ProgramName + "', '" + req.body.MealIDs + "', '" + req.body.TasteProfile + "', '" + req.body.Description + "')"
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
  let sel_sql = "SELECT * FROM DietaryPrograms WHERE ProgramID = " + req.body.AssignmentID + ";"
  sel_result = []
  db.query(sel_sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    sel_result = result
  })
  if (length(sel_result) == 0){
    res.send("No DietaryProgram Found")
  }
  else {
    sel_result.MealIDs.push(req.body.MealIDs)
    let sql = "UPDATE DietaryPrograms SET (ProgramID, ProgramName, MealIDs, TasteProfile, Description) Values" + 
    "(" + req.body.ProgramID + ", '" + req.body.ProgramName + "', '" + sel_result.MealIDs + "', '" + req.body.TasteProfile + "', '" + req.body.Description + "')"
    db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('DietaryProgram row updated: ' + JSON.stringify(req.body));
    })
  }
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

//delete row
app.get('/deleteMealItem', (req, res) => {
  let sql = "DELETE FROM MealItems WHERE MealItemID = " + req.body.MealItemID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted row in MealItems Table: ' + JSON.stringify(result));
  })
})

//************************ ProgramAssignments ***********************//
//create table
app.get('/createprogramassignmentstable', (req, res) => {
  let sql ="CREATE TABLE IF NOT EXISTS ProgramAssignments (autonumID int(32) UNSIGNED NOT NULL AUTO_INCREMENT, AssignmentID int(32) UNSIGNED NOT NULL, " + 
  "ProgramID int(32) UNSIGNED NOT NULL, CustomerID int(32) UNSIGNED NOT NULL, StartDate DATE, EndDate DATE, " + 
  "PRIMARY KEY (AssignmentID), KEY (autonumID)) ENGINE = InnoDB;";
  db.query(sql, (err, result) => {
      if(err) throw err;
      console.log(result);
      res.send('ProgramAssignments table created/exists...');
  })
})

//insert
app.get('/createnewprogram', (req, res) => {
  let sql = "INSERT INTO ProgramAssignments (AssignmentID, ProgramID, CustomerID, StartDate, EndDate) VALUES (" + req.body.AssignmentID + ", " +
  req.body.ProgramID + ", " + req.body.CustomerID + ", '" + new Date(req.body.StartDate) + "','" + 
  new Date(req.body.EndDate) + "')"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row added to ProgramAssignments Table: ' + JSON.stringify(req.body));
  })
})

//select all
app.get('/getProgramAssignments', (req, res) => {
  let sql = "SELECT * FROM ProgramAssignments;"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('ProgramAssignments Table: ' + JSON.stringify(result));
  })
})

//drop table
app.get('/dropProgramAssignmentsTable', (req, res) => {
  let sql = "DROP TABLE ProgramAssignments"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted ProgramAssignments Table: ' + JSON.stringify(req.body));
  })
})

//find row
app.get('/findProgramAssignments', (req, res) => {
  let sql = "SELECT * FROM ProgramAssignments WHERE AssignmentID = " + req.body.AssignmentID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('row found in ProgramAssignments Table: ' + JSON.stringify(result));
  })
})

//delete row
app.get('/deleteProgramAssignments', (req, res) => {
  let sql = "DELETE FROM ProgramAssignments WHERE AssignmentID = " + req.body.AssignmentID + ";"
  db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    res.send('deleted row in ProgramAssignments Table: ' + JSON.stringify(result));
  })
})







app.post('/testpost', (req, res) => {
  let data = req.body;
  res.send('Data Received: ' + JSON.stringify(data), req, res);
})

app.listen("8080", () => {
    console.log("Server started on port 8080");
});

// app.post('/addfooditem', (req, res) => {
//   let sql = "INSERT INTO FoodItems (FoodID, FoodName, Category, Calories, Proteins, Fats, Carbohydrates, Sugars, ImagePath) Values" + 
//   "();"
//   console.log("post request, req: " + req)
//   console.log(JSON.stringify(req.body))
//   res.json(req.body)
// })



