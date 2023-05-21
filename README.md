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
DB_HOST=<your_database_host>
DB_PORT=<your_database_port>
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
