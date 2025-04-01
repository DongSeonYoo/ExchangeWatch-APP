import { createContext, ReactNode, useEffect } from "react";
import { useUserContext } from "./UserContext";
import * as Linking from "expo-linking";
import { DeepLinkData } from "../types/app";

// export interface DeepLinkContextType {
//   deepLinkData: DeepLinkData | null;
//   setDeepLinkData: (data: DeepLinkData | null) => void;
// }

// export const DeepLinkContext = createContext<DeepLinkContextType | undefined>(
//   undefined
// );

// export const DeepLinkProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const { login: contextLogin } = useUserContext();
//   const [deepLinkData, setDeepLinkData] = useState<DeepLinkData | null>(null);

//   useEffect(() => {
//     const handleDeepLink = (event: { url: string }) => {
//       console.log("딥링크 이벤트 감지됨: ", event);
//       const { url } = event;
//       // 예: com.dongseon.exchangewatchapp://(app)/home?accessToken=...&refreshToken=...&userIdx=...&email=...&name=...
//       const parsed = Linking.parse(url);
//       // 서버에서 쿼리 파라미터를 아래와 같이 전달한다고 가정함
//       const { accessToken, refreshToken, userIdx, email, name } =
//         parsed.queryParams || {};

//       // 각 값이 string | string[] 형태이므로 배열인 경우 첫번째 값만 사용
//       const aToken = Array.isArray(accessToken) ? accessToken[0] : accessToken;
//       const rToken = Array.isArray(refreshToken)
//         ? refreshToken[0]
//         : refreshToken;
//       const uIdx = Array.isArray(userIdx) ? userIdx[0] : userIdx;
//       const uEmail = Array.isArray(email) ? email[0] : email;
//       const uName = Array.isArray(name) ? name[0] : name;

//       if (aToken && rToken && uIdx && uEmail && uName) {
//         // 딥링크로 받은 정보를 통해 UserContext를 업데이트
//         contextLogin(aToken, rToken, {
//           idx: Number(uIdx),
//           email: uEmail,
//           name: uName,
//         });
//         // 필요하면 딥링크 데이터 상태도 업데이트
//         setDeepLinkData({
//           deepLinkStatus: "FOUND",
//           status: "success",
//           type: "googleAuth",
//           data: {
//             accessToken: aToken,
//             refreshToken: rToken,
//             userIdx: uIdx,
//             email: uEmail,
//             name: uName,
//           },
//         });
//       } else {
//         setDeepLinkData({
//           deepLinkStatus: "NOT_FOUND",
//           status: "missing parameters",
//           type: "",
//           data: {},
//         });
//       }
//     };

//     // 앱이 딥링크로 시작되었을 때 처리
//     (async () => {
//       const initUrl = await Linking.getInitialURL();
//       if (initUrl) {
//         handleDeepLink({ url: initUrl });
//       }
//     })();

//     // 이벤트 리스너 등록
//     const subscription = Linking.addEventListener("url", handleDeepLink);
//     return () => subscription.remove();
//   }, [contextLogin]);

//   return (
//     <DeepLinkContext.Provider value={{ deepLinkData, setDeepLinkData }}>
//       {children}
//     </DeepLinkContext.Provider>
//   );
// };

// // const DeepLinkContext = () => {
// //   const { login: contextLogin } = useUserContext();

// //   useEffect(() => {
// //     const handleDeepLink = (event: Linking.EventType) => {
// //       console.log("deep link handler에서 딥링크 이벤트 캐치했습니다!: ", event);
// //       const url = event.url;
// //       // 예: com.dongseon.exchangewatchapp://(app)/home?accessToken=...&refreshToken=...&userIdx=...&email=...&name=...
// //       const parsed = Linking.parse(url);
// //       const { _accessToken, _refreshToken, _userIdx, _email, _name } =
// //         parsed.queryParams || {};
// //       const accessToken = Array.isArray(_accessToken)
// //         ? _accessToken[0]
// //         : _accessToken;
// //       const refreshToken = Array.isArray(_refreshToken)
// //         ? _refreshToken[0]
// //         : _refreshToken;
// //       const userIdx = Array.isArray(_userIdx) ? _userIdx[0] : _userIdx;
// //       const email = Array.isArray(_email) ? _email[0] : _email;
// //       const name = Array.isArray(_name) ? _name[0] : _name;

// //       if (accessToken && refreshToken && userIdx && email && name) {
// //         contextLogin(accessToken, refreshToken, {
// //           idx: Number(userIdx),
// //           email: email,
// //           name: name,
// //         });
// //       }
// //     };
// //     (async () => {
// //       const initUrl = await Linking.getInitialURL();
// //       console.log(`Init Url from DeepLink [DeepLinkContext])`, initUrl);
// //       if (initUrl) {
// //         handleDeepLink({ url: initUrl });
// //       }
// //     })();

// //     const subscription = Linking.addEventListener("url", handleDeepLink);
// //     return () => subscription.remove();
// //   }, [contextLogin]);

// //   return null;
// // };

// // export default DeepLinkContext;
