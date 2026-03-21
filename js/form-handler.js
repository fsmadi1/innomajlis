const form = document.getElementById("contact-form");

form.addEventListener("submit", async function (e) {
  e.preventDefault(); // stop normal form submit

  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      alert("✅ Form submitted successfully!");
      form.reset(); // clear the form
    } else {
      alert("❌ Submission failed. Please try again.");
    }
  } catch (error) {
    alert("⚠️ Network error. Please try again later.");
  }
});

//

const phone = document.getElementById("phone");

phone.addEventListener("input", function () {
  let value = this.value;

  // Remove all non-digit characters except +
  value = value.replace(/[^\d+]/g, "");

  // Ensure only ONE + and only at the start
  if (value.includes("+")) {
    value = "+" + value.replace(/\+/g, "").replace(/^\+/, "");
  }

  this.value = value;
});
