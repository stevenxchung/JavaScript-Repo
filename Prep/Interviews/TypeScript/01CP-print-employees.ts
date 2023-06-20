/*
 * You are need to represent a company hierarchy as a data structure.
 * You can represent this as a data structure called Employee.
 * An Employee has a name, title and directReports. directReports will
 * be an array of Employee objects.
 */

// Task 1: Fill in here
interface Employee {
  name: string;
  title: string;
  directs: Employee[];
}

// Populate your initial data here
// Your company hierarchy should look like this
// Name         Title           Direct Reports
// Jessica      CEO             Bob, Jane, David, Doug
// Doug      Dir. of People  Phil
// Bob          CTO             Sam, Matt
// Jane         COO             Rebecca
// David        CFO             Grace
// Sam          VP Eng          Liz
// Matt         VP Dev          Aaron
// Rebecca      VP Op           Doug
// Grace        VP Fin          Adam, Michael
// Phil      Mngr. People
// Liz          DevOps Eng
// Aaron        Developer
// Doug         Op Manager
// Adam         Accountant
// Michael      Snr. Accountant
// Task 2: Fill in here
const aaron: Employee = {
  name: 'Aaron',
  title: 'Developer',
  directs: [],
};
const liz: Employee = {
  name: 'Liz',
  title: 'DevOps Eng',
  directs: [],
};
const matt: Employee = {
  name: 'Matt',
  title: 'VP Dev',
  directs: [aaron],
};
const sam: Employee = {
  name: 'Sam',
  title: 'VP Eng',
  directs: [liz],
};
const bob: Employee = {
  name: 'Bob',
  title: 'CTO',
  directs: [sam, matt],
};
const jessica: Employee = {
  name: 'Jessica',
  title: 'CEO',
  directs: [bob],
};
// you can add additional variables to fill in the remainder of the data.
// the variables you create here should reference each other. So the CEO employee object
// should reference the CTO object in the directReports property. You should end up
// with a tree structure with the root node being the CEO which is passed into your
// function below.

// Fill in the function below to print out the employees and their direct report names
// Each employee's information should printed out in this format:
// Jessica (CEO) - Bob, Jane, David, Doug
// Employees with no direct reports should only have their name and title printed:
// Liz (DevOps Eng)
// In between each set of employees printed out at each level there should be a line printed
// *********** NEW COMPANY LEVEL ***********
// You can use console.log() to output each line.
// The order of the employees printed at each level does not matter. As an example, the
// first few lines of your output should look something like this:
//
// *********** NEW COMPANY LEVEL ***********
// Jessica (CEO) - Bob, Jane, David, Doug
// *********** NEW COMPANY LEVEL ***********
// Doug (Dir. of People) - Phil
// Bob (CTO) - Sam, Matt
// Jane (COO) - Rebecca
// David (CFO) - Grace
// *********** NEW COMPANY LEVEL ***********
// Sam (VP Eng) - Liz
// Task 3: Fill in here
function consoleLogCompanyHierarchy(employee: Employee) {
  const queue: [Employee, number][] = [[employee, 0]];
  let prevLevel;
  while (queue.length > 0) {
    const [node, level] = queue.shift();

    if (prevLevel !== level) {
      prevLevel = level
      console.log('*********** NEW COMPANY LEVEL ***********')
    }

    if (node.directs.length > 0) {
      const directs = node.directs
        .map((e) => e.name)
        .join(', ');
      console.log(`${node.name} (${node.title}) - ${directs}`);
      for (const direct of node.directs) {
        queue.push([direct, level + 1])
      }

    } else {
      console.log(`${node.name} (${node.title})`);
    }

  }
}
consoleLogCompanyHierarchy(jessica);
