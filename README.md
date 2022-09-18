# JavaScript-Repo

To run/debug JavaScript or TypeScript files (VSCode):

1. `npm i -g ts-node typescript`
2. Create `tsconfig.json` in root directory
3. Add the below launch configurations in `.vscode`

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Run/Debug JS",
      "program": "${file}"
    },
    {
      "name": "Run/Debug TS",
      "type": "node",
      "request": "launch",
      "skipFiles": ["<node_internals>/**"],
      "runtimeExecutable": "ts-node",
      "program": "${file}"
    }
  ]
}
```
