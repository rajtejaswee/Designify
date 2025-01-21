// StepType equivalent in JavaScript (using an object)
export const StepType = {
  CreateFile: 'CreateFile',
  CreateFolder: 'CreateFolder',
  EditFile: 'EditFile',
  DeleteFile: 'DeleteFile',
  RunScript: 'RunScript'
};

// Define a Step constructor function
export function Step(id, title, description, type, status, code = '', path = '') {
  this.id = id;
  this.title = title;
  this.description = description;
  this.type = type;
  this.status = status;
  this.code = code;
  this.path = path;
}

// Define a Project constructor function
export function Project(prompt, steps) {
  this.prompt = prompt;
  this.steps = steps;
}

// Define a FileItem constructor function
export function FileItem(name, type, children = [], content = '', path) {
  this.name = name;
  this.type = type;
  this.children = children;
  this.content = content;
  this.path = path;
}

// Define a FileViewerProps structure (since it's more about passing props in React, we leave it as an object)
export function FileViewerProps(file = null, onClose) {
  this.file = file;
  this.onClose = onClose;
}
