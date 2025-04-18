import createMiddleware from 'next-intl/middleware'
import { locales, defaultLocale } from './src/lib/i18n'

export default createMiddleware({ locales, defaultLocale })

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
}
