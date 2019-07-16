// Tree Data Structure in JavaScript

let createNode = key => {
  const children = [];

  return {
    key,
    children,
    addChild(childKey) {
      const childNode = createNode(childKey);
      children.push(childNode);
      return childNode;
    }
  };
};

let createTree = rootKey => {
  const root = createNode(rootKey);

  return {
    root
  };
};

const dom = createTree('html');
const head = dom.root.addChild('head');
const body = dom.root.addChild('body');
const title = head.addChild('title - egghead Tree Lesson');
const header = body.addChild('header');
const main = body.addChild('main');
const footer = body.addChild('footer');
const h1 = header.addChild('h1 - Tree Lesson');
const p = main.addChild('p - learn about trees!');
const copyright = footer.addChild(`Copyright ${new Date().getFullYear()}`);
