//-----------------------------------------------------------------------
// StopWatch App - Parker Gibson
// February 06, 2015 - BUS 353 - University of Idaho
//-----------------------------------------------------------------------
//------------------------------------------------
// Declare Global Variables
//------------------------------------------------
var isRunning = false;

//------------------------------------------------
// Define Functions
//------------------------------------------------
var Stopwatch = require('stopwatch');
var stopWatch = new Stopwatch(stopwatchListener, 10);

function stopwatchListener(watch) {
	lblDisplay.text = watch.toString();
}

//------------------------------------------------
// Declare Global Objects
//------------------------------------------------
//------------------------------------
// Window
//------------------------------------
var main = Ti.UI.createWindow({
	backgroundColor: '#ffffff',
	layout: 'vertical'
});

//------------------------------------
// Views (Containers)
//------------------------------------
var viewTime = Ti.UI.createView({
	top:0,
	width: '100%',
	height: '30%',
	backgroundColor: '#1C1C1C'
});

var viewButtons = Ti.UI.createView({
	width: '100%',
	height: '10%',
	layout: 'horizontal'
});

var viewTable = Ti.UI.createTableView({
	width: '100%',
	height:Ti.UI.FILL,
	backgroundColor: '#C0BFBF'
});

//------------------------------------
// Labels
//------------------------------------
var lblDisplay = Ti.UI.createLabel({
	color: '#404040',
	text: '--',
	height: Ti.UI.SIZE,
	textAlign: 'center',
	verticalAlign: Ti.UI.TEXT_VERTICAL_ALIGNMENT_CENTER,
	font:{
		fontSize: '55sp',
		fontWeight: 'bold'
	}
});

//------------------------------------
// Buttons
//------------------------------------
var btnStop = Ti.UI.createButton({
	title: 'Stop',
	color: '#C0BFBF',
	width: '50%',
	height: Ti.UI.FILL,
	backgroundColor: '#404040',
	font: {
		fontSize: '25sp',
		fontWeight: 'bold'
	},
	style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

var btnStart = Ti.UI.createButton({
	title: 'Start',
	color: '#C0BFBF',
	width: '50%',
	height: Ti.UI.FILL,
	backgroundColor: '#727F7F',
	font: {
		fontSize: '25sp',
		fontWeight: 'bold'
	},
	style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
});

btnStop.addEventListener('click', function(e) {
	if (isRunning) {
		btnStart.title = 'Start';
		btnStop.title = 'Reset';
		stopWatch.stop();
		isRunning = false;
	} else {
		viewTable.setData([]);
		stopWatch.reset();
		lblDisplay.text = '--';
	}
});

btnStart.addEventListener('click', function(e) {
	if (isRunning) {
		var row = Ti.UI.createTableViewRow({
			title: stopWatch.toString(),
			color: '#404040',
			className: 'lap',
			font:{
				fontSize: '24sp',
				fontWeight: 'bold'
			}
		});

		viewTable.appendRow(row);
	} else {
		isRunning = true;
		btnStart.title = 'Lap';
		btnStop.title = 'Stop';
		stopWatch.start();
	}
});

//------------------------------------------------
// Add Objects
//------------------------------------------------
//------------------------------------
// Add Views to Main
//------------------------------------
main.add(viewTime);
main.add(viewButtons);
main.add(viewTable);

//------------------------------------
// Add to Views
//------------------------------------
viewTime.add(lblDisplay);
viewButtons.add(btnStop);
viewButtons.add(btnStart);

//------------------------------------
// Run Main
//------------------------------------
main.open();
