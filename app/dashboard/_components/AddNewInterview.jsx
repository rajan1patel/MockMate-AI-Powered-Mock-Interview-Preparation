'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { getChatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle } from 'lucide-react';
import moment from 'moment';

// ✅ Add these necessary imports
import { useUser } from '@clerk/nextjs';


import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useRouter } from 'next/navigation';

function AddNewInterview() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [jsonResponse, setJsonResponse] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    const inputPrompt = `Job position: ${jobPosition}, Job description: ${jobDesc}, Years of experience: ${jobExperience}.
Generate 5 interview questions with answers in JSON format. Use this exact structure:
[
  {
    "question": "Your question here?",
    "answer": "Expected answer here"
  }
]
Return only the JSON array, no additional text.`;

    try {
      const chatSession = await getChatSession();
      const result = await chatSession.sendMessage(inputPrompt);
      const text = await result.response.text();

      const MockJsonresp = text.replace('```json', '').replace('```', '');
      console.log('Mock JSON Response:', JSON.parse(MockJsonresp));
      setJsonResponse(MockJsonresp);

      if (MockJsonresp) {
        const resp = await db.insert(MockInterview).values({
          mockId: crypto.randomUUID(),
          jsonMockResp: MockJsonresp,
          jobPosition: jobPosition,
          jobDesc: jobDesc,
          jobExperience: jobExperience,
          createdBy: user?.primaryEmailAddress?.emailAddress,
          createdAt: moment().format('YYYY-MM-DD'),
        }).returning({ mockId: MockInterview.mockId });

        
        setLoading(false);
        console.log('Database Response:', resp);
        
      if(resp){
        setOpenDialog(false);
        router.push(`/dashboard/interview/${resp[0].mockId}`);
      }

        
      }
    } catch (err) {
      console.error('Gemini error:', err);
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg cursor-pointer bg-secondary hover:bg-gray-200 transition-all duration-300"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className="text-lg">+ Add New</h2>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger />
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Tell us more about your interview area</DialogTitle>
            <DialogDescription>
              Add details about your job position and experience
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
            <div>
              <div className="my-3">
                <label>Job Role/Position</label>
                <Input
                  placeholder="Full Stack Developer"
                  required
                  onChange={(e) => setJobPosition(e.target.value)}
                />
              </div>

              <div className="my-3">
                <label>Job Description</label>
                <Textarea
                  placeholder="Tell us something about your job profile like tech stacks"
                  required
                  onChange={(e) => setJobDesc(e.target.value)}
                />
              </div>

              <div className="my-3">
                <label>Years of Experience</label>
                <Input
                  placeholder="Ex. 5"
                  type="number"
                  max={100}
                  required
                  onChange={(e) => setJobExperience(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-5 justify-end">
              <Button variant="ghost" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin" />
                    Generating from Ai
                  </>
                ) : (
                  'Start Interview'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddNewInterview;
