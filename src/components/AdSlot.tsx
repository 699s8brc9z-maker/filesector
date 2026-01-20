"use client";

import { useEffect } from 'react';

interface AdSlotProps {
    position: 'hero-bottom' | 'uploader-top' | 'help-middle' | 'conversion-wait' | 'footer-top';
    className?: string;
}

export default function AdSlot({ position, className = '' }: AdSlotProps) {
    useEffect(() => {
        try {
            // Google AdSense 광고 로드
            if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
                ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
            }
        } catch (error) {
            console.error('Ad loading error:', error);
        }
    }, []);

    return (
        <div className={`ad-container my-6 flex justify-center ${className}`}>
            <ins
                className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-XXXXXXXXXXXXXXXX" // 실제 AdSense ID로 변경 필요
                data-ad-slot={getAdSlot(position)}
                data-ad-format="auto"
                data-full-width-responsive="true"
            />
        </div>
    );
}

function getAdSlot(position: AdSlotProps['position']): string {
    // 각 위치별로 다른 광고 슬롯 ID 사용 (AdSense에서 생성)
    const slots = {
        'hero-bottom': 'XXXXXXXXXX',
        'uploader-top': 'YYYYYYYYYY',
        'help-middle': 'ZZZZZZZZZZ',
        'conversion-wait': 'AAAAAAAAAA',
        'footer-top': 'BBBBBBBBBB',
    };

    return slots[position];
}
