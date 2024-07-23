"use client";
import React, { useState } from "react";
import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import Loader from "@/components/Loader";
import { useGetCallById } from "@/hooks/useGetCallById";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { isLoaded, user } = useUser();
  const [isSetupComplete, setisSetupComplete] = useState(false);
  const { call, iscallLoading } = useGetCallById(id);
  if (!isLoaded || iscallLoading) return <Loader />;

  if (!call)
    return (
      <p className="text-center text-3xl font-bold text-white">
        Call Not Found
      </p>
    );

  return (
    // <div>Meeting Room: #{params.id}</div>
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setisSetupComplete={setisSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
