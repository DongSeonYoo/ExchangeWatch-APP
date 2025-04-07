import { useState, useEffect, useRef } from "react";
import { API_URL } from "../api/custom-Instance";
import EventSource from "react-native-sse";
import { LatestRateUpdateDto } from "../api/types/exchange-rate/dto/LatestRateUpdateDto";

interface UseSSEOptions {
  onMessage?: (data: LatestRateUpdateDto) => void;
  onError?: (error: any) => void;
  onOpen?: () => void;
}

export enum ReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSED = 2,
}

export const useSSE = (baseCurrency: string, options: UseSSEOptions = {}) => {
  const [readyState, setReadyState] = useState<ReadyState>(ReadyState.CLOSED);
  const [lastMessage, setLastMessage] = useState<LatestRateUpdateDto | null>(
    null
  );
  const [error, setError] = useState<any>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    const url = `${API_URL}/sse/latest-rate?baseCurrency=${baseCurrency}`;

    try {
      // 기존 연결 종료
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }

      // 새 연결 설정
      eventSourceRef.current = new EventSource(url);
      setReadyState(ReadyState.CONNECTING);

      // 연결 성공 이벤트
      eventSourceRef.current.addEventListener("open", () => {
        setReadyState(ReadyState.OPEN);
        setError(null);
        options.onOpen?.();
      });

      // 메시지 수신 이벤트
      eventSourceRef.current.addEventListener("message", (event: any) => {
        try {
          const data = JSON.parse(event.data) as LatestRateUpdateDto;
          setLastMessage(data);
          options.onMessage?.(data);
        } catch (err) {
          console.error("SSE 메시지 파싱 오류:", err);
          setError(err);
        }
      });

      // 에러 이벤트
      eventSourceRef.current.addEventListener("error", (err: any) => {
        console.error("SSE 연결 오류:", err);
        setError(err);
        setReadyState(ReadyState.CLOSED);
        options.onError?.(err);

        // 자동 재연결 시도
        setTimeout(() => {
          if (eventSourceRef.current) {
            eventSourceRef.current.close();
            eventSourceRef.current = null;
          }
        }, 3000);
      });
    } catch (err) {
      console.error("SSE 초기화 오류:", err);
      setError(err);
      options.onError?.(err);
    }

    // 컴포넌트 언마운트 시 리소스 정리
    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
        eventSourceRef.current = null;
        setReadyState(ReadyState.CLOSED);
      }
    };
  }, [baseCurrency]);

  // SSE 연결 강제 종료 메서드
  const close = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setReadyState(ReadyState.CLOSED);
    }
  };

  return {
    readyState,
    lastMessage,
    error,
    close,
    isConnected: readyState === ReadyState.OPEN,
  };
};
