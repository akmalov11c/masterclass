const SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwrQO8JfI8kzWqcKKdN8VAEV081pLmnXnosIOerUfqgGaHO-s-v0bjVoFOkimwm8WN4/exec";

function getFormattedDate() {
  const now = new Date();
  return `${String(now.getDate()).padStart(2, "0")}-${String(
    now.getMonth() + 1
  ).padStart(2, "0")}-${now.getFullYear()}`;
}

function getFormattedTime() {
  return new Date().toLocaleTimeString("uz-UZ");
}

function shouldSendToday(key) {
  const today = getFormattedDate();
  const lastDate = localStorage.getItem(key);
  if (lastDate === today) return false;
  localStorage.setItem(key, today);
  return true;
}

async function sendFormData() {
  const formDataRaw = localStorage.getItem("formData");
  if (!formDataRaw) {
    console.log("LocalStorage bo‘sh");
    return;
  }

  if (!shouldSendToday("DataSendDate")) {
    console.log("Yuborilgan");
    return;
  }

  const formDataObj = JSON.parse(formDataRaw);

  const formData = new FormData();
  formData.append("Ism", formDataObj["Ism"] || "");
  formData.append("Telefon raqam", formDataObj["Telefon raqam"] || "");
  formData.append("Sana, Soat", formDataObj["Sana, Soat"] || "");

  try {
    const response = await fetch(SHEET_URL, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      console.log("Ma'lumot yuborildi");
      localStorage.removeItem("formData");
    } else {
      console.error("Xato:", await response.text());
    }
  } catch (error) {
    console.error("Xatolik:", error);
    const errBox = document.getElementById("errorMessage");
    if (errBox) errBox.style.display = "block";
  }
}

window.addEventListener("load", sendFormData);
