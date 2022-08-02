const api_key = "1dfbf427ddec9712b8ea50fd";
const url = "https://v6.exchangerate-api.com/v6/" + api_key;

const currency_one = document.getElementById("currency_one");
const currency_two = document.getElementById("currency_two");
const list_one = document.getElementById("list_one");
const list_two = document.getElementById("list_two");
const amountItem = document.getElementById("amount");
const calculate = document.getElementById("calculate");
const result = document.getElementById("result");

fetch(url + "/codes")
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        const items = data.supported_codes;
        
        let options;
        for(let item of items){
            options += `<option value=${item[0]}>${item[1]}</option>`;
        }
        list_one.innerHTML = options;
        list_two.innerHTML = options;
    });

    calculate.addEventListener("click", () => {
        const currency1 = currency_one.value;
        const currency2 = currency_two.value;
        const amount = amountItem.value;
        let total;

        // console.log(currency1, currency2, amount)

        fetch(url + "/latest/" + currency1)
            .then(response => response.json())
            .then(data => {
                // console.log(data.conversion_rates[currency2]);
                const calculated = (data.conversion_rates[currency2] * amount).toFixed(3);               
                result.innerHTML = `
                    <div class="card border-primary">
                        <div class="card-body text-center" style="font-size: 30px;">
                            ${amount} ${currency1} = ${calculated} ${currency2}
                        </div>
                    </div>
                `;

            });
    });