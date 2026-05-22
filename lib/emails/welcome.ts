import type { Language } from "@/lib/i18n";

type WelcomeEmail = {
  subject: string;
  html: string;
  text: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const SITE_URL = "https://shinemusic.app";

function wrapHtml(args: { lang: Language; previewText: string; bodyHtml: string }): string {
  return `<!doctype html>
<html lang="${args.lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Shine</title>
  </head>
  <body style="margin:0;padding:0;background-color:#efeeea;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;color:#0a0a0a;">
    <div style="display:none;font-size:1px;color:#efeeea;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${args.previewText}</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#efeeea;padding:40px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background-color:#ffffff;border-radius:16px;padding:40px 32px;">
            <tr>
              <td style="font-size:16px;line-height:1.6;color:#0a0a0a;">
                ${args.bodyHtml}
              </td>
            </tr>
          </table>
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;padding:16px 32px 0;">
            <tr>
              <td align="center" style="font-size:12px;line-height:1.6;color:#6b6b6b;">
                <a href="${SITE_URL}" style="color:#6b6b6b;text-decoration:none;">shinemusic.app</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

const WELCOME_BY_LANG: Record<Language, (name: string) => WelcomeEmail> = {
  es: (name) => {
    const subject = "Bienvenido/a a Shine 💎!";
    const previewText = "Sos parte de algo que todavía no existe para el resto del mundo.";

    const bodyHtml = `
      <h1 style="margin:0 0 24px;font-size:24px;line-height:1.3;color:#0000FE;">Hola ${name}, bienvenido/a a Shine 💎</h1>
      <p style="margin:0 0 16px;">Escaneaste el QR. Eso significa que sos parte de algo que todavía no existe para el resto del mundo.</p>
      <p style="margin:0 0 16px;">Shine es una plataforma donde los músicos independientes venden su música directamente a sus fans. Sin intermediarios. Sin algoritmos. La plata llega directo al artista. Además de esto van a poder recibir propinas digitales en tiempo real entre otras cositas muy interesantes que están planeadas a lo largo del año.</p>
      <p style="margin:0 0 16px;">En Septiembre abre para todo el mundo, pero vos ya sos parte, sentite especial!</p>
      <p style="margin:0 0 16px;">En las próximas semanas te vamos a ir contando cómo va el proceso, qué estamos construyendo y cuándo vas a poder ser de los primeros en entrar al beta exclusivo.</p>
      <p style="margin:0 0 16px;">Mandaselo a tu amigo músico independiente que sabés que necesita esta herramienta!</p>
      <p style="margin:0 0 16px;">Estamos construyendo todos juntos un proyecto para la sostenibilidad musical que se merecen los artistas.</p>
      <p style="margin:0 0 24px;">Gracias por estar.</p>
      <p style="margin:0;">Los músicos y fundadores de Shine<br /><a href="${SITE_URL}" style="color:#0000FE;text-decoration:none;">shinemusic.app</a></p>
    `;

    const text = `Hola ${name}, bienvenido/a a Shine!

Escaneaste el QR. Eso significa que sos parte de algo que todavía no existe para el resto del mundo.

Shine es una plataforma donde los músicos independientes venden su música directamente a sus fans. Sin intermediarios. Sin algoritmos. La plata llega directo al artista. Además de esto van a poder recibir propinas digitales en tiempo real entre otras cositas muy interesantes que están planeadas a lo largo del año.

En Septiembre abre para todo el mundo, pero vos ya sos parte, sentite especial!

En las próximas semanas te vamos a ir contando cómo va el proceso, qué estamos construyendo y cuándo vas a poder ser de los primeros en entrar al beta exclusivo.

Mandaselo a tu amigo músico independiente que sabés que necesita esta herramienta!

Estamos construyendo todos juntos un proyecto para la sostenibilidad musical que se merecen los artistas.

Gracias por estar.


Los músicos y fundadores de Shine
shinemusic.app`;

    return {
      subject,
      html: wrapHtml({ lang: "es", previewText, bodyHtml }),
      text,
    };
  },

  en: (name) => {
    const subject = "Welcome to Shine 💎!";
    const previewText = "You're part of something that doesn't yet exist for the rest of the world.";

    const bodyHtml = `
      <h1 style="margin:0 0 24px;font-size:24px;line-height:1.3;color:#0000FE;">Hi ${name}, welcome to Shine 💎</h1>
      <p style="margin:0 0 16px;">You scanned the QR. That means you're part of something that doesn't yet exist for the rest of the world.</p>
      <p style="margin:0 0 16px;">Shine is a platform where independent musicians sell their music directly to their fans. No middlemen. No algorithms. The money goes straight to the artist. On top of that, they'll be able to receive digital tips in real time — along with other exciting things we have planned throughout the year.</p>
      <p style="margin:0 0 16px;">In September it opens for everyone, but you're already part of it — feel special!</p>
      <p style="margin:0 0 16px;">In the coming weeks we'll keep you posted on how the process is going, what we're building, and when you'll be among the first to step into the exclusive beta.</p>
      <p style="margin:0 0 16px;">Forward it to that independent musician friend you know needs this tool!</p>
      <p style="margin:0 0 16px;">Together we're building a project for the musical sustainability that artists deserve.</p>
      <p style="margin:0 0 24px;">Thanks for being here.</p>
      <p style="margin:0;">The musicians and founders of Shine<br /><a href="${SITE_URL}" style="color:#0000FE;text-decoration:none;">shinemusic.app</a></p>
    `;

    const text = `Hi ${name}, welcome to Shine!

You scanned the QR. That means you're part of something that doesn't yet exist for the rest of the world.

Shine is a platform where independent musicians sell their music directly to their fans. No middlemen. No algorithms. The money goes straight to the artist. On top of that, they'll be able to receive digital tips in real time — along with other exciting things we have planned throughout the year.

In September it opens for everyone, but you're already part of it — feel special!

In the coming weeks we'll keep you posted on how the process is going, what we're building, and when you'll be among the first to step into the exclusive beta.

Forward it to that independent musician friend you know needs this tool!

Together we're building a project for the musical sustainability that artists deserve.

Thanks for being here.


The musicians and founders of Shine
shinemusic.app`;

    return {
      subject,
      html: wrapHtml({ lang: "en", previewText, bodyHtml }),
      text,
    };
  },
};

export function buildWelcomeEmail(args: {
  name: string;
  lang: Language;
}): WelcomeEmail {
  const safeName = escapeHtml(args.name);
  return WELCOME_BY_LANG[args.lang](safeName);
}
