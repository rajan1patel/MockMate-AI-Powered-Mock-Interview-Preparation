'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getChatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle, Plus, Sparkles } from 'lucide-react';

function InterviewPrep() {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const prompt = `Job position: ${jobPosition}, Job description: ${jobDesc}, Years of experience: ${jobExperience}.
Generate 10 interview questions with answers in JSON format. Include technical, problem-solving, and behavioral questions.
Use this exact structure:
[
  {
    "question": "Your question here?",
    "answer": "Expected answer here"
  }
]
Return only the JSON array, no additional text.`;

      const chatSession = await getChatSession();
      const result = await chatSession.sendMessage(prompt);
      const text = await result.response.text();
      const cleaned = text.replace(/```json|```/g, '');
      const parsed = JSON.parse(cleaned);

      setJsonResponse(parsed);
      setOpenDialog(false);
    } catch (err) {
      alert('Something went wrong while generating questions.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreQuestions = async () => {
    setLoading(true);
    try {
      const prompt = `Job position: ${jobPosition}, Job description: ${jobDesc}, Years of experience: ${jobExperience}.
Generate 5 new and unique interview questions with answers in JSON format.
Use this exact structure:
[
  {
    "question": "Your question here?",
    "answer": "Expected answer here"
  }
]
Return only the JSON array, no additional text.`;

      const chatSession = await getChatSession();
      const result = await chatSession.sendMessage(prompt);
      const text = await result.response.text();
      const cleaned = text.replace(/```json|```/g, '');
      const parsed = JSON.parse(cleaned);

      setJsonResponse(prev => [...prev, ...parsed]);
    } catch (err) {
      alert('Failed to load more questions.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      {/* CTA Card */}
      <div
        className="p-6 rounded-2xl border border-dashed border-muted bg-muted/40 hover:bg-muted transition-all cursor-pointer flex items-center gap-3"
        onClick={() => setOpenDialog(true)}
      >
        <Plus className="w-5 h-5 text-muted-foreground" />
        <span className="font-medium text-muted-foreground">Start New Interview Prep</span>
      </div>

      {/* Dialog */}
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger />
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Interview Generator
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Fill out the form below to generate tailored mock interview questions.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={onSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">Job Role</label>
              <Input
                placeholder="e.g. Frontend Developer"
                required
                onChange={e => setJobPosition(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Job Description</label>
              <Textarea
                placeholder="e.g. React, TypeScript, REST APIs..."
                required
                onChange={e => setJobDesc(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Years of Experience</label>
              <Input
                type="number"
                max={100}
                required
                placeholder="e.g. 3"
                onChange={e => setJobExperience(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="ghost" type="button" onClick={() => setOpenDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <LoaderCircle className="animate-spin w-4 h-4 mr-2" />
                    Generating...
                  </>
                ) : (
                  'Generate'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Accordion Display */}
      {jsonResponse.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold flex items-center gap-2 mb-6">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            AI-Generated Interview
          </h3>

          <Accordion type="multiple" className="w-full space-y-2">
            {jsonResponse.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-base font-medium">
                  Q{index + 1}: {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Load More Button */}
          <div className="flex justify-center mt-6">
            <Button onClick={loadMoreQuestions} disabled={loading} variant="outline">
              {loading ? (
                <>
                  <LoaderCircle className="animate-spin mr-2 h-4 w-4" />
                  Loading more...
                </>
              ) : (
                'Load More Questions'
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InterviewPrep;
