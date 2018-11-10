const { remote, ipcRenderer } = require('electron');
const main = remote.require('./main.js');
const currentWindow = remote.getCurrentWindow();

const marked = require('marked');

const markdownView = document.querySelector('#markdown');
const htmlView = document.querySelector('#html');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveMarkdownButton = document.querySelector('#save-markdown');
const revertButton = document.querySelector('#revert');
const saveHtmlButton = document.querySelector('#save-html');
const showFileButton = document.querySelector('#show-file');
const openInDefaultButton = document.querySelector('#open-in-default');

ipcRenderer.on('file-opened', (event, file, content) => {
  markdownView.value = content;
  renderMarkdownToHTML(content);
});

markdownView.addEventListener('keyup', (event) => {
  console.log('world');
  renderMarkdownToHTML(event.target.value);
  console.log('hello');
});

newFileButton.addEventListener('click', () => {
  main.createWindow();
});

openFileButton.addEventListener('click', () => {
  main.getFileFromUser(currentWindow);
});

const renderMarkdownToHTML = (markdown) => {
  htmlView.innerHTML = marked(markdown, { sanitize: true });
};
