const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: 'root',
  
    // Your password
    password: '',
    database: 'employee_db',
  });

  const start = () => {
    inquirer
      .prompt({
        name: 'addUpdateView',
        type: 'list',
        message: 'What would you like to do?',
        choices: ['ADD EMPLOYEE', 'UPDATE EMPLOYEE ROLE','VIEW EMPLOYEE', 'ADD ROLE', 'VIEW ROLE','ADD DEPARTMENT', 'VIEW DEPARTMENT'],
      })
      .then((answer) => {
        // based on their answer, either call the bid or the post functions
        if (answer.addUpdateView === 'ADD EMPLOYEE') {
          addEmployee();
        } else if (answer.addUpdateView === 'UPDATE EMPLOYEE ROLE') {
          updateEmployeeRole();
        
        } else if (answer.addUpdateView === 'VIEW EMPLOYEE') {
            viewEmployee();
        } else if (answer.addUpdateView === 'ADD ROLE') {
            addRole();
        }else if (answer.addUpdateView === 'VIEW ROLE') {
            viewRole();
        }else if (answer.addUpdateView === 'ADD DEPARTMENT') {
            addDepartment();
        }else if (answer.addUpdateView === 'VIEW DEPARTMENT') {
            viewDepartment();
        }else {
            connection.end();
        }
        });
    };
    const addEmployee = () => {
        inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'what is the first name of the employee you would like to add?',
            },
            {
                name: 'last_name',
                type:'input',
                message:'What is the last name of the employee you would like to add?',
            },
            {
                name:'role_id',
                type:'input',
                message:'what is the employees role ID?',
                validate(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  },
            },
            {
                name:'manager_id',
                type:'input',
                message:'what is the manager id?',
                validate(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  },
            },
        ])
        .then((answer) => {
            connection.query(
                'INSERT INTO employee SET ?',
                {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id,
                },
                (err) => {
                    if (err) throw err;
                    console.log("Your employee has been added!");
                    start();
                }
            );
        });
    };
    const addRole = () => {
        inquirer
        .promt([
            {
                name: 'title',
                type:'input',
                message:'What is the title of the role you would like to add?',
            },
            {
                name:'salary',
                type:'input',
                message:'what is the salary for this role?',
                validate(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  },
            },
            {
                name:'department_id',
                type:'input',
                message:'what is the department ID?',
                validate(value) {
                    if (isNaN(value) === false) {
                      return true;
                    }
                    return false;
                  },
            },
            

            
        ])
        .then((answer) => {
          connection.query(
          'INSERT INTO role SET ?',
            {
              title: answer.title,
              salary: answer.salary,
              department_id: answer.department_id
            },
            (err) => {
              if (err) throw err;
              console.log('your role has been added!');
              start();
            }
          )
        })
    }
    const addDepartment = () => {
      inquirer
      .prompt([
        {
          name: 'name',
          type: 'input',
          message: 'What is the name of the department you would like to add?'
        },
        {
          name: 'id',
          type: 'input',
          message: 'what is the ID of the department you would like to add?'
        }
      ])
      .then((answer) => {
        connection.query(
          'INSERT INTO department SET ?',
          {
            name: answer.name,
            id: answer.id
          },
          (err) => {
            if (err) throw err;
            console.log('Your department has been added!')
          }
        )
      })
    }
    start();