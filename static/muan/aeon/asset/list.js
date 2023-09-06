function numberExpression(x, y) {
	let factor;
	switch (y) {
		case 0:
			factor = 1;  // 정수
			break;
		case 1:
			factor = 10; // 소수점 첫번째 자리
			break;
		case 2:
			factor = 100; // 소수점 둘째 자리
			break;
		default:
			factor = 1; // 기본은 정수
	}

	// 반올림 처리
	x = Math.round(x * factor) / factor;

	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function computeSums(data) {
	// Reduce를 사용하여 invs 배열의 각 요소를 합산
	const total = data.reduce((acc, curr) => {
		acc.pwr += parseFloat(curr.pwr);
		acc.day += parseFloat(curr.day);
		acc.yld += parseFloat(curr.yld);
		return acc;
	}, { pwr: 0, day: 0, yld: 0 });

	return total;
}

async function fetchData() {
	try {
		const response = await fetch('http://localhost:8000/api/aeon');
		const serverData = await response.json();

		const tableBody = document.querySelector('#data-table tbody');
		tableBody.innerHTML = ''; // 기존의 행 삭제

		// invs 배열을 순회하여 테이블에 데이터 삽입
		serverData.invs.forEach(inv => {
			const row = document.createElement("tr");
			row.innerHTML = `
					<td>no. ${inv.no}</td>
					<td>${inv.stt}</td>
					<td>${numberExpression(inv.pwr, 1)} kw</td>
					<td>${numberExpression(inv.day, 0)} kwh</td>
					<td>${numberExpression(inv.yld, 0)} kwh</td>
			  `;
			tableBody.appendChild(row);
		});
		const totals = computeSums(serverData.invs);

		// 합계 행 추가
		const totalRow = document.createElement("tr");
		totalRow.innerHTML = `
			<td colspan="2">합계</td>
			<td>${numberExpression(totals.pwr, 1)} kw</td>
			<td>${numberExpression(totals.day, 0)} kwh</td>
			<td>${numberExpression(totals.yld, 0)} kwh</td>
		`;
		tableBody.appendChild(totalRow);

	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

setInterval(fetchData, 60000); // 1분마다 데이터를 새로고침합니다.
fetchData(); // 페이지 로드 시 바로 데이터 로드