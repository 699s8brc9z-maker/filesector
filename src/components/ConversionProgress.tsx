"use client";

import { Download, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ConversionProgressProps {
    status: 'idle' | 'converting' | 'completed' | 'error';
    progress?: number;
    message?: string;
    outputFile?: {
        id: string;
        filename: string;
        format: string;
    };
    onDownload?: () => void;
    onReset?: () => void;
}

export default function ConversionProgress({
    status,
    progress = 0,
    message,
    outputFile,
    onDownload,
    onReset,
}: ConversionProgressProps) {
    if (status === 'idle') {
        return null;
    }

    return (
        <Card className="p-6">
            {status === 'converting' && (
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <Loader2 className="animate-spin text-blue-600" size={20} />
                        <div className="flex-1">
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base">변환 중...</h4>
                            <p className="text-xs sm:text-sm text-slate-500">{message || '파일을 변환하고 있습니다'}</p>
                        </div>
                    </div>
                    {progress > 0 && (
                        <div className="w-full bg-slate-100 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    )}
                </div>
            )}

            {status === 'completed' && outputFile && (
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-xl sm:text-2xl">✅</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base">변환 완료!</h4>
                            <p className="text-xs sm:text-sm text-slate-500 truncate">{outputFile.filename}</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <Button
                            onClick={onDownload}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white h-11 sm:h-auto"
                        >
                            <Download size={20} className="mr-2" />
                            다운로드
                        </Button>
                        <Button onClick={onReset} variant="outline" className="h-11 sm:h-auto">
                            새 파일 변환
                        </Button>
                    </div>
                </div>
            )}

            {status === 'error' && (
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-xl sm:text-2xl">❌</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-slate-900 text-sm sm:text-base">변환 실패</h4>
                            <p className="text-xs sm:text-sm text-slate-500">{message || '오류가 발생했습니다'}</p>
                        </div>
                    </div>
                    <Button onClick={onReset} variant="outline" className="w-full h-11 sm:h-auto">
                        다시 시도
                    </Button>
                </div>
            )}
        </Card>
    );
}
