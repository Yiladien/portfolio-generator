const inquirer = require("inquirer");
const fs = require("fs");
const generatePage = require("./src/page-template");

// const pageHTML = generatePage(name, github);

// fs.writeFile("./index.html", pageHTML, (err) => {
//   if (err) throw err;

//   console.log("Portfolio complete! Check out index.html to see the output!");
// });

// console.log(inquirer);

const promptUser = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "What is your name?",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log(`Please enter your name!`);
          return false;
        }
      },
    },
    {
      type: "input",
      name: "github",
      message: "Enter your GitHub Username",
      validate: (nameInput) => {
        if (nameInput) {
          return true;
        } else {
          console.log(`Please enter your Username!`);
          return false;
        }
      },
    },
    {
      type: "confirm",
      name: "confirmAbout",
      message:
        'Would you like to enter some information about yourself for an "About" section?',
      default: true,
    },
    {
      type: "input",
      name: "about",
      message: "Provide some information about yourself:",
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      },
    },
  ]);
};

const promptProject = (portfolioData) => {
  // If there's no 'projects' array property, create one
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  console.log(`
=================
Add a New Project
=================
`);
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the name of your project?",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log(`Please enter the project name!`);
            return false;
          }
        },
      },
      {
        type: "input",
        name: "description",
        message: "Provide a description of the project (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log(`Please enter the project description!`);
            return false;
          }
        },
      },
      {
        type: "checkbox",
        name: "languages",
        message: "What did you build this project with? (Check all that apply)",
        choices: [
          "JavaScript",
          "HTML",
          "CSS",
          "ES6",
          "jQuery",
          "Bootstrap",
          "Node",
        ],
      },
      {
        type: "input",
        name: "link",
        message: "Enter the GitHub link to your project. (Required)",
        validate: (nameInput) => {
          if (nameInput) {
            return true;
          } else {
            console.log(`Please enter the github link!`);
            return false;
          }
        },
      },
      {
        type: "confirm",
        name: "feature",
        message: "Would you like to feature this project?",
        default: false,
      },
      {
        type: "confirm",
        name: "confirmAddProject",
        message: "Would you like to enter another project?",
        default: false,
      },
    ])
    .then((projectData) => {
      portfolioData.projects.push(projectData);
      if (projectData.confirmAddProject) {
        return promptProject(portfolioData);
      } else {
        return portfolioData;
      }
    });
};

// promptUser()
//   .then(promptProject)
//   .then((portfolioData) => {
//     const pageHTML = generatePage(portfolioData);
//     fs.writeFile("./index.html", pageHTML, (err) => {
//       if (err) throw new Error(err);
//       console.log(
//         "Page created! Check out index.html in this directory to see it!"
//       );
//     });
//   });

const mockData = {
  name: "Davy",
  github: "davyjones",
  confirmAbout: true,
  about: "I am a pirate",
  projects: [
    {
      name: "Pirate Ship Adventure",
      description: "Learn to sail a pirate ship",
      languages: [`HTML`, `CSS`, `JavaScript`],
      link: "linktoship",
      feature: true,
      confirmAddProject: true,
    },
    {
      name: "Swim Lessons",
      description: "Learn to swim in the ocean with a pirate",
      languages: [`HTML`, `CSS`, `JavaScript`, `JQuery`],
      link: "linktoswimlessons",
      feature: false,
      confirmAddProject: true,
    },
    {
      name: "Gold Hunting",
      description:
        "Pirates love gold and so should you. Come with me on a quest for gold in the open ocean.",
      languages: [`HTML`, `CSS`, `JavaScript`, `JQuery`],
      link: "goldlink",
      feature: false,
      confirmAddProject: false,
    },
  ],
};

const pageHTML = generatePage(mockData);

fs.writeFile("./index.html", pageHTML, (err) => {
  if (err) throw new Error(err);
  console.log(
    "Page created! Check out index.html in this directory to see it!"
  );
});
