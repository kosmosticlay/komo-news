import { useEffect, useState } from "react";
import Nav from "./Nav";

const getToday = (date: {
  toLocaleDateString: (
    arg0: string,
    arg1: { year: string; month: string; day: string; weekday: string }
  ) => any;
}) => {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short",
  };
  let todayDate = date.toLocaleDateString("en-US", options);
  todayDate = todayDate.replace(/(\w+),\s(\d+)\/(\d+)\/(\d+)/, "$4.$2.$3 $1");

  return todayDate;
};

const quotes = [
  {
    author: "George Orwell",
    quote:
      "Freedom of the press, if it means anything at all, means the freedom to criticize and oppose.",
  },
  {
    author: "Walter Cronkite",
    quote:
      "Freedom of the press is not just important to democracy, it is democracy.",
  },
  {
    author: "Edward R. Murrow",
    quote: "A nation of sheep will beget a government of wolves.",
  },
  {
    author: "H. L. Mencken",
    quote: "The only security of all is in a free press.",
  },
  {
    author: "Oscar Wilde",
    quote:
      "In America the President reigns for four years, and Journalism governs forever and ever.",
  },
  {
    author: "Nellie Bly",
    quote: "Energy rightly applied and directed will accomplish anything.",
  },
  {
    author: "Benjamin Franklin",
    quote:
      "Whoever would overthrow the liberty of a nation must begin by subduing the freeness of speech.",
  },
  {
    author: "A. J. Liebling",
    quote: "Freedom of the press is guaranteed only to those who own one.",
  },
  {
    author: "George Washington",
    quote:
      "If freedom of speech is taken away, then dumb and silent we may be led, like sheep to the slaughter.",
  },
  {
    author: "Voltaire",
    quote:
      "I detest what you write, but I would give my life to make it possible for you to continue to write.",
  },
  {
    author: "Arthur Miller",
    quote: "A good newspaper, I suppose, is a nation talking to itself.",
  },
  {
    author: "Margaret Fuller",
    quote:
      "Let every woman who has once begun to think, exert her influence to induce others to think.",
  },
  {
    author: "Bob Schieffer",
    quote:
      "I think journalism is a great way to do public service, to have an impact on your community.",
  },
  {
    author: "Andrew Vachss",
    quote:
      "Journalism is what maintains democracy. It's the force for progressive social change.",
  },
  {
    author: "Bob Woodward",
    quote:
      "The central dilemma in journalism is that you don't know what you don't know.",
  },
  {
    author: "Rebecca West",
    quote: "Journalism: an ability to meet the challenge of filling the space.",
  },
  {
    author: "Ray Bradbury",
    quote: "Journalism keeps you planted in the earth.",
  },
  {
    author: "Graham Greene",
    quote: "Media is just a word that has come to mean bad journalism.",
  },
  {
    author: "Geraldo Rivera",
    quote:
      "The courage in journalism is sticking up for the unpopular, not the popular.",
  },
  {
    author: "Julian Assange",
    quote: "If journalism is good, it is controversial, by its nature.",
  },
  {
    author: "Ana Kasparian",
    quote:
      "The point of journalism is to hold people in positions of power accountable.",
  },
  {
    author: "Toomas Hendrik Ilves",
    quote: "Fake news is cheap to produce. Genuine journalism is expensive.",
  },
];

const getQuote = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

export default function Header({ data }: { data: any }) {
  const [quoteObj, setQuoteObj] = useState({ author: "", quote: "" });
  useEffect(() => {
    setQuoteObj(getQuote());
  }, []);

  return (
    <div>
      <Nav data={data} />
      <div className="border-black border-t-1 grid grid-row-1 grid-cols-3 text-sm">
        <span className="pl-3">Strat Writing!</span>
        <span className="text-center">Volume #1</span>
        <span className="pr-3 text-right">{getToday(new Date())}</span>
      </div>
      <h1 className="py-4 border-black border-y-2 tracking-wider font-header-title text-5xl flex justify-center items-center">
        NOMAD REPORT
      </h1>
      <div className="text-lg text-center animate-slide-up">
        <span className="mr-3 italic">"{quoteObj.quote}"</span>
        <span>— {quoteObj.author} —</span>
      </div>
      <div className="py-2 border-y-1 border-black">
        <div className="w-full h-32 bg-slate-300 text-white text-center overflow-hidden ad-bgImage grayscale"></div>
      </div>
    </div>
  );
}
