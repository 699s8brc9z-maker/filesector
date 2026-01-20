"use client";

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getConversionOptions, type FileInfo, type ConversionOption } from '@/lib/fileDetector';

interface ConversionOptionsProps {
    file: FileInfo;
    onConvert: (option: ConversionOption) => void;
    disabled?: boolean;
}

export default function ConversionOptions({ file, onConvert, disabled }: ConversionOptionsProps) {
    const options = getConversionOptions(file);

    if (options.length === 0) {
        return (
            <Card className="p-6 text-center">
                <p className="text-slate-500">이 파일 형식은 아직 지원되지 않습니다.</p>
            </Card>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">변환 옵션 선택</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {options.map((option) => (
                    <Button
                        key={option.id}
                        onClick={() => onConvert(option)}
                        disabled={disabled}
                        className="h-auto p-4 flex flex-col items-start gap-2 bg-white border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 text-slate-900 hover:text-blue-600 transition-all"
                        variant="outline"
                    >
                        <div className="flex items-center gap-3 w-full">
                            <span className="text-3xl">{option.icon}</span>
                            <div className="flex-1 text-left">
                                <div className="font-bold text-base">{option.label}</div>
                                <div className="text-xs text-slate-500 font-normal">{option.description}</div>
                            </div>
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
}
