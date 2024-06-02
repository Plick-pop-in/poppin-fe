import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccessToken, getMemberWithAccessToken } from "./api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "./slices/loginSlice";
import useCustomLogin from "./module/useCustomLogin";

function KakaoRedirect(props) {
    const [searchParams] = useSearchParams();
    const { moveToPath } = useCustomLogin();
    const authCode = searchParams.get('code');
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (authCode) {
                    console.log("Fetching access token...");
                    const accessToken = await getAccessToken(authCode);
                    console.log("Access token received:", accessToken);
                    const memberInfo = await getMemberWithAccessToken(accessToken);
                    console.log("Member info received:", memberInfo);
                    dispatch(login(memberInfo));
                    // if (memberInfo && memberInfo.social) {
                    //     moveToPath("/Mypage");
                    // } else {
                    //     moveToPath("/Main");
                    // }
                    moveToPath("/Main");
                }
            } catch (error) {
                console.error("Error during Kakao authentication:", error);
            }
        };

        fetchData();
    }, [authCode, dispatch, moveToPath]);

    return (
        <div>
        </div>
    );
}

export default KakaoRedirect;
