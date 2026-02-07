'use client';

import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Webcam from 'react-webcam';




const Page = ({ params }) => {
  const { interviewID } = React.use(params);
  const [interviewData, setInterviewData] = useState(null);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  useEffect(() => {
    if (interviewID) {
      getInterviewDetails();
    }
  }, [interviewID]);

  const getInterviewDetails = async () => {
    try {
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, interviewID));

      console.log('Interview Data:', result);
      setInterviewData(result[0]);
    } catch (error) {
      console.error('Error fetching interview data:', error);
    }
  };

  return (
    <div className='my-10'>
      <h2 className='font-bold text-2xl'>Let's Get Started</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

         <div>
        
        {interviewData ? (
            <div className='flex flex-col gap-4 border p-4 rounded-lg'>
         <h2 className=''> <strong>Job Position/Role:</strong><span>{interviewData.jobPosition}</span></h2>
         <h2> <strong>Job Description:</strong> <span>{interviewData.jobDesc}</span></h2>
         <h2> <strong> Years of experience:</strong><span>{interviewData.jobExperience}</span></h2> 
         <div className='flex flex-col gap-2 bg-amber-100 rounded-2xl p-5'>
            <h2><Lightbulb></Lightbulb><ul>Information</ul></h2>
         <h2 className='text-yellow-500'><strong >
                Enable your webcam and microphone to start the AI-generated mock interview.
                It includes 5 questions for you to answer, and a report will be generated based on your responses.
              </strong></h2></div>
          </div>
        ) : (
          <p className='text-gray-500'>Loading job details...</p>
        )}
      </div>
        <div className='flex flex-col p-4 gap-4 border rounded-lg'>
        {webcamEnabled ? (
          <Webcam
            audio
            mirrored
            onUserMedia={() => setWebcamEnabled(true)}
            onUserMediaError={() => setWebcamEnabled(false)}
            style={{ height: 300, width: 400 }}
          />
        ) : (
          <>
            <WebcamIcon className=' h-64 w-64 my-5 p-4 rounded-lg text-gray-500' />
            <Button onClick={() => setWebcamEnabled(true)} variant='outline' className='w-full'>
              Enable Webcam and Microphone
            </Button>
          </>
        )}
        <div className='flex justify-end items-end mt-5'>
            <Link href={`/dashboard/interview/${interviewID}/start`}>
            <Button >Start Interview</Button>
            </Link>
        </div>
        
      </div>
     
      </div>

      

      
    </div>
  );
};

export default Page;
