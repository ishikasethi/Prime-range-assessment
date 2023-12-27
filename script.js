function create_datatables(data_list = [], prime_data_list = []){
    tabledata1 = $('#table1').DataTable({
        "bProcessing": true,
        "searching": false,
        "bDestroy": true,
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        paging: true,
        columns: [
            { title: 'Number' },
            { title: 'Result' },
            { title: 'Time in MS' }
        ],
        data: data_list,
    });
    tabledata2 = $('#table2').DataTable({
        "bProcessing": true,
        "searching": false,
        "bDestroy": true,
        "lengthMenu": [[10, 25, 50, 100, -1], [10, 25, 50, 100, "All"]],
        paging: true,
        columns: [
            { title: 'Number' },
            { title: 'Time in MS' }
        ],
        data: prime_data_list,
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const detailsButton = document.getElementById("details");
    const detailsModal = document.getElementById("details-modal");
    const closeDetailsButton = document.getElementById("close-details");

    function isPrime(num) {
        if (num <= 1) return false;
        if (num <= 3) return true;
        if (num % 2 === 0 || num % 3 === 0) return false;
        
        for (let i = 5; i * i <= num; i += 6) {
          if (num % i === 0 || num % (i + 2) === 0) return false;
        }
        
        return true;
    }
      
    function getPrimesInRange(rangeStart, rangeEnd) {
        let totalPrimeTime = 0;
        let totalCheckTime = 0;
        data_list = []
        prime_list = []
        StartTime = performance.now();

        for (let num = rangeStart; num <= rangeEnd; num++) {
            data_temp = []
            prime_temp = []
            const checkStart = performance.now();
            const n = isPrime(num);
            const checkEnd = performance.now();
            const checkTime = checkEnd - checkStart;

            data_temp.push(num)
            if (n) {
                totalPrimeTime += checkTime;
                data_temp.push("Prime")
                prime_temp.push(num)
                prime_temp.push(checkTime)
                prime_list.push(prime_temp)
            }else{
                data_temp.push("Not Prime")
            }
            data_temp.push(checkTime)
            totalCheckTime += checkTime;
            data_list.push(data_temp)
        }
        EndTime = performance.now();
        
        
        TotalTime = EndTime - StartTime;
        $('#total_time').html(`<li>Total Time to find all primes within the given range ${rangeStart} to ${rangeEnd}: ${TotalTime.toFixed(4)} ms</li>`);
        avgPrimeTime = totalPrimeTime / (rangeEnd - rangeStart + 1);
        avgCheckTime = totalCheckTime / (rangeEnd - rangeStart + 1);

        avg_time = `<li>Time taken to determine if a single number is prime: ${avgCheckTime.toFixed(2)} ms</li>`;
        avg_time = avg_time + `<li>Time taken to determine if a number is prime or not in front of each number found prime: ${avgPrimeTime.toFixed(2)} ms</li>`;
        $('#avg_time').html(avg_time);

        create_datatables(data_list, prime_list)
    }
    calculate.addEventListener("click", function () {
        
        start = parseInt(document.getElementById("start").value);
        end = parseInt(document.getElementById("end").value);
        console.log(start, end)
        if(isNaN(start) || isNaN(end)){
            alert("Enter both values to find out all primes!")
        }else{
            getPrimesInRange(start,end);
            detailsButton.style.display = "inline";
        }

    });
    detailsButton.addEventListener("click", function () {
        detailsModal.style.display = "block";
    });

    closeDetailsButton.addEventListener("click", function () {
        detailsModal.style.display = "none";
    });
});
