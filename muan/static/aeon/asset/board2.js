const fetchAndUpdate = async () => {
	try {
		const response = await fetch('http://localhost:8000/api/aeon'); // Replace with your server URL
		const data = await response.json();

		document.getElementById('grid_pwr').innerText = numberExpression(Math.floor(data.pwr))
		document.getElementById('grid_day').innerText = numberExpression(Math.floor(data.day))
		document.getElementById('grid_yld').innerText = numberExpression(Math.floor(data.yld / 1000))
		document.getElementById('grid_co2').innerText = numberExpression(Math.floor(parseInt(data.yld) / 1000 * 0.4428))
	} catch (error) {
		console.error("Error fetching data:", error);
	}
};

function numberExpression(x) {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Initial fetch
fetchAndUpdate();

// Fetch data every 10 seconds
setInterval(fetchAndUpdate, 100000);
