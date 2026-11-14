
import { useEffect, useState } from 'react'
import { BookOpen } from 'lucide-react'
import './Devotional.css'

const Verses = [
  {
    id: 1,
    category: "Trusting God",
    reference: "Proverbs 3:5-6",
    verse: "Trust in the LORD with all your heart and lean not on your own understanding."
  },
  {
    id: 2,
    category: "Faith",
    reference: "Hebrews 11:1",
    verse: "Now faith is confidence in what we hope for and assurance about what we do not see."
  },
  {
    id: 3,
    category: "Strength",
    reference: "Philippians 4:13",
    verse: "I can do all things through Christ who strengthens me."
  },
  {
    id: 4,
    category: "God's Love",
    reference: "John 3:16",
    verse: "For God so loved the world that he gave his one and only Son."
  },
  {
    id: 5,
    category: "Fear and Courage",
    reference: "Joshua 1:9",
    verse: "Be strong and courageous. Do not be afraid; do not be discouraged, for the LORD your God will be with you wherever you go."
  },
  {
    id: 6,
    category: "Peace",
    reference: "Philippians 4:6-7",
    verse: "Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God."
  },
  {
    id: 7,
    category: "Hope",
    reference: "Jeremiah 29:11",
    verse: "For I know the plans I have for you, declares the LORD, plans to prosper you and not to harm you, plans to give you hope and a future."
  },
  {
    id: 8,
    category: "Prayer",
    reference: "1 Thessalonians 5:17",
    verse: "Pray continually."
  },
  {
    id: 9,
    category: "Salvation",
    reference: "Romans 10:9",
    verse: "If you declare with your mouth, 'Jesus is Lord,' and believe in your heart that God raised him from the dead, you will be saved."
  },
  {
    id: 10,
    category: "Evangelism",
    reference: "Mark 16:15",
    verse: "Go into all the world and preach the gospel to all creation."
  },
  {
    id: 11,
    category: "God's Guidance",
    reference: "Psalm 119:105",
    verse: "Your word is a lamp for my feet, a light on my path."
  },
  {
    id: 12,
    category: "Forgiveness",
    reference: "Ephesians 4:32",
    verse: "Be kind and compassionate to one another, forgiving each other, just as in Christ God forgave you."
  },
  {
    id: 13,
    category: "Love",
    reference: "1 Corinthians 13:4",
    verse: "Love is patient, love is kind. It does not envy, it does not boast, it is not proud."
  },
  {
    id: 14,
    category: "Serving God",
    reference: "Colossians 3:23",
    verse: "Whatever you do, work at it with all your heart, as working for the Lord."
  },
  {
    id: 15,
    category: "Overcoming Challenges",
    reference: "Romans 8:28",
    verse: "And we know that in all things God works for the good of those who love him."
  }
]

export const Devotional = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Verses.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  const currentVerse = Verses[currentIndex]

  return (
    <section className="min-h-[500px] bg-slate-50 px-5 py-16">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-800">
            <BookOpen size={16} />
            Daily Word
          </span>

          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Daily Devotional
          </h1>

          <p className="mt-3 text-slate-500">
            Grow in faith through the power of God's Word.
          </p>
        </div>

        <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-[#3154A5] shadow-xl">

          <div
            key={currentVerse.id}
            className="verse-enter px-8 py-14 text-center text-white md:px-16 md:py-20"
          >
            <p className="mb-8 text-sm font-semibold uppercase tracking-[0.2em] text-blue-200">
              {currentVerse.category}
            </p>

            <span className="mb-4 block font-serif text-6xl text-blue-200">
              "
            </span>

            <h2 className="text-xl font-medium leading-relaxed md:text-3xl">
              {currentVerse.verse}
            </h2>

            <p className="mt-8 text-sm font-semibold text-blue-200">
              {currentVerse.reference}
            </p>
          </div>

          <div className="h-1.5 bg-blue-950/30">
            <div
              key={`progress-${currentVerse.id}`}
              className="verse-progress h-full bg-blue-200"
            />
          </div>

        </div>

        <div className="mt-6 flex justify-center gap-2">
          {Verses.map((verse, index) => (
            <span
              key={verse.id}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentIndex
                  ? 'w-8 bg-[#3154A5]'
                  : 'w-2 bg-slate-300'
              }`}
            />
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-slate-400">
          In pursuit of eternal glory.
        </p>

      </div>
    </section>
  )
}
