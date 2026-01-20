import { Card } from '@/components/ui/card';
import { FileImage, FileText } from 'lucide-react';

export default function ConversionExamples() {
    const examples = [
        {
            category: 'Image Conversion',
            icon: FileImage,
            conversions: [
                { from: 'HEIC', to: 'JPG', desc: 'iPhone photos to universal format' },
                { from: 'PNG', to: 'JPG', desc: 'Reduce file size' },
                { from: 'JPG', to: 'WebP', desc: 'Modern web format' },
                { from: 'Image', to: 'PDF', desc: 'Convert any image to PDF' },
            ],
        },
        {
            category: 'Document Conversion',
            icon: FileText,
            conversions: [
                { from: 'HWP', to: 'PDF', desc: 'Korean Hangul to PDF' },
                { from: 'DOCX', to: 'PDF', desc: 'Word to PDF' },
                { from: 'XLSX', to: 'PDF', desc: 'Excel to PDF' },
                { from: 'PPTX', to: 'PDF', desc: 'PowerPoint to PDF' },
            ],
        },
    ];

    return (
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto max-w-6xl">
                <h2 className="text-3xl sm:text-4xl font-bold text-center text-slate-900 mb-4">
                    Popular File Conversions
                </h2>
                <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
                    Convert between image and document formats instantly. No registration required.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {examples.map((category, idx) => {
                        const Icon = category.icon;
                        return (
                            <Card key={idx} className="p-6 hover:shadow-lg transition">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                                        <Icon className="text-blue-600" size={20} />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900">
                                        {category.category}
                                    </h3>
                                </div>
                                <div className="space-y-3">
                                    {category.conversions.map((conv, i) => (
                                        <div key={i} className="flex items-center justify-between text-sm">
                                            <div className="flex items-center gap-2">
                                                <span className="font-semibold text-slate-700">{conv.from}</span>
                                                <span className="text-slate-400">→</span>
                                                <span className="font-semibold text-blue-600">{conv.to}</span>
                                            </div>
                                            <span className="text-slate-500 text-xs">{conv.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </Card>
                        );
                    })}
                </div>

                {/* SEO 키워드 섹션 */}
                <div className="mt-12 text-center text-sm text-slate-500">
                    <p className="mb-2">
                        <strong>Supported conversions:</strong> HEIC to JPG, HEIC to PNG, PNG to JPG, JPG to PNG,
                        JPG to WebP, PNG to WebP, Image to PDF, HWP to PDF, DOCX to PDF, XLSX to PDF, PPTX to PDF, and more.
                    </p>
                    <p className="text-xs text-amber-600 mt-2">
                        📝 Note: Video and audio conversion features are coming soon!
                    </p>
                </div>
            </div>
        </section>
    );
}
