import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700'],
});

export const inglesa = localFont({
    src: [
        {
            path: '../public/fonts/inglesa-script-regular.otf',
        },
    ],
});

export const berlin = localFont({
    src: [
        {
            path: '../public/fonts/berlin-collection.ttf',
        }
    ]
})