import { SignUp } from '@clerk/nextjs'

export default function Page() {
  return (
    <section>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:items-center md:gap-8">
          
          <div>
            <div className="max-w-lg md:max-w-none">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Elevate Your Interview Skills with AI
              </h2>

              <p className="mt-4 text-gray-700">
                Our AI-powered platform helps you prepare for job interviews by generating custom questions 
                based on your role and experience. Record your responses using webcam and microphone, 
                get instant AI feedback, and track your improvement over time.
              </p>

              <p className="mt-2 text-gray-700">
                Whether you're a fresher or an experienced professional, practice mock interviews tailored just for you.
              </p>
            </div>
          </div>

          <div>
            <SignUp />
          </div>

        </div>
      </div>
    </section>
  )
}
