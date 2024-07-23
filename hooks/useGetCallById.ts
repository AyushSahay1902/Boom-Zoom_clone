import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const useGetCallById = (id: string | string[]) => {
  const [call, setcall] = useState<Call>();
  const [iscallLoading, setiscallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      const { calls } = await client.queryCalls({
        filter_conditions: {
          id: id,
        },
      });
      if (calls.length > 0) setcall(calls[0]);
    };

    loadCall();
    setiscallLoading(false);
  }, [client, id]);

  return { call, iscallLoading };
};

export { useGetCallById };
