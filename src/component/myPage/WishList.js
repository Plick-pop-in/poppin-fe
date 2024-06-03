import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function WishList() {
    const loginInfo = useSelector(state => state.loginSlice);

    useEffect(() => {
        const userId = loginInfo.id;
        console.log('User ID:', userId);
    }, [loginInfo]);

    return (
        <div>
            {/* 나머지 UI 구성 요소 */}
        </div>
    );
}
