import Link from 'next/link';
import { inter } from '@/lib/fonts';
import { inglesa } from '@/lib/fonts';
import { berlin } from '@/lib/fonts';
import { Cafe24PROUP } from '@/lib/fonts'

const BG = '/worldcup-bg.png';

function VideoCard({ videoId }: { videoId: string }) {
    return (
        <div
            className="
            w-full
            overflow-hidden
            rounded-xl
            shadow-[0_16px_40px_rgba(0,0,0,0.35)]
            "
        >
            <div className="relative w-full aspect-video bg-black">
                <iframe
                    className="absolute inset-0 h-full w-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                />
            </div>
        </div>
    );
}

export default function worldcupPlayPage() {
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
                        32강&nbsp;&nbsp;1/16
                    </div>

                    {/* Videos */}
                    <div className="mt-7 w-[clamp(240px,90cqw,340px)] flex flex-col gap-5">
                        <VideoCard videoId="XyIqFCkrUls" />
                        <div className={`
                        ${berlin.className}
                        text-center
                        text-white/100
                        text-[clamp(22px,5.5cqw,30px)]
                        tracking-[0.2em]
                        `}>
                            VS
                        </div>

                        <VideoCard videoId="XyIqFCkrUls" />
                    </div>

                    { /* START 버튼 */}
                    <Link
                        href="/worldcup/intro"
                        className={`
                            ${inter.className}
                            mt-auto
                            rounded-3xl
                            bg-[#C13939]
                            border-2
                            border-[#147529]
                            px-6 py-1
                            text-white
                            font-normal tracking-wide
                            text-[clamp(10px,5.5cqw,40px)]
                            shadow-[0_0_30px_0_rgba(20,117,41,1)]
                            active:scale-95
                            transition
                            z-5
                            `}
                    >
                        RESET
                    </Link>

                    <div className="mt-6 text-white/0 select-none">.</div>
                </div>
            </div>
        </main >
    );
}