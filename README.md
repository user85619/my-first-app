# SE London & West Kent Kids Club — Website

A clean, static 4-page marketing site: no build step required.

## Structure

```
index.html      Home page
about.html      About / approach / safety & qualifications
fees.html       Pricing options + mealtimes
contact.html    Contact details + enquiry/booking form
css/styles.css  All styles (CSS variables at the top control the palette/spacing)
js/main.js      Mobile nav toggle, footer year, enquiry form validation + submission
assets/         Favicon and any future image assets
```

## Updating content

- Text, hours, fees and contact details are all in the HTML files directly — no templating, just edit the relevant page.
- The header and footer markup is duplicated across all four pages; update all of them when changing nav links, email address, coverage area, etc.
- Colours, spacing and typography are controlled by the CSS custom properties at the top of `css/styles.css` (`:root { ... }`).

## Enquiry form (Formspree setup)

The form on `contact.html` (`#enquiry-form`) is validated client-side and submitted via [Formspree](https://formspree.io) (free tier), so enquiries land by email — no server of your own required.

To finish setup:

1. Go to [formspree.io](https://formspree.io) and create a free account using **thekidsclubhub@gmail.com**.
2. Create a new form. Formspree will give you a form ID and an endpoint that looks like `https://formspree.io/f/abcd1234`.
3. In `contact.html`, find the `<form id="enquiry-form" action="https://formspree.io/f/YOUR_FORM_ID" ...>` tag and replace `YOUR_FORM_ID` with your real form ID.
4. Submit a test enquiry from the live site. Formspree sends a one-time confirmation email to thekidsclubhub@gmail.com the first time — you must click the confirmation link before submissions start arriving.
5. That's it — every future submission emails the full enquiry (parent name, email, phone, child's name, child's age, preferred days, and any message) straight to thekidsclubhub@gmail.com.

Notes:
- The free Formspree plan includes 50 submissions/month, which is plenty for a small enquiry form. Upgrade if you expect more.
- The form includes a hidden honeypot field (`_gotcha`) that Formspree uses to silently filter spam bots — no setup needed.
- If the request fails (e.g. wrong form ID, or Formspree is unreachable), the page shows an inline error message pointing parents to email thekidsclubhub@gmail.com directly, so an enquiry is never silently lost.
