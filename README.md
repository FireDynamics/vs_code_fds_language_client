# VS Code FDS Language Client

## About
This extension adds [FDS Language Server](https://github.com/FireDynamics/fds_language_server) support for vs code.

## How To Install
Download the latest version and place the the single folder in the zip achieve into the following folder:

- **Windows:** `%USERPROFILE%\.vscode\extensions`  
- **Linux:** `~/.vscode/extensions`
- **Mac:** `~/.vscode/extensions`

If you have compiled the server your self, you have to move the compiled file to `server/release/` (or if you want to develop to `server/debug/`)

Rename the file according to your operating system:
- **Windows:** `fds-language-server-windows`  
- **Linux:** `fds-language-server-linux`
- **Mac:** `fds-language-server-mac`

**Known issue**:  
Sometimes VS code creates a file named `.obsolete` inside the extension directory where this extension might be disabled. Make sure this is not the case or delete this file.


## Current features
Current features are listed on the server page.

## Development
For development make sure you added the server inside the `server/debug` folder. The server is only shipped with release. Build the server manually.

 