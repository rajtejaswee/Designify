import { Step, StepType } from './types/index';

/*
 * Parse input XML and convert it into steps.
 * Eg: Input - 
 * <designifyArtifact id=\"project-import\" title=\"Project Files\">
 *  <designifyAction type=\"file\" filePath=\"eslint.config.js\">
 *      import js from '@eslint/js';\nimport globals from 'globals';\n
 *  </designifyAction>
 * <designifyAction type="shell">
 *      node index.js
 * </designifyAction>
 * </designifyArtifact>
 * 
 * Output - 
 * [{
 *      title: "Project Files",
 *      status: "Pending"
 * }, {
 *      title: "Create eslint.config.js",
 *      type: StepType.CreateFile,
 *      code: "import js from '@eslint/js';\nimport globals from 'globals';\n"
 * }, {
 *      title: "Run command",
 *      code: "node index.js",
 *      type: StepType.RunScript
 * }]
 * 
 * The input can have strings in the middle they need to be ignored
 */
export function parseXml(response) {
  // Extract the XML content between <designifyArtifact> tags
  const xmlMatch = response.match(/<designifyArtifact[^>]*>([\s\S]*?)<\/designifyArtifact>/);
  
  if (!xmlMatch) {
    return [];
  }

  const xmlContent = xmlMatch[1];
  const steps = [];
  let stepId = 1;

  // Extract artifact title
  const titleMatch = response.match(/title="([^"]*)"/);
  const artifactTitle = titleMatch ? titleMatch[1] : 'Project Files';

  // Add initial artifact step
  steps.push({
    id: stepId++,
    title: artifactTitle,
    description: '',
    type: StepType.CreateFolder,
    status: 'pending'
  });

  // Regular expression to find designifyAction elements
  const actionRegex = /<designifyAction\s+type="([^"]*)"(?:\s+filePath="([^"]*)")?>([\s\S]*?)<\/designifyAction>/g;
  
  let match;
  while ((match = actionRegex.exec(xmlContent)) !== null) {
    const [, type, filePath, content] = match;

    if (type === 'file') {
      // File creation step
      steps.push({
        id: stepId++,
        title: `Create ${filePath || 'file'}`,
        description: '',
        type: StepType.CreateFile,
        status: 'pending',
        code: content.trim(),
        path: filePath
      });
    } else if (type === 'shell') {
      // Shell command step
      steps.push({
        id: stepId++,
        title: 'Run command',
        description: '',
        type: StepType.RunScript,
        status: 'pending',
        code: content.trim()
      });
    }
  }

  return steps;
}
