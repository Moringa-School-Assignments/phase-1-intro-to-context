// Your code here
function createEmployeeRecord(array) {
	let obj = {
		firstName: array[0],
		familyName: array[1],
		title: array[2],
		payPerHour: array[3],
		timeInEvents: [],
		timeOutEvents: [],
	};

    return obj
}


function createEmployeeRecords(arr) {
	return arr.map((employee) => createEmployeeRecord(employee));
}
// create time in event
function createTimeInEvent(employee, dateStamp) {
	let [date, hour] = dateStamp.split(" ");
	employee.timeInEvents.push({
		type: "TimeIn",
		hour: Number(hour, 10),
		date,
	});
	return employee;
}

// time out
function createTimeOutEvent(employee, dateStamp) {
	let [date, hour] = dateStamp.split(" ");
	employee.timeOutEvents.push({
		type: "TimeOut",
		hour: Number(hour, 10),
		date,
	});
	return employee;
};

function hoursWorkedOnDate(employee, date) {
	const timeOut = employee.timeOutEvents.find((event) => event.date == date);
	const timeIn = employee.timeInEvents.find((event) => event.date == date);
	const time = (timeOut.hour - timeIn.hour) / 100;
    return time;
};

function wagesEarnedOnDate(employee, date) {
	return hoursWorkedOnDate(employee, date) * employee.payPerHour;
};


function allWagesFor(employee) {
	let dates = employee.timeInEvents.map((e) => e.date);
	return dates.reduce(
		(total, date) => total + wagesEarnedOnDate(employee, date),0
	);
}

function findEmployeeByFirstName(arraySource, firstName) {
	return arraySource.find((employee) => firstName === employee.firstName);
}

// reduce payroll = total amount
function calculatePayroll(array) {
	return array.reduce((totalAmt, employee) => totalAmt + allWagesFor(employee), 0);
}