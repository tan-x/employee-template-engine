const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

let staff = [];
let id = 1;
let cont = true;

const prompt = function() {
    inquirer.prompt([
        {
            type: 'input',
            message: 'Name:',
            name: 'name'
        },
        {
            type: 'input',
            message: 'Email:',
            name: 'email'
        },
        {
            type: 'list',
            message: 'What is your role?',
            choices: ['Manager', 'Engineer', 'Intern'],
            name: 'role'
        },
        {
            type: 'input',
            message: 'Github username:',
            name: 'github',
            when: (answer) => answer.role === 'Engineer',
        },
        {
            type: 'input',
            message: 'School:',
            name: 'school',
            when: (answer) => answer.role === 'Intern',
        },
        {
            type: 'input',
            message: 'Office Number:',
            name: 'number',
            when: (answer) => answer.role === 'Manager',
        },
        {
            type: 'confirm',
            message: 'Enter another employee?',
            name: 'entry',
        },
    ]).then(response => {
        cont = response.entry;
        delete response['entry'];
        let entry = {...response, id};
        let employee;
        switch (response.role) {
            case 'Manager':
                employee = new Manager(response.name, id, response.email, response.number);
                break;
            case 'Engineer':
                employee = new Engineer(response.name, id, response.email, response.github);
                break;
            case 'Intern':
                employee = new Intern(response.name, id, response.email, response.school);
                break;
            default:
                employee = new Employee(response.name, id, response.email);
        }
        staff = [...staff, employee];
        id++;
        if (cont) {
            prompt();
        }
    }).then(() => {
        if (cont === false) {
            fs.writeFile('output/team.html', render(staff), err => {
                if (err) {
                    throw err;
                }
                console.log('Success! New team.html in /output folder.');
            });
        }
    })
}

prompt();


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
