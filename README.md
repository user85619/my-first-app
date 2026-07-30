# SE London & West Kent Kids Club — Website

A clean, static 3-page marketing site: no build step required.

## Structure

```
index.html      Home page
about.html      About / approach / safety & qualifications
contact.html    Contact details + enquiry/booking form
css/styles.css  All styles (CSS variables at the top control the palette/spacing)
js/main.js      Mobile nav toggle, footer year, enquiry form validation
assets/         Favicon and any future image assets
```

## Updating content

- Text, hours, contact details and team info are all in the HTML files directly — no templating, just edit the relevant page.
- The header and footer markup is duplicated across the three pages; update all three when changing nav links, phone number, email, etc.
- Colours, spacing and typography are controlled by the CSS custom properties at the top of `css/styles.css` (`:root { ... }`).

## Enquiry form

The form on `contact.html` (`#enquiry-form`) is validated client-side in `js/main.js`. It currently has **no backend wired up** — on success it just shows a confirmation message. To make it actually send enquiries, connect the `submit` handler in `initEnquiryForm()` to a real endpoint (e.g. a form service like Formspree, or your own API) and send the collected fields: parent name, email, phone, child's name, child's age, and preferred days.
