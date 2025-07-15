import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function Faq() {
  return (
    <div className="dark:bg-black bg-white border-2 rounded-md p-3">
        <Accordion
        type="single"
        collapsible
        className="w-full text-xl"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>What is DevConnect?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              DevConnect is a social platform built specifically for developers. It helps users connect, collaborate, and share knowledge through project-based interactions, group workspaces, and dynamic profiles.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-2">
          <AccordionTrigger>Is DevConnect free to use?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Yes! All core features, including collaboration tools, profile creation, and community access, are completely free. Premium features may be introduced in the future, but the core experience remains open to everyone.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-3">
          <AccordionTrigger>Who is DevConnect for?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Whether you're a junior developer, freelancer, or part of a team—DevConnect is designed for anyone looking to network, learn, and build together. The platform adapts to your skill level and goals.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-4">
          <AccordionTrigger>Can I share my own projects?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Absolutely. You can publish your own project spaces, invite collaborators, and track progress—all within DevConnect. It's the perfect environment for team-building and open-source contributions.
            </p>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="item-5">
          <AccordionTrigger>Is DevConnect better than GitHub or LinkedIn?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              DevConnect isn’t a replacement—it's a complement. While GitHub focuses on code and LinkedIn on resumes, DevConnect is all about developer interaction, learning, and collaborative growth.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
