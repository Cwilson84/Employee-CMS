# Employee-CMS
Module Twelve Challenge
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL_2.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)

## Description

This command-line application allows business owners to view and manage departments, roles, and employees in their company. The application provides various options to organize and plan the business effectively.

## Table of Contents

* [Installation](#installation)
* [Instructions](#instructions)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)

## Features

- View all Departments: Displays a formatted table showing department names and ID's.
- View all Roles: Presents the job title, role ID, department, and salary for each role.
- View all Employees: Shows a formatted table with employee data, including IDs, first names, last names, job titles, departments, salaries, and reporting managers.
- Add a Department: Prompts you to enter the name of the department and adds it to the database.
- Add a Role: Requests information such as name, salary, and department, and adds the role to the database.
- Add an Employee: Collects the employee's first name, last name, role, and manager, and adds the employee to the database.
- Update an Employee Role: Allows you to select an employee and assign a new role. The information is then updated in the database.

### Additional Features Included

- View Employees by Manager: Lists employees based on their reporting manager, providing a comprehensive view of employee management within each department.
- Update an Employee: Allows you to select an employee and modify their role, or manager. The changes are then reflected in the database.
- Update an Employee Manager: Enables you to select an employee and update their reporting manager.
- Delete an Employee: Allows you to choose an employee to delete from the database, removing their information from the system.
- Delete a Department: Enables the deletion of a department from the database, along with all associated roles and employees.
- Delete a Role: Allows the removal of a role from the database, including any employees assigned to that role.

## Installation

Install the necessary dependencies by running the following command:

```
npm i
```

## Instructions

Clone the repository to your local machine.

Install the necessary dependencies by running the following command:

```
npm install
```

Set up the database by executing the provided SQL script:

```
mysql -u <username> -p <password>
SOURCE ./db/schema.sql
SOURCE ./db/seeds.sql
```

Create a .env file in the root directory and provide the required environment variables:

```
DB_USER=<username>
DB_PASSWORD=<password>
DB_NAME=employee_db
DB_HOST=root
DB_PORT=3306
```

Run the application with the following command:

```
node server .js
```

Follow the on-screen instructions to navigate through the options and manage the departments, roles, and employees in your company.

## License:

MIT License

## Contributing

None at present.

## Tests

N/A

## Links

Link to demo video: [https://www.github.com/Cwilson84](https://www.github.com/Cwilson84)

## Credits

none

## Questions

If you have any questions, please contact me at chrisw@myself.com, or use the link to find me on Github! [https://www.github.com/Cwilson84](https://www.github.com/Cwilson84)
