INSERT INTO department (title) VALUES
('Sales'),
('Development'),
('Accounting'),
('Marketing');

INSERT INTO roles (title, salary, department_id) VALUES
('Salesperson', 30000, 1),
('Sales Manager', 50000, 1),
('Junior Developer', 50000, 2),
('Senior Developer', 120000, 2),
('Accountant', 115000, 3),
('Accounting Manager', 130000, 3),
('Marketing Manager', 85000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Michael', 'Fox', 7, NULL),
('Nadiya', 'Wilson', 4, NULL),
('Nathan', 'Fulton', 6, NULL),
('Jeremy', 'Ingram', 2, 1),
('Oliver', 'Robbins', 3, 2),
('Natalie', 'Chang', 1, 4),
('Sean', 'Cruz', 5, 3),
('Spencer', 'Rinkavage', 1, 4),
('Bob', 'Heina', 2, 1); 
