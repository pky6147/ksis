import React, { useEffect, useState } from "react";

interface CrawlStatus {
  url: string;
  status: "waiting" | "success" | "fail";
  title: string;
}

interface WebSocketTestProps {
  userId: string;
}

const WebSocketTest: React.FC<WebSocketTestProps> = ({ userId }) => {
  const [statuses, setStatuses] = useState<CrawlStatus[]>([]);

  useEffect(() => {
  if (!userId) return;

  const ws = new WebSocket(`ws://localhost:8080/ws/test/${userId}`);

  ws.onopen = () => {
    console.log("WebSocket connected");

    // 웹소켓 연결이 성공하면 크롤링 시작 API 호출
    fetch(`http://localhost:8080/crawl/start?userId=${userId}`, {
      method: "POST"
    })
    .then(res => res.text())
    .then(text => console.log("크롤링 시작 응답:", text))
    .catch(err => console.error("크롤링 시작 요청 실패:", err));
  };

  ws.onmessage = (event) => {
    try {
      const data: CrawlStatus = JSON.parse(event.data);
      setStatuses((prev) => {
        const index = prev.findIndex((item) => item.url === data.url);
        if (index >= 0) {
          const copy = [...prev];
          copy[index] = data;
          return copy;
        } else {
          return [...prev, data];
        }
      });
    } catch (e) {
      console.error("JSON parse error", e);
    }
  };

  ws.onclose = () => {
    console.log("WebSocket disconnected");
  };

  return () => {
    ws.close();
  };
}, [userId]);

  return (
    <>
      <h2>크롤링 진행 현황</h2>
      <table border={1} cellPadding={5}>
        <thead>
          <tr>
            <th>URL</th>
            <th>상태</th>
            <th>제목</th>
          </tr>
        </thead>
        <tbody>
          {statuses.map(({ url, status, title }) => (
            <tr key={url}>
              <td>{url}</td>
              <td>{status}</td>
              <td>{title}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default WebSocketTest;
