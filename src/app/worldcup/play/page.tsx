'use client';

import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import type { Stage } from '../../../lib/worldcup/types';
import { inter } from '@/lib/fonts';
import { inglesa, berlin, Cafe24PROUP } from '@/lib/fonts';
import { useRouter } from 'next/navigation';

const BG = '/worldcup-bg.png';

function VideoCard({
    videoId,
    artist,
    title,
    onPick,
}: {
    videoId: string;
    artist: string;
    title: string;
    onPick: () => void;
}) {
    return (
        <div
            className="
                rounded-2xl
                overflow-hidden
                border
                border-[#C13939]/25
                bg-white/5
                shadow-[0_10px_30px_rgba(0,0,0,0.35),0_0_18px_rgba(193,57,57,0.16)]
            "
        >
            {/* 영상 */}
            <div className="relative w-full aspect-video bg-black">
                <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={`${artist} - ${title}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/20 via-transparent to-black/5" />
            </div>

            {/* 정보 영역 */}
            <div className="px-4 pt-3 pb-2 bg-white/5">
                <div className="text-white/60 text-[12px] leading-tight truncate">
                    {artist}
                </div>

                {/* 제목 + 선택 버튼 */}
                <div className="mt-[-3px] flex items-center gap-3">
                    <div className="flex-1 text-white/90 text-[13px] font-semibold leading-tight truncate">
                        {title}
                    </div>

                    <button
                        type="button"
                        onClick={onPick}
                        className={`
                            ${inter.className}
                            shrink-0
                            relative -top-[2px]
                            rounded-lg
                            border
                            border-[#C13939]/40
                            bg-[#2A0E10]/30
                            px-3
                            py-1.5
                            text-[11px]
                            text-white/85
                            shadow-[inset_0_0_10px_rgba(193,57,57,0.15)]
                            hover:bg-[#2A0E10]/40
                            active:scale-[0.98]
                            transition
                        `}
                    >
                        🎄 선택하기
                    </button>
                </div>
            </div>
        </div>
    );
}



export default function worldcupPlayPage() {
    const router = useRouter();

    // 필요한 상태
    const [loading, setLoading] = useState(true); // 로딩 중인지
    const [pool, setPool] = useState<Stage[]>([]); // 현재 라운드에 남아있는 참가자 배열
    const [index, setIndex] = useState(0); // 현재 매치 위치
    const [winners, setWinners] = useState<Stage[]>([]); // 이번 라운드 승자 모아두는 배열

    const roundSize = pool.length; //32, 16, 8
    const matchNo = Math.floor(index / 2) + 1;
    const totalMatches = Math.max(1, Math.floor(roundSize / 2));

    const left = pool[index];
    const right = pool[index + 1];

    const roundLabel = useMemo(() => {
        if (roundSize >= 2) return `${roundSize}강`;
        return '결승';
    }, [roundSize]);

    useEffect(() => {
        const run = async () => {
            try {
                const res = await fetch('/stages.json', { cache: 'no-store' });
                const data = (await res.json()) as Stage[];

                const shuffled = [...data].sort(() => Math.random() - 0.5);
                setPool(shuffled);
            } finally {
                setLoading(false);
            }
        };

        run();
    }, []);

    const pick = (winner: Stage) => {
        setWinners((prev) => [...prev, winner]);

        const nextIndex = index + 2;

        if (nextIndex < pool.length) {
            setIndex(nextIndex);
            return;
        }

        const nextPool = [...winners, winner];

        if (nextPool.length === 1) {
            sessionStorage.setItem('worldcup_result', JSON.stringify(nextPool[0]));
            router.push('/worldcup/result');
            return;
        }

        setPool(nextPool);
        setWinners([]);
        setIndex(0);
    };



    return (
        <main className="relative min-h-[100dvh] w-full bg-black">
            {/* 바깥 배경(모바일: 이미지, PC: 단색) */}
            <img
                src={BG}
                alt="background"
                className="absolute inset-0 h-full w-full object-cover lg:hidden"
                style={{ zIndex: 0 }}
            />
            <div
                className="absolute inset-0 hidden lg:block"
                style={{
                    zIndex: 0,
                    background: 'linear-gradient(180deg, #3A0F14 0%, #2A0E10 100%)',
                }}
            />
            <div className="absolute inset-0 bg-black/10" style={{ zIndex: 1 }} />

            {/* 폰 프레임 */}
            <div className="relative z-10 mx-auto min-h-[100dvh] w-full overflow-hidden lg:max-w-[390px] [container-type:inline-size]">
                <img
                    src={BG}
                    alt="frame background"
                    className="absolute inset-0 h-full w-full object-cover"
                    style={{ zIndex: 0 }}
                />
                <div className="absolute inset-0 bg-black/10" style={{ zIndex: 1 }} />

                {/* Content */}
                <div className="relative z-10 flex min-h-[100dvh] flex-col items-center px-6 pt-12 pb-10">
                    {/* Title */}
                    <img
                        src={"/worldcup-logo.png"}
                        alt="Christmas Stage World Cup"
                        className="
                            w-[clamp(200px,83cqw,500px)]
                            select-none
                            pointer-events-none
                            mt-[clamp(10px,5cqw,40px)]
                        "
                    />
                    {/* 현재 단계 정보 */}
                    <div
                        className={`
                            ${Cafe24PROUP.className}
                            mt - 6 
                            text-white/90
                            text-[clamp(14px,5cqw,25px)]
                            tracking-wide 
                        `}
                        style={{ textShadow: '0px 0px 18px rgba(255,255,255,0.25)', }}
                    >
                        {loading ? '불러오는 중…' : `${roundLabel}  ${matchNo}/${totalMatches}`}
                    </div>

                    {/* Videos */}
                    <div className="mt-7 w-[clamp(240px,90cqw,340px)] flex flex-col gap-5">
                        {!loading && left && right ? (
                            <>
                                <VideoCard
                                    videoId={left.youtubeId}
                                    artist={left.artist}
                                    title={left.title}
                                    onPick={() => pick(left)}
                                />

                                <div className={`
                                    ${berlin.className}
                                    text-center
                                    text-white/100
                                    text-[clamp(22px,5.5cqw,30px)]
                                    tracking-[0.2em]
                                    `}>
                                    VS
                                </div>

                                <VideoCard
                                    videoId={right.youtubeId}
                                    artist={right.artist}
                                    title={right.title}
                                    onPick={() => pick(right)}
                                />

                            </>
                        ) : null}
                    </div>

                    <div className="mt-6 text-white/0 select-none">.</div>
                </div>
            </div>
        </main >
    );
}
