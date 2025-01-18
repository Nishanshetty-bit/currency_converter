const countryList = {
    AED: "AE",
    AFN: "AF",
    XCD: "AG",
    ALL: "AL",
    AMD: "AM",
    ANG: "AN",
    AOA: "AO",
    ARS: "AR",
    AUD: "AU",
    AZN: "AZ",
    BAM: "BA",
    BBD: "BB",
    BDT: "BD",
    BGN: "BG",
    BHD: "BH",
    BIF: "BI",
    BMD: "BM",
    BND: "BN",
    BOB: "BO",
    BRL: "BR",
    BSD: "BS",
    CAD: "CA",
    CHF: "CH",
    CNY: "CN",
    COP: "CO",
    CRC: "CR",
    CUP: "CU",
    CZK: "CZ",
    DKK: "DK",
    DOP: "DO",
    DZD: "DZ",
    EGP: "EG",
    ETB: "ET",
    EUR: "FR",
    FJD: "FJ",
    GBP: "GB",
    GHS: "GH",
    GIP: "GI",
    GTQ: "GT",
    HKD: "HK",
    HNL: "HN",
    HRK: "HR",
    HUF: "HU",
    IDR: "ID",
    ILS: "IL",
    INR: "IN",
    JPY: "JP",
    KES: "KE",
    KRW: "KR",
    KWD: "KW",
    LKR: "LK",
    MAD: "MA",
    MUR: "MU",
    MXN: "MX",
    MYR: "MY",
    NGN: "NG",
    NOK: "NO",
    NPR: "NP",
    NZD: "NZ",
    OMR: "OM",
    PHP: "PH",
    PKR: "PK",
    PLN: "PL",
    QAR: "QA",
    RON: "RO",
    RUB: "RU",
    SAR: "SA",
    SEK: "SE",
    SGD: "SG",
    THB: "TH",
    TRY: "TR",
    TWD: "TW",
    TZS: "TZ",
    USD: "US",
    UYU: "UY",
    VND: "VN",
    ZAR: "ZA",
  };
  
  const BASE_URL = "https://v6.exchangerate-api.com/v6/f33943d08a73b3537b4e44e3/latest";
  const dropdowns = document.querySelectorAll(".dropdown select");
  const btn = document.querySelector("button");
  const fromCurr = document.querySelector(".from select");
  const toCurr = document.querySelector(".to select");
  const msg = document.querySelector(".msg");
  
  // Populate dropdowns with currency options
  for (let select of dropdowns) {
    for (let currCode in countryList) {
      let option = document.createElement("option");
      option.value = currCode;
      option.text = currCode;
  
      // Set default values
      if (select.name === "from" && currCode === "USD") option.selected = true;
      if (select.name === "to" && currCode === "INR") option.selected = true;
  
      select.add(option);
    }
  
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  }
  
  // Update flag based on selected currency
  const updateFlag = (element) => {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let img = element.parentElement.querySelector("img");
  
    if (img) {
      img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    }
  };
  
  // Fetch and update exchange rate
  const updateExchangeRate = async () => {
    const amountInput = document.querySelector(".amount input");
    let amountValue = amountInput.value || 1;
  
    if (amountValue < 1) {
      amountValue = 1;
      amountInput.value = "1";
    }
  
    const fromCurrency = fromCurr.value;
    const toCurrency = toCurr.value;
    const url = `${BASE_URL}/${fromCurrency}`;
  
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch exchange rates.");
  
      const data = await response.json();
      const rate = data.conversion_rates[toCurrency];
  
      if (!rate) {
        msg.innerText = `Exchange rate unavailable for ${fromCurrency} to ${toCurrency}`;
        return;
      }
  
      const finalAmount = (amountValue * rate).toFixed(2);
      msg.innerText = `${amountValue} ${fromCurrency} = ${finalAmount} ${toCurrency}`;
    } catch (error) {
      msg.innerText = "Error fetching exchange rate. Please try again.";
      console.error(error);
    }
  };
  
  // Add event listeners
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    updateExchangeRate();
  });
  
  window.addEventListener("load", () => {
    updateExchangeRate();
  });