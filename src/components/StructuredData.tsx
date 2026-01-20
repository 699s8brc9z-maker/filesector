import Script from 'next/script';

export default function StructuredData() {
    // 영어 (국제 SEO용)
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'FileSector',
        description: 'Free online file converter for images, documents, HWP, videos, and audio files',
        url: 'https://filesector.com',
        applicationCategory: 'UtilityApplication',
        operatingSystem: 'Web Browser',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
        featureList: [
            'HEIC to JPG conversion',
            'HWP to PDF conversion',
            'MP4 to GIF conversion',
            'MP4 to MP3 conversion',
            'Image to PDF conversion',
            'Video thumbnail extraction',
            '40+ file conversions',
        ],
        browserRequirements: 'Requires JavaScript. Requires HTML5.',
        softwareVersion: '1.0',
        inLanguage: ['en', 'ko', 'ja', 'zh'],
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '1250',
        },
    };

    const faqStructuredData = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'What happens if conversion fails?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Check file size limits and ensure the format is supported. Images: 50MB max, Documents/Audio: 100MB max, Videos: 500MB max.',
                },
            },
            {
                '@type': 'Question',
                name: 'Are uploaded files safe?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, all files are automatically deleted from the server immediately after download. Files are used only for conversion purposes and are not stored.',
                },
            },
            {
                '@type': 'Question',
                name: 'Can I convert HWP files to PDF?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, you can convert Hangul (HWP) files to PDF. The system automatically detects HWP format and provides PDF conversion options.',
                },
            },
            {
                '@type': 'Question',
                name: 'Can I convert HEIC to JPG?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, you can convert HEIC images to JPG, PNG, WebP, and other formats. We use high-quality conversion engines to maintain original quality.',
                },
            },
        ],
    };

    return (
        <>
            <Script
                id="structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <Script
                id="faq-structured-data"
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
            />
        </>
    );
}
