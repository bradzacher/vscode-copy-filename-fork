//Required modules
const vscode = require('vscode');
const copy = require('copy-paste').copy;

//Set error view
const showError = message => vscode.window.showErrorMessage(`Copy filename: ${message}`);
const showWarning = message => vscode.window.setStatusBarMessage(`${message}`, 3000);

exports.activate = context => {

    //Register command
    const copyFilename = vscode.commands.registerCommand('extension.copyFileName', (uri) => {
        
        //Check to see if workspace is open
        if (!vscode.workspace.rootPath) {
            return showError('You must have a workspace opened.');
        }

        //Do nothing if editor is undefined
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        //get the relative url, parse it and take the last part
        let url = vscode.workspace.asRelativePath(uri);
        let urlFormatted = url.replace(/\\/g, '/')
        let lastPart = urlFormatted.split('/').pop();

        //Copy the last part to clipboard
        copy(lastPart, () => showWarning(`Filename ${lastPart} has been copied to clipboard`));

    });

    context.subscriptions.push(copyFilename);
}

exports.deactivate = () => { };