
import React from "react";

const messages = [
  {
    id: 1,
    verse: "John 3:16",
    text: "For God so loved the world that He gave His one and only Son, that whoever believes in Him shall not perish but have eternal life.",
  },
  {
    id: 2,
    verse: "Jeremiah 29:11",
    text: "For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.",
  },
  {
    id: 3,
    verse: "Psalm 23:1",
    text: "The Lord is my shepherd, I lack nothing.",
  },
  {
    id: 4,
    verse: "Philippians 4:13",
    text: "I can do all this through Him who gives me strength.",
  },
  {
    id: 5,
    verse: "Proverbs 3:5-6",
    text: "Trust in the Lord with all your heart and lean not on your own understanding.",
  },
  {
    id: 6,
    verse: "Isaiah 41:10",
    text: "Do not fear, for I am with you; do not be dismayed, for I am your God.",
  },
  {
    id: 7,
    verse: "Romans 8:28",
    text: "In all things God works for the good of those who love Him.",
  },
  {
    id: 8,
    verse: "Psalm 46:1",
    text: "God is our refuge and strength, an ever-present help in trouble.",
  },
  {
    id: 9,
    verse: "Matthew 11:28",
    text: "Come to Me, all you who are weary and burdened, and I will give you rest.",
  },
  {
    id: 10,
    verse: "Joshua 1:9",
    text: "Be strong and courageous. Do not be afraid, for the Lord your God is with you wherever you go.",
  },
  {
    id: 11,
    verse: "Psalm 34:18",
    text: "The Lord is close to the brokenhearted and saves those who are crushed in spirit.",
  },
  {
    id: 12,
    verse: "Romans 12:2",
    text: "Be transformed by the renewing of your mind.",
  },
  {
    id: 13,
    verse: "Psalm 119:105",
    text: "Your word is a lamp for my feet, a light on my path.",
  },
  {
    id: 14,
    verse: "Matthew 6:33",
    text: "Seek first His kingdom and His righteousness.",
  },
  {
    id: 15,
    verse: "Isaiah 40:31",
    text: "Those who hope in the Lord will renew their strength.",
  },
  {
    id: 16,
    verse: "Hebrews 11:1",
    text: "Faith is confidence in what we hope for and assurance about what we do not see.",
  },
  {
    id: 17,
    verse: "John 14:27",
    text: "Peace I leave with you; My peace I give you. Do not let your hearts be troubled.",
  },
  {
    id: 18,
    verse: "Psalm 31:24",
    text: "Be strong and take heart, all you who hope in the Lord.",
  },
];
const VerseCard = ({ message }) => {
  return (
    <div className="mx-2 w-80 shrink-0 rounded-xl border border-[#5BC0E3] border-t-4 border-t-[#762A7D] bg-[#FFFFFF] p-5 shadow-md">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-[#3154A5]">
        {message.verse}
      </h2>

      <p className="text-sm leading-relaxed text-[#000000]">
        {message.text}
      </p>

      <div className="mt-4 h-1 w-8 bg-[#5BC0E3]"></div>
    </div>
  );
};

const AniamatedPage = () => {
  return (
    <section className="overflow-hidden bg-[#FFFFFF] py-8">
      <div className="verse-track flex w-max">
        {messages.map((message) => (
          <VerseCard key={`one-${message.id}`} message={message} />
        ))}

        {messages.map((message) => (
          <VerseCard key={`two-${message.id}`} message={message} />
        ))}
      </div>
    </section>
  );
};


export default AniamatedPage;
