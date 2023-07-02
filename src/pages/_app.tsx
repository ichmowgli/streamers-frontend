import { type AppType } from "next/dist/shared/lib/utils";
import * as Dialog from "@radix-ui/react-dialog";
import * as Toast from "@radix-ui/react-toast";

import "~/styles/globals.css";
import { useStreamerStore } from "~/services/store";
import { useEffect } from "react";

const MyApp: AppType = ({ Component, pageProps }) => {
  const { connectToWs, disconnectFromWs } = useStreamerStore();

  useEffect(() => {
    connectToWs();
    return () => disconnectFromWs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog.Root>
      <Toast.Provider>
        <Component {...pageProps} />
      </Toast.Provider>
    </Dialog.Root>
  );
};

export default MyApp;
