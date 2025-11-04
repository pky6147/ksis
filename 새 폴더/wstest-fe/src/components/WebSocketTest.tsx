import type React from "react";
import { useEffect, useState } from "react";

interface WebSocketTestProps {
    userId: string; // 현재 로그인한 사용자의 ID
}

const WebSocketTest: React.FC<WebSocketTestProps> = ({ userId }) => {
    const [data, setData] = useState<string[]>([]);
    useEffect(() => {
        // userId가 없으면 웹소켓 연결을 시도하지 않습니다.
        if (!userId) return;

        // 백엔드 웹소켓 서버에 연결합니다.
        // URL은 `ws://localhost:8080/ws/test/{userId}` 형식입니다.
        const ws = new WebSocket(`ws://localhost:8080/ws/test/${userId}`);

        // 웹소켓 연결이 성공적으로 열렸을 때 실행됩니다.
        ws.onopen = () => {
            console.log(`WebSocket connected for user: ${userId}`);
        };

        // 웹소켓으로부터 메시지를 수신했을 때 실행됩니다.
        ws.onmessage = (event) => {
            // 수신된 데이터를 JSON으로 파싱합니다.
            // const data = JSON.parse(event.data);
            // 데이터의 `status`가 'complete'이면 크롤링이 완료된 것으로 간주합니다.
            console.log(event.data);
            setData(prevData => [...prevData, event.data]);
        };

        // 웹소켓 연결이 닫혔을 때 실행됩니다.
        ws.onclose = () => {
            console.log('WebSocket disconnected');
        };

        // 컴포넌트 언마운트 시 웹소켓 연결을 닫습니다.
        return () => {
            ws.close();
        };
    }, [userId]); // userId가 변경될 때마다 이 효과를 재실행합니다.

    return (
        <>
            <div>
            {data.map((msg, index) => (
                <div key={index}>{msg}</div>
            ))}
            </div>
        </>
    )
}


export default WebSocketTest;