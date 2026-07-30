// SE London & West Kent Kids Club — shared site behaviour

document.addEventListener("DOMContentLoaded", () => {
  initNavToggle();
  setFooterYear();
  initEnquiryForm();
});

/** Mobile nav hamburger toggle. */
function initNavToggle() {
  const toggle = document.querySelector(".nav-toggle");
  const header = document.querySelector(".site-header");
  if (!toggle || !header) return;

  toggle.addEventListener("click", () => {
    const isOpen = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  header.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => header.classList.remove("nav-open"));
  });
}

/** Keep the footer copyright year current without manual edits. */
function setFooterYear() {
  const yearEl = document.getElementById("current-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/**
 * Client-side validation + confirmation for the enquiry/booking form.
 * There is no backend wired up yet — on successful validation this simply
 * shows a confirmation message. Replace the "submit" logic with a real
 * fetch()/API call (or form service) when one is available.
 */
function initEnquiryForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;

  const successMessage = document.getElementById("form-success");

  const requiredFields = [
    { id: "parent-name", message: "Please enter your name." },
    { id: "email", message: "Please enter a valid email address." },
    { id: "phone", message: "Please enter a phone number." },
    { id: "child-name", message: "Please enter your child's name." },
    { id: "child-age", message: "Please enter your child's age." },
  ];

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    requiredFields.forEach(({ id }) => {
      const field = document.getElementById(id);
      if (!field) return;
      const group = field.closest(".form-group");
      const valid = field.checkValidity() && field.value.trim() !== "";
      group.classList.toggle("error", !valid);
      if (!valid) isValid = false;
    });

    const daysChecked = form.querySelectorAll('input[name="preferred-days"]:checked').length > 0;
    const daysGroup = document.getElementById("days-field-group");
    if (daysGroup) {
      daysGroup.classList.toggle("error", !daysChecked);
      if (!daysChecked) isValid = false;
    }

    if (!isValid) {
      const firstError = form.querySelector(".form-group.error");
      if (firstError) firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    // Placeholder "submit": no backend is connected yet.
    successMessage.classList.add("visible");
    successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    form.reset();
    form.querySelectorAll(".form-group.error").forEach((el) => el.classList.remove("error"));
  });

  // Clear an error state as soon as the visitor starts fixing a field.
  requiredFields.forEach(({ id }) => {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener("input", () => field.closest(".form-group").classList.remove("error"));
  });
}
