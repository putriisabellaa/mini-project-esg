import {getRequestConfig} from 'next-intl/server';
import {routing} from './routing';
 
export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
  // Stellen Sie sicher, dass eine gültige Sprache verwendet wird
  if (!locale || !routing.locales.includes(locale as 
    | "id-ID" 
    | "en-US" 
    | "ch-CH")) {
    locale = routing.defaultLocale;
  }
  
 
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});