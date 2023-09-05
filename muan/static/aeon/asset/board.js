const fetchAndUpdate = async () => {
	try {
		const response = await fetch('http://localhost:8000/ob'); // Replace with your server URL
		const data = await response.json();

		const dataContainer = document.getElementById('inv_container');
		dataContainer.innerHTML = ''; // Clear previous data
		document.getElementById('grid_pwr').innerText = `${numberExpression(Math.floor(data.pwr))}  kw`
		document.getElementById('grid_day').innerText = `${numberExpression(Math.floor(data.day))}  kwh`
		document.getElementById('grid_yld').innerText = `${numberExpression(Math.floor(data.yld / 1000))}  Mwh`
		document.getElementById('grid_co2').innerText = `${numberExpression(Math.floor(parseInt(data.yld) / 1000 * 0.4428))}  ton`

		data.invs.forEach(inv => {
			const innerDiv = document.createElement('div');
			innerDiv.className = `inv_card ${inv.stt === 'on' ? 'on-status' : 'off-status'}`;

			innerDiv.innerHTML = `
			  <p>No: ${inv.no}</p>
			  <table>
				 <tbody>
					<tr>
					  <td class='right-align' style='font-size: 30px; font-weight: bold;'>${parseInt(inv.pwr).toFixed(1)}</td>
					  <td class='left-align' style='font-size: 15px;'>kw</td>
					</tr>
				 </tbody>
			  </table>
			`;

			dataContainer.appendChild(innerDiv);
		});
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
setInterval(fetchAndUpdate, 1000000);
