import { NextRequest, NextResponse } from 'next/server';
import { createSecureHeaders } from 'next-secure-headers';

const cspTrustedHosts = process.env.CSP_TRUSTED_HOSTS;
const cspReportOnly = process.env.CSP_REPORT_ONLY;
// TODO: add report Uri
// const cspReportUri = process.env.CSP_REPORT_URI;

const trustedHosts = cspTrustedHosts ? cspTrustedHosts.split(',') : [];

const reportOnly = cspReportOnly == 'true';

export const contentSecurityPolicy = {
  directives: {
    styleSrc: ["'self'", 'https://fonts.googleapis.com', "'unsafe-inline'"],
    fontSrc: ["'self'", 'https://fonts.gstatic.com', ...trustedHosts],
    imgSrc: [
      "'self'",
      'data:',
      'https://*.walletconnect.org',
      'https://*.walletconnect.com',
      ...trustedHosts,
    ],
    scriptSrc: ["'self'", "'unsafe-eval'", "'unsafe-inline'", ...trustedHosts],
    connectSrc: [
      "'self'",
      'wss://*.walletconnect.org',
      'https://*.walletconnect.org',
      'wss://*.walletconnect.com',
      'https://*.walletconnect.com',
      ...trustedHosts,
    ],
    formAction: ["'self'", ...trustedHosts],
    frameAncestors: ['*'],
    manifestSrc: ["'self'", ...trustedHosts],
    mediaSrc: ["'self'", ...trustedHosts],
    childSrc: [
      "'self'",
      'https://*.walletconnect.org',
      'https://*.walletconnect.com',
      ...trustedHosts,
    ],
    objectSrc: ["'self'", ...trustedHosts],
    defaultSrc: ["'self'", ...trustedHosts],
    // reportURI: cspReportUri,
  },
  reportOnly,
};

// TODO: add nonce https://nextjs.org/docs/pages/building-your-application/configuring/content-security-policy
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);

  const headers = createSecureHeaders({
    contentSecurityPolicy,
    frameGuard: false,
    referrerPolicy: 'same-origin',
  });

  headers.forEach(({ key, value }) => {
    requestHeaders.set(key, value);
  });

  return NextResponse.next({
    headers: requestHeaders,
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
    },
  ],
};
