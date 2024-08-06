import { message } from "antd";
import React from "react";

const MessageContext = React.createContext<any>(null);

export const MessageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <MessageContext.Provider value={{ messageApi }}>
      <>
        {contextHolder}
        {children}
      </>
    </MessageContext.Provider>
  );
};
export const useMessageContext = () => React.useContext(MessageContext);
