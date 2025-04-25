"use client";
import { IconTrendingDown, IconTrendingUp } from "@tabler/icons-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { WiStars } from "react-icons/wi";
import { Button } from "./ui/button";
import { useSelector } from "react-redux";
const promptCards = [
  {
    id: 1,
    category: "🔍 Research Assistant",
    title: "Explain quantum computing in simple terms.",
    trending: true,
    description:
      "Great for users looking to learn or explore complex topics simply.",
  },
  {
    id: 2,
    category: "📄 Content Generator",
    title: "Write a blog post about the benefits of remote work.",
    trending: true,
    description:
      "Perfect for content creators or marketers looking for quick inspiration.",
  },
  {
    id: 3,
    category: "💼 Professional Documents",
    title:
      "Create a modern resume for a frontend developer with 3 years of experience.",
    trending: false,
    description:
      "Ideal for job seekers or freelancers who need quick document drafts.",
  },
  {
    id: 4,
    category: "🧠 Creative Boost",
    title: "Write a sci-fi story about a robot discovering emotions.",
    trending: true,
    description: "Fuel your imagination with creative story ideas.",
  },
];

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * SectionCards
 *
 * This component renders a section of cards with a title and description.
 * The cards are generated from the `promptCards` array, and each card
 * displays a category, title, description, and a button to generate
 * a prompt. The component also renders a list of all prompts and
 * their corresponding responses.
 *
 * @returns {JSX.Element}
 */
/*******  fcf33832-9749-4442-880d-6ae2a79fb0e4  *******/ export function SectionCards() {
  const { messages } = useSelector((state: any) => state.chats);

  return (
    <div
      className={`*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4 ${
        messages !== null && messages.length !== 0 ? "hidden" : ""
      }`}
    >
      {promptCards.map((card) => (
        <Card className="@container/card relative" key={card.id}>
          <CardHeader>
            <CardDescription className="flex items-center gap-1">
              {card.category}
            </CardDescription>
            <CardTitle className="text-xl font-semibold ">
              {card.title}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm mb-6">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Trending up this month <IconTrendingUp className="size-4" />
            </div>
            <div className="text-muted-foreground">{card.description}</div>
            <Button className="absolute bottom-2 cursor-pointer">
              Generate <WiStars className="!w-6 !h-6" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
