const connection = require('./db/connection');
const inquirer = require('inquirer');

require("console.table");

function init(){
  console.log("Main Menu");
  mainMenu();
}

async function mainMenu(){
  const {data} = await inquirer.prompt({
    type: "list",
    name: "data",
    message: "What would you like to do?",
    choices: [
      "View all employees", 
      "View all departments", 
      "View all roles",
      "Add an employee",
      "Add a department",
      "Add a role",
      "Update an Employee",
      "Exit"
    ],
  })

  switch (data) {
    case "View all employees":
      viewallEmp()
    break;
    case "View all departments":
      viewallDept()
    break;
    case "View all roles":
      viewallRoles()
    break;
    case "Add an employee":
      addEmp()
    break;
    case "Add a department":
      addDept()
    break;
    case "Add a role":
      addRole()
    break;
    case "Update an Employee":
      updateEmp()
    break;
    case "Exit":
      console.log("Goodbye")
      process.exit(0)
  break;
  default:
      console.log("Goodbye")
      process.exit(0)
  break;
  }
}

async function viewallEmp(){
  try {
    const [rows] = await connection.promise().query(`SELECT e.id, e.first_name, e.last_name, r.title AS role, d.title AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      LEFT JOIN roles r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id`);
      console.table(rows);
      mainMenu()
  } catch (err) {
    console.log(err);
  }
}

async function viewallDept(){
  try {
    const [rows] = await connection.promise().query('SELECT id, title FROM department');
      console.table(rows);
      mainMenu()
  } catch (err) {
    console.log(err);
  }
}

async function viewallRoles(){
  try {
    const [rows] = await connection.promise().query('SELECT r.id, r.title, r.salary, d.title AS department FROM roles r LEFT JOIN department d ON r.department_id = d.id');
      console.table(rows);
      mainMenu()
  } catch (err) {
    console.log(err);
  }
}

const addEmp = async () => {
  await inquirer.prompt([
    {
      type: "input",
      message: "Please enter the employee's first name:",
      name: "newFirstName"
    },
    {
      type: "input",
      message: "Please enter the employee's last name:",
      name: "newLastName"
    },
    {
      type: "input",
      message: "Please enter the employee's role id number:",
      name: "newRoleID"
    },
    {
      type: "input",
      message: "Please enter the manager's id number:",
      name: "managerID"
    }]
  )

  .then(function(employeeName){
    connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [employeeName.newFirstName, employeeName.newLastName, employeeName.newRoleID, employeeName.managerID] , (err, res) => {
      if (err) throw (err);
      console.table(res);
      mainMenu()
    })})
  };

  const addDept = async () => {
    await inquirer.prompt (
      {
          type: 'input',
          name: 'newDept',
          message: 'Please enter Department name:'
  
      })
  
      .then(function(deptName){
        connection.query("INSERT INTO department (title) VALUES (?)", [deptName.newDept], (err, res) => {
          if (err) throw (err);
          console.table(res);
          mainMenu()
      })})
  };

  const addRole = async () => {
    await inquirer.prompt ([
      {
          type: 'input',
          name: 'newRole',
          message: 'Please a name for this role:'
  
      },
      {
          type: 'input',
          name: 'newSalary',
          message: 'Please enter the salary for this role'
  
      },
      {
          type: 'input',
          name: 'newRoleDept',
          message: 'Please enter the department id number this role belongs to:'
      }]
      )
  
      .then(function(roleName){
        connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [roleName.newRole, roleName.newSalary, roleName.newRoleDept] , (err, res) => {
          if (err) throw (err);
          console.table(res);
          mainMenu()
  })})
  };

  const updateEmp = async () => {
    await inquirer
      .prompt([
        {
          type: "input",
          message: "Please enter the name of the employee you wish to edit:",
          name: "employeeName",
        },
        {
          type: "input",
          message: "Please enter the employee's new role, by ID:",
          name: "newRoleId",
        },
      ])
      .then((update) => {
        const { employeeName, newRoleId } = update;
        connection.query(
          "UPDATE employee SET role_id = ? WHERE CONCAT(first_name, ' ', last_name) = ?",
          [newRoleId, employeeName],
          (err, res) => {
            if (err) throw err;
            console.table(res);
            mainMenu();
          }
        );
      });
  };
  

init();