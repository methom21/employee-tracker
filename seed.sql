USE employee_db;
SET FOREIGN_KEY_CHECKS=0;
INSERT INTO department(name)VALUES("sales"),("finance"),("management");
INSERT INTO role(title,salary,department_id) VALUES("salesperson", 50000, 1);
INSERT INTO employee(first_name,last_name,role_id, manager_id) VALUES("michael","thompson",2,3);
