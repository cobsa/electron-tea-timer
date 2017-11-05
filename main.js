const { app, BrowserWindow} = require('electron')
const path = require('path')
const url = require('url')


// global or will be garbage collected

let win

function createWindow() {
    // Create window
    win = new BrowserWindow({width: 400, height: 320, frame: false})
    // Populate window
    win.loadURL(url.format({
        pathname: path.join(__dirname,'index.html'),
        protocol: 'file:',
        slashes: true
    }))
    // Open dev tools
    win.webContents.openDevTools()

    win.on('closed', () => {
        win = null
    })
}



// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed

app.on('all-windows-closed', () => {
    // Mac things
    if( process.platform != 'darwin') {
        app.quit()
    }
})

app.on('active', () => {
    // Mac things
    if(win === null) {
        createWindow()
    }
})
