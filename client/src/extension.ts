import * as path from 'path';
import { workspace, ExtensionContext } from 'vscode';

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
	// Path of the server
	const serverPath = context.asAbsolutePath(path.join('server', 'fds-language-server'));
	// Path of the class definition
	const fdsClassesPath = context.asAbsolutePath(path.join("fds", "fds_classes.csv"));
	const fdsClassesPathArg = `RUST_FDS_CLASSES_PATH=${fdsClassesPath}`;

	// Debug arguments
	const debugArg = "RUST_LOG=lsp_server=debug";

	// Server options
	const serverOptions: ServerOptions = {
		run: { command: serverPath, args: [fdsClassesPathArg] },
		debug: { command: serverPath, args: [fdsClassesPathArg, debugArg] }
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
