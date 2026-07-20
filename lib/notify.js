/**
 * Optional email notifications via Resend. No-ops (returns false) when
 * RESEND_API_KEY / LEAD_NOTIFY_EMAIL are not configured, so the feature is
 * fully optional and never blocks a form submission.
 */
export async function notifyNewSubmission({ subject, lines }) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.LEAD_NOTIFY_EMAIL;
  if (!key || !to) return false;

  const html = `<div style="font-family:system-ui,sans-serif">
    <h2 style="margin:0 0 12px">${escapeHtml(subject)}</h2>
    ${lines.map((l) => `<p style="margin:4px 0"><strong>${escapeHtml(l.label)}:</strong> ${escapeHtml(l.value)}</p>`).join('')}
  </div>`;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'LYRASET <onboarding@resend.dev>',
        to: [to],
        subject,
        html,
      }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

function escapeHtml(s) {
  return String(s || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
