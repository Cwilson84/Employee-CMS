const connection = require("./db/connection");
const inquirer = require("inquirer");

require("console.table");

function init() {
  console.log("Main Menu");
  mainMenu();
}

async function mainMenu() {
  const { data } = await inquirer.prompt({
    type: "list",
    name: "data",
    message: "What would you like to do?",
    choices: [
      "View all Employees",
      "View Employees by Manager",
      "Add an Employee",
      "Delete an Employee",
      "Update an Employee",
      "Update an Employee Manager",
      "View all Departments",
      "Add a Department",
      "Delete a Department",
      "View all Roles",
      "Add a Role",
      "Delete a Role",
      "Exit",
    ],
  });

  switch (data) {
    case "View all Employees":
      viewallEmp();
      break;
    case "View Employees by Manager":
      viewEmpByManager();
      break;
    case "Add an Employee":
      addEmp();
      break;
    case "Delete an Employee":
      deleteEmployee()
      break;
    case "Update an Employee":
      updateEmp()
      break;
    case "Update an Employee Manager":
      updateEmpManager()
    break;
    case "View all Departments":
      viewallDept();
      break;
    case "Add a Department":
      addDept();
      break;
    case "Delete a Department":
      deleteDepartment()
      break;
    case "View all Roles":
      viewallRoles();
      break;
    case "Add a Role":
      addRole();
      break;
    case "Delete a Role":
      deleteRole()
      break;
    case "Exit":
      console.log("Goodbye");
      process.exit(0);
      break;
    default:
      console.log("Goodbye");
      process.exit(0);
      break;
  }
}

async function viewallEmp() {
  try {
    const [rows] = await connection.promise()
      .query(`SELECT e.id, e.first_name, e.last_name, r.title AS role, d.title AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
      FROM employee e
      LEFT JOIN roles r ON e.role_id = r.id
      LEFT JOIN department d ON r.department_id = d.id
      LEFT JOIN employee m ON e.manager_id = m.id`);
    console.table(rows);
    mainMenu();
  } catch (err) {
    console.log(err);
  }
}

const viewEmpByManager = async () => {
  await inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the manager's name:",
        name: "managerName",
      },
    ])
    .then((input) => {
      const { managerName } = input;
      connection.query(
        `SELECT e.id, e.first_name, e.last_name, r.title AS role, d.title AS department, r.salary, CONCAT(m.first_name, ' ', m.last_name) AS manager
         FROM employee e
         LEFT JOIN roles r ON e.role_id = r.id
         LEFT JOIN department d ON r.department_id = d.id
         LEFT JOIN employee m ON e.manager_id = m.id
         WHERE CONCAT(m.first_name, ' ', m.last_name) = ?`,
        [managerName],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          mainMenu();
        }
      );
    });
};

const addEmp = async () => {
  await inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the employee's first name:",
        name: "newFirstName",
      },
      {
        type: "input",
        message: "Please enter the employee's last name:",
        name: "newLastName",
      },
      {
        type: "input",
        message: "Please enter the employee's role id number:",
        name: "newRoleID",
      },
      {
        type: "input",
        message: "Please enter the manager's id number:",
        name: "managerID",
      },
    ])

    .then(function (employeeName) {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          employeeName.newFirstName,
          employeeName.newLastName,
          employeeName.newRoleID,
          employeeName.managerID,
        ],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          mainMenu();
        }
      );
    });
};

const deleteEmployee = async () => {
  await inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the employee ID you want to delete:",
        name: "employeeId",
      },
    ])
    .then((input) => {
      const { employeeId } = input;
      connection.query(
        "DELETE FROM employee WHERE id = ?",
        [employeeId],
        (err, res) => {
          if (err) throw err;
          console.log("Employee successfully deleted.");
          mainMenu();
        }
      );
    });
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

const updateEmpManager = async () => {
  await inquirer
    .prompt([
      {
        type: "input",
        message:
          "Please enter the name of the employee whose manager you wish to update:",
        name: "employeeName",
      },
      {
        type: "input",
        message: "Please enter the new manager's name (or leave blank for no manager):",
        name: "newManagerName",
      },
    ])
    .then((update) => {
      const { employeeName, newManagerName } = update;
      
      let query;
      let params;
      
      if (newManagerName) {
        query = "UPDATE employee AS e, employee AS m SET e.manager_id = m.id WHERE CONCAT(e.first_name, ' ', e.last_name) = ? AND CONCAT(m.first_name, ' ', m.last_name) = ?";
        params = [employeeName, newManagerName];
      } else {
        query = "UPDATE employee SET manager_id = NULL WHERE CONCAT(first_name, ' ', last_name) = ?";
        params = [employeeName];
      }
      
      connection.query(query, params, (err, res) => {
        if (err) throw err;
        console.table(res);
        mainMenu();
      });
    });
};


async function viewallDept() {
  try {
    const [rows] = await connection
      .promise()
      .query("SELECT id, title FROM department");
    console.table(rows);
    mainMenu();
  } catch (err) {
    console.log(err);
  }
}

const addDept = async () => {
  await inquirer
    .prompt({
      type: "input",
      name: "newDept",
      message: "Please enter Department name:",
    })

    .then(function (deptName) {
      connection.query(
        "INSERT INTO department (title) VALUES (?)",
        [deptName.newDept],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          mainMenu();
        }
      );
    });
};

const deleteDepartment = async () => {
  await inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the department ID you want to delete:",
        name: "departmentId",
      },
    ])
    .then((input) => {
      const { departmentId } = input;
      connection.query(
        "DELETE FROM department WHERE id = ?",
        [departmentId],
        (err, res) => {
          if (err) throw err;
          console.log("Department successfully deleted.");
          mainMenu();
        }
      );
    });
};

async function viewallRoles() {
  try {
    const [rows] = await connection
      .promise()
      .query(
        "SELECT r.id, r.title, r.salary, d.title AS department FROM roles r LEFT JOIN department d ON r.department_id = d.id"
      );
    console.table(rows);
    mainMenu();
  } catch (err) {
    console.log(err);
  }
}

const addRole = async () => {
  await inquirer
    .prompt([
      {
        type: "input",
        name: "newRole",
        message: "Please a name for this role:",
      },
      {
        type: "input",
        name: "newSalary",
        message: "Please enter the salary for this role",
      },
      {
        type: "input",
        name: "newRoleDept",
        message: "Please enter the department id number this role belongs to:",
      },
    ])

    .then(function (roleName) {
      connection.query(
        "INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)",
        [roleName.newRole, roleName.newSalary, roleName.newRoleDept],
        (err, res) => {
          if (err) throw err;
          console.table(res);
          mainMenu();
        }
      );
    });
};

const deleteRole = async () => {
  await inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the role ID you want to delete:",
        name: "roleId",
      },
    ])
    .then((input) => {
      const { roleId } = input;
      connection.query(
        "DELETE FROM roles WHERE id = ?",
        [roleId],
        (err, res) => {
          if (err) throw err;
          console.log("Role successfully deleted.");
          mainMenu();
        }
      );
    });
};

init();
