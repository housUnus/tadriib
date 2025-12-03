"use client";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link";

export const FAQ = () => {
  const Questions = [
    {
      key: "question1",
      question: "What is included with my purchase?",
      answer:
        "Tailor the dashboard to your exact needs. Customize layouts, color schemes, and widgets effortlessly for a personalized user experience.",
    },
    {
      key: "question2",
      question: "Are there any recurring fees?",
      answer:
        "Unlock the true potential of your data with our advanced analytics tools. Gain valuable insights and make data-driven decisions with ease.",
    },
    {
      key: "question3",
      question: "Can I use the template on multiple projects?",
      answer:
        "Visualize complex data sets beautifully with our interactive graphs and charts. Quickly grasp trends and patterns for smarter analysis.",
    },
    {
      key: "question4",
      question:
        "Can I customize the admin dashboard template to match my brand?",
      answer:
        "Visualize complex data sets beautifully with our interactive graphs and charts. Quickly grasp trends and patterns for smarter analysis.",
    },
    {
      key: "question5",
      question: "Are there any restrictions on using the template?",
      answer:
        "Visualize complex data sets beautifully with our interactive graphs and charts. Quickly grasp trends and patterns for smarter analysis.",
    },
    {
      key: "question6",
      question: "How can I get support after purchase?",
      answer:
        "Visualize complex data sets beautifully with our interactive graphs and charts. Quickly grasp trends and patterns for smarter analysis.",
    },
  ];
  return (
    <section>
      <div className="max-w-[800px] mx-auto px-5 lg:py-24 py-12" >
        <h3 className="text-2xl sm:text-3xl md:text-40 font-bold text-link dark:text-white leading-tight text-center mb-10 sm:mb-14">Frequently asked questions</h3>
        <Accordion type="single" collapsible className="flex flex-col">
          {Questions.map((item) => (
            <AccordionItem key={item.key} value={item.key}>
              <AccordionTrigger className="px-6 text-lg text-ld py-5 rounded-md">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-5 text-base text-ld opacity-80 leading-7 rounded-b-md">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <p className="mt-14 text-sm font-medium justify-center text-ld opacity-80 flex flex-wrap items-center gap-1 border border-dashed border-dark w-fit mx-auto px-3 py-1.5 rounded-md">
          Still have a question?{" "}
          <Link
            href="https://discord.com/invite/XujgB8ww4n"
            className="underline hover:text-primary"
            target="_blank"
          >
            Ask On Discord
          </Link>{" "}
          <span>or</span>
          <Link
            href="https://adminmart.com/support/"
            className="underline hover:text-primary"
            target="_blank"
          >
            Submit A Ticket
          </Link>
        </p>
      </div>
    </section>
  );
};
