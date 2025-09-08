"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { desc, eq } from "drizzle-orm";
import { Inter } from "next/font/google";
import React, { useEffect, useState } from "react";
import InterviewItemCard from "./InterviewItemCard";

function InterviewList() {
  const { user } = useUser();
  const [InterviewList, setInterviewList] = useState([]);
  useEffect(() => {
    user && GetInterviewList();
  }, [user]);

  const GetInterviewList = async () => {
    const result = await db.select().from(MockInterview).where(eq(MockInterview.createdBy, user?.primaryEmailAddress?.emailAddress)
      )
      .orderBy(desc(MockInterview.id));
    console.log(result);

    setInterviewList(result);
  };
  const handleDelete = async (mockId) => {
    const result = await db.delete(MockInterview).where(eq(MockInterview.mockId, mockId));
    console.log(result);
    GetInterviewList();
  };

  return (
    <div>
      <h2 className="font-bold text-2xl"> Previous Mock Interviews</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {InterviewList &&
          InterviewList.map((interview, index) => (
            <InterviewItemCard
              interview={interview}
              onDelete={handleDelete}
              key={index}
            />
          ))}
      </div>
    </div>
  );
}

export default InterviewList;
