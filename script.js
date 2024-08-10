const baseURL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll (".dropdown select");
const flags = document.querySelectorAll (".dropdown img");
let btn = document.querySelector ("form button");
let fromCurr = document.querySelector (".from select");
let toCurr = document.querySelector (".to select");
let msg = document.querySelector (".msg");

for (let select of dropdowns){
    for (let currCode in countryList){
        let newOption= document.createElement("option");
        newOption.innerText= currCode;
        newOption.value= currCode;
        if (select.name==="from" && currCode==="USD"){
            newOption.selected= "selected";
        } else if (select.name==="to" && currCode==="INR"){
            newOption.selected= "selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    })
}

const updateFlag =(elements)=>{
    let currCode= elements.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let flagImage=elements.parentElement.querySelector("img");
    flagImage.src=newSrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate = async()=>{
    let amount = document.querySelector (".amount input");
    let amountVal = amount.value;
    if(amountVal==="" || amountVal<1){
        amount.value="1";
        amountVal=1;
    }
    console.log(fromCurr.value, toCurr.value);
    const URL = `${baseURL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch (URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    console.log(rate);
    msg.innerHTML = `<B>${amountVal} ${fromCurr.value} = ${rate*amountVal} ${toCurr.value}</B>`;
};

window.addEventListener("load", ()=>{
    updateExchangeRate();
});