const registrationForm = document.getElementById("registrationForm");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");
const submitBtn = document.getElementById("submitBtn");
const selectedCountry = document.getElementById("selectedCountry");
const selectedCountryCode = document.getElementById("selectedCountryCode");
const countryDropdown = document.getElementById("countryDropdown");
const dropdownIcon = document.getElementById("dropdownIcon");

// Countries data
const countries = [
  { name: "Uzbekistan", code: "+998" },
  { name: "AQSH", code: "+1" },
  { name: "Janubiy Koreya", code: "+82" },
  { name: "Qirg’iziston", code: "+996" },
  { name: "Qozog’iston", code: "+7" },
  { name: "Tojikiston", code: "+992" },
  { name: "Turkmaniston", code: "+993" },
  { name: "Polsha", code: "+48" },
];

// Phone formats
const phoneFormats = {
  "+998": {
    placeholder: "88 888 88 88",
    format: (d) =>
      d.slice(0, 2) +
      (d.length > 2 ? " " + d.slice(2, 5) : "") +
      (d.length > 5 ? " " + d.slice(5, 7) : "") +
      (d.length > 7 ? " " + d.slice(7, 9) : ""),
    validate: (v) => /^\d{2} \d{3} \d{2} \d{2}$/.test(v),
  },
  "+1": {
    placeholder: "555 123 4567",
    format: (d) =>
      d.slice(0, 3) +
      (d.length > 3 ? " " + d.slice(3, 6) : "") +
      (d.length > 6 ? " " + d.slice(6, 10) : ""),
    validate: (v) => /^\d{3} \d{3} \d{4}$/.test(v),
  },
  "+82": {
    placeholder: "10 1234 5678",
    format: (d) =>
      d.slice(0, 2) +
      (d.length > 2 ? " " + d.slice(2, 6) : "") +
      (d.length > 6 ? " " + d.slice(6, 10) : ""),
    validate: (v) => /^\d{2} \d{4} \d{4}$/.test(v),
  },
  "+996": {
    placeholder: "555 123 456",
    format: (d) =>
      d.slice(0, 3) +
      (d.length > 3 ? " " + d.slice(3, 6) : "") +
      (d.length > 6 ? " " + d.slice(6, 9) : ""),
    validate: (v) => /^\d{3} \d{3} \d{3}$/.test(v),
  },
  "+7": {
    placeholder: "700 123 4567",
    format: (d) =>
      d.slice(0, 3) +
      (d.length > 3 ? " " + d.slice(3, 6) : "") +
      (d.length > 6 ? " " + d.slice(6, 10) : ""),
    validate: (v) => /^\d{3} \d{3} \d{4}$/.test(v),
  },
  "+992": {
    placeholder: "55 555 5555",
    format: (d) =>
      d.slice(0, 2) +
      (d.length > 2 ? " " + d.slice(2, 5) : "") +
      (d.length > 5 ? " " + d.slice(5, 9) : ""),
    validate: (v) => /^\d{2} \d{3} \d{4}$/.test(v),
  },
  "+993": {
    placeholder: "6 123 4567",
    format: (d) =>
      d.slice(0, 1) +
      (d.length > 1 ? " " + d.slice(1, 4) : "") +
      (d.length > 4 ? " " + d.slice(4, 8) : ""),
    validate: (v) => /^\d{1} \d{3} \d{4}$/.test(v),
  },
  "+48": {
    placeholder: "123 456 789",
    format: (d) =>
      d.slice(0, 3) +
      (d.length > 3 ? " " + d.slice(3, 6) : "") +
      (d.length > 6 ? " " + d.slice(6, 9) : ""),
    validate: (v) => /^\d{3} \d{3} \d{3}$/.test(v),
  },
};

// Current country
let currentCountryCode = "+998";
// Sync placeholder on load
phoneInput.placeholder = phoneFormats[currentCountryCode].placeholder;

// Populate country dropdown
function populateCountryDropdown() {
  countryDropdown.innerHTML = "";
  countries.forEach((country) => {
    const option = document.createElement("div");
    option.className = "country-option";
    if (country.code === currentCountryCode) option.classList.add("selected");

    option.innerHTML = `
      <span>${country.name}</span>
      <span class="country-code">${country.code}</span>
      ${
        country.code === currentCountryCode
          ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>'
          : ""
      }
    `;

    option.addEventListener("click", () => selectCountry(country));
    countryDropdown.appendChild(option);
  });
}

function formatPhoneNumber(value, countryCode) {
  const digits = value.replace(/\D/g, "");
  const format = phoneFormats[countryCode] || phoneFormats["+998"];
  return format.format(digits);
}

function validatePhoneNumber(value, countryCode) {
  const format = phoneFormats[countryCode] || phoneFormats["+998"];
  return format.validate(value);
}

function selectCountry(country) {
  currentCountryCode = country.code;
  selectedCountryCode.textContent = country.code;
  countryDropdown.style.display = "none";

  // Update placeholder
  phoneInput.placeholder = phoneFormats[country.code].placeholder;

  // Clear phone input
  phoneInput.value = "";
  phoneError.style.display = "none";
}

// Toggle dropdown
selectedCountry.addEventListener("click", () => {
  const isOpen = countryDropdown.style.display === "block";
  if (isOpen) {
    countryDropdown.style.display = "none";
    dropdownIcon.innerHTML = '<polyline points="6 9 12 15 18 9"></polyline>';
  } else {
    populateCountryDropdown();
    countryDropdown.style.display = "block";
    dropdownIcon.innerHTML = '<polyline points="18 15 12 9 6 15"></polyline>';
  }
});

// Phone formatting
phoneInput.addEventListener("input", (e) => {
  phoneInput.value = formatPhoneNumber(e.target.value, currentCountryCode);
  phoneError.style.display = "none";
});

// Name validation
nameInput.addEventListener("input", () => {
  nameError.style.display = "none";
});

// Submit
registrationForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!nameInput.value.trim()) {
    nameError.style.display = "block";
    phoneError.style.display = "none";
    return;
  }

  if (!validatePhoneNumber(phoneInput.value, currentCountryCode)) {
    phoneError.style.display = "block";
    return;
  }

  nameError.style.display = "none";
  phoneError.style.display = "none";

  submitBtn.textContent = "YUBORILMOQDA...";
  submitBtn.disabled = true;

  const now = new Date();
  const formData = {
    Ism: nameInput.value,
    "Telefon raqam": `${currentCountryCode} ${phoneInput.value}`,
    "Sana, Soat": `${now.toLocaleDateString(
      "uz-UZ"
    )} - ${now.toLocaleTimeString("uz-UZ")}`,
  };

  localStorage.setItem("formData", JSON.stringify(formData));
  window.location.href = "./payPage.html";
});
