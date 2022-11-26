import { WsDispatch } from "../../types";
import { TWsActions } from "../../types/actions";


export const socketMiddleware = (wsUrl: string, wsActions: any) => {
  return (store: object & { dispatch: WsDispatch }) => {
    let socket: any | null = null;
    return (next: (action: TWsActions) => {}) => (action: TWsActions) => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsClosing, onOpen, onClose, onError, onMessage } = wsActions;

      if (type === wsInit) {
        // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}${payload}`);
      }

      if (socket) {

        // функция, которая вызывается при открытии сокета
        socket.onopen = (event: object) => {
          dispatch({ type: onOpen, payload: event });
        };

        // функция, которая вызывается при ошибке соединения
        socket.onerror = (event: object) => {
          dispatch({ type: onError, payload: event });
        };

        // функция, которая вызывается при получении события от сервера
        socket.onmessage = (event: object & { data: string }) => {
          const { data } = event;
          dispatch({ type: onMessage, payload: JSON.parse(data) });
        };
        // функция, которая вызывается при закрытии соединения
        socket.onclose = (event: object) => {
          dispatch({ type: onClose, payload: event });
        };
        if (type === wsClosing) {
          socket.close()
        }
      }
      next(action);
    };
  };
};
