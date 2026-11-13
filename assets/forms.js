'use strict';
// Public form identifiers are not credentials. No SVG, page URL, rating or email is attached.
const FORM_CONFIG = Object.freeze({
  uninstall: Object.freeze({
    FORM_ID: '1FAIpQLSefU1BUN7Bmr7IfHXVyTcEuDIdhYn8-1L5gpPiLbQ6SZ0Pvag',
    reasonEntry: 'entry.1656559361', commentEntry: 'entry.2109594716',
  }),
  feedback: Object.freeze({
    FORM_ID: '1FAIpQLSeAk_Wta-kVQr8IVBwEQJKBOyPKA21GpwKy2zlibNxC-sBH4A',
    commentEntry: 'entry.1126265287',
  }),
});
for (const form of document.querySelectorAll('form[data-feedback-form]')) {
  const message = form.querySelector('[role="status"]');
  const button = form.querySelector('button[type="submit"]');
  const config = FORM_CONFIG[form.dataset.feedbackForm];
  if (!message || !button || !config || !config.FORM_ID || !config.commentEntry) continue;
  let busy = false, sent = false;
  const show = text => { message.textContent = text; message.hidden = false; };
  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (busy || sent) return;
    const comment = form.querySelector('textarea[name="comment"]')?.value.trim() || '';
    const reason = form.querySelector('input[name="reason"]:checked')?.value || '';
    if (!comment && !reason) {
      show(form.dataset.feedbackForm === 'feedback'
        ? 'Please tell us what should be better.'
        : 'Please select a reason or add a comment.');
      return;
    }
    const fields = new URLSearchParams();
    fields.set(config.commentEntry, comment);
    if (config.reasonEntry && reason) fields.set(config.reasonEntry, reason);
    busy = true; button.disabled = true; button.textContent = 'Sending…';
    message.hidden = true;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      // An opaque response cannot prove storage. Deployment tests verify new response IDs via the Forms API.
      await fetch(`https://docs.google.com/forms/d/e/${config.FORM_ID}/formResponse`, {
        method: 'POST', mode: 'no-cors', credentials: 'omit', referrerPolicy: 'no-referrer',
        body: fields, signal: controller.signal,
      });
      sent = true; button.textContent = 'Sent';
      show('Thanks. Your feedback was sent.');
      // Preserve the entered text and selected reason, and prevent duplicate clicks in this view.
    } catch (_) {
      button.textContent = 'Send feedback';
      show('Could not confirm delivery. Your text is still here. Please try again.');
    } finally {
      clearTimeout(timer); busy = false;
      if (!sent) button.disabled = false;
    }
  });
  // Without this script, the HTML submit button stays disabled and cannot send a default GET.
  button.disabled = false;
}
