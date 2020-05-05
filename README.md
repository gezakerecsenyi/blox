# blox
A better Blockly.

This is a project to recreate the features of Google's [Blockly](https://github.com/google/blockly), but in a way which is easier to use, develop, redesign and integrate with other features.

Some planned features include:
 - Automatic reverse-coding functionality (i.e., code is converted to blocks)
 - Blocks can be saved as JSON instead of Blockly's cumbersome XML format
 - Nice, material-design blocks and workspace
 - Easy creation of workspace themes
 - Settings menu and easier creation of flyouts with React components
 - Export workspace as image
 - Developers can implement better & more complex rules for block nesting
 - More compact, easy-to-define block & generator definitions

Even despite all of these new features, attempts will be made to reduce the amount of time to transfer from Blockly syntax as much as possible, to allow the formats to be mostly interchangable.

The project is written in TSX with SCSS. Blocks are simple DOM elements with styles, unlike Blockly which uses SVGs which are cumbersome and slow to construct.
