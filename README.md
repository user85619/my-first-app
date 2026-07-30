# SE London & West Kent Kids Club — Website

A clean, static 5-page marketing site: no build step required.

## Structure

```
index.html      Home page
about.html      About / approach / safety & qualifications
fees.html       Pricing options + mealtimes
contact.html    Contact details + enquiry/booking form
privacy.html    Privacy policy
css/styles.css  All styles (CSS variables at the top control the palette/spacing)
js/main.js      Mobile nav toggle, footer year, enquiry form validation + submission
assets/         Favicon and any future image assets
```

## Updating content

- Text, hours, fees and contact details are all in the HTML files directly — no templating, just edit the relevant page.
- The header and footer markup is duplicated across all five pages; update all of them when changing nav links, email address, coverage area, etc.
- Colours, spacing and typography are controlled by the CSS custom properties at the top of `css/styles.css` (`:root { ... }`).

## Enquiry form (Formspree)

The form on `contact.html` (`#enquiry-form`) is validated client-side and submits via [Formspree](https://formspree.io) (free tier) to `https://formspree.io/f/mykrvqba`, so every enquiry (parent name, email, phone, child's age, preferred days, and any message) is emailed straight to thekidsclubhub@gmail.com — no server of your own required.

If you ever need to point the form at a different Formspree form (e.g. a new account or endpoint), update the single `action="..."` attribute on the `<form id="enquiry-form">` tag in `contact.html` — the JS in `js/main.js` reads the endpoint from there, so nothing else needs to change.

Notes:
- The free Formspree plan includes 50 submissions/month, which is plenty for a small enquiry form. Upgrade if you expect more.
- The form includes a hidden honeypot field (`_gotcha`) that Formspree uses to silently filter spam bots — no setup needed.
- If the request fails (e.g. Formspree is unreachable), the page shows an inline error message pointing parents to email thekidsclubhub@gmail.com directly, so an enquiry is never silently lost.

## Privacy policy

`privacy.html` explains what data the enquiry form collects and how it's used. It's linked from every page's footer. Update it if the data you collect or how you use it ever changes.
