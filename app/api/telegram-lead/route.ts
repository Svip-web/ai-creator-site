type LeadPayload = Record<string, unknown>;

function readable(value: unknown, fallback = '—') {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, 500) : fallback;
}

export async function POST(request: Request) {
  const botToken = process.env.TELEGRAM_BOT_TOKEN?.trim();
  const chatIds = process.env.TELEGRAM_CHAT_IDS
    ?.split(',')
    .map((id) => id.trim())
    .filter(Boolean) ?? [];

  if (!botToken || chatIds.length === 0) {
    return Response.json({ ok: false, error: 'Telegram is not configured' }, { status: 503 });
  }

  let lead: LeadPayload;
  try {
    lead = await request.json() as LeadPayload;
  } catch {
    return Response.json({ ok: false, error: 'Invalid request body' }, { status: 400 });
  }

  const message = [
    'Новая заявка AI CREATOR',
    '',
    `Тип: ${readable(lead.source, readable(lead.type_lead))}`,
    `Email: ${readable(lead.email)}`,
    `Телефон: ${readable(lead.phone)}`,
    `Страница: ${readable(lead.system_url)}`,
  ].join('\n');

  const results = await Promise.all(chatIds.map(async (chatId) => {
    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text: message }),
    });
    return response.ok;
  }));

  if (results.some((ok) => !ok)) {
    return Response.json({ ok: false, error: 'Telegram delivery failed' }, { status: 502 });
  }

  return Response.json({ ok: true });
}
