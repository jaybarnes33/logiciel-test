import { Form } from "@/components/Form";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" items-center justify-center h-screen md:grid lg:max-w-none px-10 lg:grid-cols-2 lg:px-0">
      <div className="relative p-10 hidden h-full flex-col bg-muted  text-white lg:flex dark:border-r">
        <div className="absolute h-full inset-0 bg-cyan-800 bg-[url('/Bg.jpg.jpg')] bg-cover bg-blend-overlay" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Travels.io
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Let's document your journeys &rdquo;
            </p>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8 h-full">
        <div className="mx-auto flex w-full flex-col items-center h-full justify-center space-y-6 sm:w-[350px]">
          <div>
            <Form />
          </div>
        </div>
      </div>
    </div>
  );
}
