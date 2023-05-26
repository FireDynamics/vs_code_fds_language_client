import { existsSync } from 'fs';
import * as path from 'path';
import { workspace, ExtensionContext, window, ExtensionMode } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	var os = "";
	if (process.platform == "win32") {
		os = 'windows.exe'
	} else if (process.platform == "darwin") {
		os = 'mac'
	} else {
		os = 'linux'
	}


	// Path of the server
	const release_serverPath = context.asAbsolutePath(path.join('server', 'release', 'fds-language-server-' + os));
	const debug_serverPath = context.asAbsolutePath(path.join('server', 'debug', 'fds-language-server-' + os));


	if (context.extensionMode == ExtensionMode.Production) {
		if (!existsSync(release_serverPath)) {
			console.error(`Can not fined server '${release_serverPath}'`)
		}
	} else {
		if (!existsSync(debug_serverPath)) {
			console.error(`Can not fined server '${debug_serverPath}'`)
		}
	}
	context.extensionMode

	// Path of the class definition
	const fdsDataPath = context.asAbsolutePath(path.join("fds", "data"))
	const fdsDataPathArg = `RUST_FDS_DATA_PATH=${fdsDataPath}`;

	// Debug arguments
	const debugArg = "RUST_LOG=lsp_server=debug";

	// Server options
	const serverOptions: ServerOptions = {
		run: { command: release_serverPath, args: [fdsDataPathArg] },
		debug: { command: debug_serverPath, args: [fdsDataPathArg, debugArg] }
	};

	// Client options
	const clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'fds' }],
		synchronize: {
			fileEvents: workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the client
	client = new LanguageClient(
		'FDSLanguageServer',
		'FDS Language Server',
		serverOptions,
		clientOptions
	);

	// Start the client and the server.
	client.start();
}

// Stop the server
export function deactivate(): Thenable<void> | undefined {
	if (!client) {
		return undefined;
	}
	return client.stop();
}
