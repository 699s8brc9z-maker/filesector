import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// 지원하는 언어 목록
const locales = ['ko', 'en'];

export default getRequestConfig(async ({ locale }) => {
    // 지원하지 않는 언어는 404
    if (!locales.includes(locale as any)) notFound();

    return {
        messages: (await import(`../../public/locales/${locale}/common.json`)).default
    };
});
