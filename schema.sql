CREATE employee_db;

USE employee_db;

CREATE TABLE department(
    id INT AUTO_INCREMENT PRIMARY KEY,
    NAME VARCHAR(30) NOT NULL
);

CREATE TABLE role(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL,
    INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE

);

CREATE TABLE employee(
    id INT PRIMARY KEY AUTO_INCREMENT
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT,
      manager_id INT UNSIGNED,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id) ON DELETE SET NULL

)
