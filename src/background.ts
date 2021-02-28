'use strict'

import * as electron from 'electron'
import {app, BrowserWindow} from 'electron'


const margin: number = 15;
const width: number = 300;
const height: number = 200;

async function createWindow() {

    const display = electron.screen.getPrimaryDisplay();

    const win = new BrowserWindow({
        width: width,
        height: height,
        alwaysOnTop: true,
        frame: false,
        transparent: true,
        resizable: false,
        x: display.workArea.width - width - margin,
        y: display.workArea.height - height - margin,
        webPreferences: {
            nodeIntegration: true
        }
    })

    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)

}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', async () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})