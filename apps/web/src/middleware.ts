import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Read the active theme from the cookie. Default to 'classic'
  const theme = request.cookies.get('active_theme')?.value || 'classic';
  
  // Clone the response
  const response = NextResponse.next();
  
  // Create theme-specific CSS variables
  let themeCssVars = '';
  switch (theme) {
    case 'modern':
      themeCssVars = `--ink: #0A0A0A; --paper: #FFFFFF; --leaf-mid: #1E6B45;`;
      break;
    case 'minimalist':
      themeCssVars = `--ink: #000000; --paper: #F9F9F9; --leaf-mid: #0D0D0D;`;
      break;
    case 'classic':
    default:
      themeCssVars = `--ink: #1A1208; --paper: #FDFAF5; --leaf-mid: #2E7D52;`;
      break;
  }
  
  // We attach a header, and in the layout, the server component will render a <style> block
  // This effectively injects the theme at the edge before JS hydration
  response.headers.set('x-injected-theme-css', themeCssVars);
  
  return response;
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
