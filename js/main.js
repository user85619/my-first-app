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
 * Client-side validation + submission for the enquiry/booking form.
 * Submits to the Formspree endpoint set in the form's `action` attribute
 * (see contact.html and README.md for setup) so enquiries arrive by email.
 */
function initEnquiryForm() {
  const form = document.getElementById("enquiry-form");
  if (!form) return;

  const successMessage = document.getElementById("form-success");
  const errorMessage = document.getElementById("form-error");
  const submitButton = form.querySelector('button[type="submit"]');

  const requiredFields = [
    { id: "parent-name", message: "Please enter your name." },
    { id: "email", message: "Please enter a valid email address." },
    { id: "phone", message: "Please enter a phone number." },
    { id: "child-age", message: "Please enter your child's age." },
  ];

  form.addEventListener("submit", async (event) => {
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

    errorMessage.classList.remove("visible");
    submitButton.disabled = true;
    submitButton.textContent = "Sending…";

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error("Submission failed");

      successMessage.classList.add("visible");
      successMessage.scrollIntoView({ behavior: "smooth", block: "center" });
      form.reset();
      form.querySelectorAll(".form-group.error").forEach((el) => el.classList.remove("error"));
    } catch (err) {
      errorMessage.classList.add("visible");
      errorMessage.scrollIntoView({ behavior: "smooth", block: "center" });
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = "Send Enquiry";
    }
  });

  // Clear an error state as soon as the visitor starts fixing a field.
  requiredFields.forEach(({ id }) => {
    const field = document.getElementById(id);
    if (!field) return;
    field.addEventListener("input", () => field.closest(".form-group").classList.remove("error"));
  });
}
