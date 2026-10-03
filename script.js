let currentChart;

const datasets = {
    sales: {
        title: "Monthly Sales",
        description: "Illustrative monthly sales performance from January to December.",
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        values: [12000, 15000, 13500, 18000, 21000, 19500, 23000, 25000, 22000, 28000, 31000, 35000],
        label: "Sales (₹)",
        type: "line",
        prefix: "₹"
    },
    marks: {
        title: "Student Marks",
        description: "Illustrative marks obtained by students in five subjects.",
        labels: ["Rahul", "Priya", "Aarav", "Sneha", "Kiran", "Ananya"],
        values: [82, 91, 76, 88, 69, 95],
        label: "Marks",
        type: "bar",
        prefix: ""
    },
    attendance: {
        title: "Monthly Attendance",
        description: "Illustrative student attendance percentage by month.",
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
        values: [91, 88, 94, 90, 86, 93, 95, 89, 92, 96],
        label: "Attendance (%)",
        type: "bar",
        prefix: ""
    }
};

function showChart(datasetName, clickedButton) {
    const data = datasets[datasetName];

    document.getElementById("chartTitle").textContent = data.title;
    document.getElementById("chartDescription").textContent = data.description;

    document.querySelectorAll(".buttons button").forEach(button => {
        button.classList.remove("active");
    });
    clickedButton.classList.add("active");

    if (currentChart) {
        currentChart.destroy();
    }

    const ctx = document.getElementById("myChart").getContext("2d");

    currentChart = new Chart(ctx, {
        type: data.type,
        data: {
            labels: data.labels,
            datasets: [{
                label: data.label,
                data: data.values,
                borderWidth: 3,
                borderRadius: data.type === "bar" ? 8 : 0,
                tension: 0.35,
                fill: data.type === "line",
                backgroundColor: data.type === "line"
                    ? "rgba(37, 99, 235, 0.15)"
                    : "rgba(124, 58, 237, 0.75)",
                borderColor: data.type === "line"
                    ? "#2563eb"
                    : "#7c3aed",
                pointBackgroundColor: "#2563eb",
                pointRadius: data.type === "line" ? 5 : 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: "top"
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return data.prefix + context.parsed.y.toLocaleString();
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: data.label
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: datasetName === "marks" ? "Students" : "Time Period"
                    }
                }
            }
        }
    });
}

window.onload = function() {
    showChart("sales", document.querySelector(".buttons button"));
};
