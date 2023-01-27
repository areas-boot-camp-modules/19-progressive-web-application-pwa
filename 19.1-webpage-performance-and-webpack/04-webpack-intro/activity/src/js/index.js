// TODO: Add a comment explaining role of the index.js file and import statements
// This file imports the code from the files.
import { boxClick } from './box';
import { headerClick } from './header';

document.getElementById('boxBtn').addEventListener('click', boxClick);
document.getElementById('headerBtn').addEventListener('click', headerClick);
