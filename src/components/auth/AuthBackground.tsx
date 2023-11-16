import Image from 'next/image';

import background from '@/assets/images/background.jpg';

export const AuthBackground = () => {
    return (
        <Image src={background} alt='Auth background' style={{zIndex: -1, height: '100%', position: 'fixed', objectFit: 'cover'}} />
    );
};