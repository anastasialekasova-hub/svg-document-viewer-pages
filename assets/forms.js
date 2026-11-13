'use strict';
// Feedback remains non-submitting until Google Forms is configured.
// This handler does not track or persist typed text.
const FORM_CONFIG = Object.freeze({
  uninstall: Object.freeze({FORM_ID: null, reasonEntry: null, commentEntry: null}),
  feedback: Object.freeze({FORM_ID: null, commentEntry: null}),
});
for (const form of document.querySelectorAll('form[data-feedback-form]')) {
  const message = form.querySelector('[role="status"]');
  const button = form.querySelector('button[type="submit"]');
  if (!message || !button || !FORM_CONFIG[form.dataset.feedbackForm]) continue;
  form.addEventListener('submit', event => {
    event.preventDefault();
    message.hidden = false;
    message.textContent = 'This form is not connected. Nothing was sent. Your text is still here.';
    // Deliberately leave all text and the selected reason untouched.
  });
  // Fail closed if this script is missing: the HTML submit button stays disabled.
  button.disabled = false;
}
