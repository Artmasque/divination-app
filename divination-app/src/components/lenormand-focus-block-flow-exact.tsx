import React, { useState, useEffect } from 'react';

interface Card {
  id: number;
  name: string;
  meaning: string;
}

interface JournalEntry {
  date: string;
  question: string;
  topic: string;
  cards: Card[];
  meanings: string[];
}

interface Topic {
  id: string;
  name: string;
}

type Position = 'focus' | 'block' | 'flow';
type TopicId = 'health' | 'money' | 'relationships' | 'spirituality';

type TopicMeanings = {
  [key in Position]: {
    [key: string]: string;
  };
};

interface ExactMeanings {
  health: TopicMeanings;
  money: TopicMeanings;
  relationships: TopicMeanings;
  spirituality: TopicMeanings;
}

const LenormandSpread: React.FC = () => {
  const [cards, setCards] = useState<(Card | null)[]>([null, null, null]);
  const [question, setQuestion] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<TopicId | ''>('');
  const [showResults, setShowResults] = useState(false);
  const [revealedCards, setRevealedCards] = useState([false, false, false]);
  const [journal, setJournal] = useState<JournalEntry[]>([]);

  const topics = [
    { id: 'health', name: 'Health' },
    { id: 'money', name: 'Money/Career' },
    { id: 'relationships', name: 'Relationships' },
    { id: 'spirituality', name: 'Spirituality/Personal Growth' }
  ];

  // Load journal from localStorage on component mount
  useEffect(() => {
    const savedJournal = localStorage.getItem('divination-journal');
    if (savedJournal) {
      setJournal(JSON.parse(savedJournal));
    }
  }, []);

  // Save journal to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('divination-journal', JSON.stringify(journal));
  }, [journal]);

  // Define the Lenormand deck
  const lenormandCards = [
    { id: 1, name: 'Rider', meaning: 'Messages, news, arrivals, visitors, swift movement' },
    { id: 2, name: 'Clover', meaning: 'Luck, opportunity, small pleasures, quick fortune' },
    { id: 3, name: 'Ship', meaning: 'Travel, distance, movement, foreign matters, commerce' },
    { id: 4, name: 'House', meaning: 'Home, security, family matters, domestic space, foundation' },
    { id: 5, name: 'Tree', meaning: 'Health, growth, stability, longevity, family lineage' },
    { id: 6, name: 'Clouds', meaning: 'Confusion, uncertainty, changing conditions, ambiguity' },
    { id: 7, name: 'Snake', meaning: 'Complications, deception, wisdom, transformation, sensuality' },
    { id: 8, name: 'Coffin', meaning: 'Endings, transitions, release, illness, transformation' },
    { id: 9, name: 'Bouquet', meaning: 'Gifts, compliments, beauty, appreciation, invitations' },
    { id: 10, name: 'Scythe', meaning: 'Swift endings, decisions, danger, surgery, harvesting' },
    { id: 11, name: 'Whip', meaning: 'Conflict, arguments, repetition, discipline, passion' },
    { id: 12, name: 'Birds', meaning: 'Communication, conversations, gossip, partnerships, anxiety' },
    { id: 13, name: 'Child', meaning: 'Beginnings, innocence, naivety, new projects, playfulness' },
    { id: 14, name: 'Fox', meaning: 'Cunning, self-employment, deception, adaptability, vigilance' },
    { id: 15, name: 'Bear', meaning: 'Power, strength, money, protection, authority' },
    { id: 16, name: 'Stars', meaning: 'Aspirations, guidance, spirituality, clarity, inspiration' },
    { id: 17, name: 'Stork', meaning: 'Changes, improvements, fertility, movement, relocation' },
    { id: 18, name: 'Dog', meaning: 'Loyalty, friendship, fidelity, trustworthiness, support' },
    { id: 19, name: 'Tower', meaning: 'Institution, isolation, authority, protection, government' },
    { id: 20, name: 'Garden', meaning: 'Social gatherings, public reputation, community, networking' }
  ];

  // Exact meanings from the spreadsheet
  const exactMeanings: ExactMeanings = {
    health: {
      focus: {
        'Rider': 'Focus on physical activity and health news',
        'Clover': 'Focus on minor health improvements and self-care',
        'Ship': 'Focus on long-term health journeys and medical travel',
        'House': 'Focus on home health, creating a healing environment',
        'Tree': 'Focus on long-term health growth and development',
        'Clouds': 'Focus on unclear health issues, getting clarity',
        'Snake': 'Focus on investigating health complexities',
        'Coffin': 'Focus on ending unhealthy patterns',
        'Bouquet': 'Focus on feeling good about your health',
        'Scythe': 'Focus on decisive action for health intervention',
        'Whip': 'Focus on energetic health habits',
        'Birds': 'Focus on communicating about health needs',
        'Child': 'Focus on new health beginnings',
        'Fox': 'Focus on clever health strategies',
        'Bear': 'Focus on strong health, building resilience',
        'Stars': 'Focus on hope for health improvements',
        'Stork': 'Focus on positive health changes',
        'Dog': 'Focus on loyal health support systems',
        'Tower': 'Focus on structured health approaches',
        'Garden': 'Focus on social activities for wellbeing'
      },
      block: {
        'Rider': 'Restlessness hindering health improvements',
        'Clover': 'Minor health setbacks, lack of luck in healing',
        'Ship': 'Circulation problems blocking health progress',
        'House': 'Unstable home environment affecting health',
        'Tree': 'Lack of vitality blocking health improvements',
        'Clouds': 'Confusion hindering diagnosis and treatment',
        'Snake': 'Hidden health issues blocking progress',
        'Coffin': 'Fear of endings hindering health transformation',
        'Bouquet': 'Lack of joy hindering health improvement',
        'Scythe': 'Fear of sudden health changes or procedures',
        'Whip': 'Tension hindering health recovery',
        'Birds': 'Anxious thoughts hindering healing',
        'Child': 'Immaturity hindering health responsibility',
        'Fox': 'Deceptive health information causing confusion',
        'Bear': 'Weakness hindering health recovery',
        'Stars': 'Hopelessness hindering health improvement',
        'Stork': 'Resistance to health changes blocking progress',
        'Dog': 'Lack of support hindering health recovery',
        'Tower': 'Restrictions hindering health access',
        'Garden': 'Social pressure affecting health choices'
      },
      flow: {
        'Rider': 'Take action for health, Move toward vitality',
        'Clover': 'Be optimistic about health, Expect good outcomes',
        'Ship': 'Expand health horizons, Explore new treatments',
        'House': 'Create stable health routines, Focus on home healing',
        'Tree': 'Nurture long-term health, Focus on growth',
        'Clouds': 'Seek clarity about health, Dispel confusion',
        'Snake': 'Seek wisdom about health, Be discerning with treatments',
        'Coffin': 'Allow health transformation, End unhealthy cycles',
        'Bouquet': 'Accept health gifts, Seek joy in healing',
        'Scythe': 'Take decisive action for health, Cut out harmful habits',
        'Whip': 'Use energy wisely for health, Balance exertion',
        'Birds': 'Communicate openly about health needs',
        'Child': 'Embrace new health beginnings, Fresh approaches',
        'Fox': 'Be clever about health, Investigate options strategically',
        'Bear': 'Take control of health, Be strong in recovery',
        'Stars': 'Have hope for health, Seek guidance for healing',
        'Stork': 'Embrace positive health changes',
        'Dog': 'Seek loyal health support, Be a good patient',
        'Tower': 'Create structured health approaches, Access expertise',
        'Garden': 'Join health communities, Share wellness journeys'
      }
    },
    money: {
      focus: {
        'Rider': 'Focus on new financial opportunities arriving',
        'Clover': 'Focus on small financial gains and opportunities',
        'Ship': 'Focus on business expansion and financial journeys',
        'House': 'Focus on home finances and property matters',
        'Tree': 'Focus on long-term financial growth strategies',
        'Clouds': 'Focus on financial clarity and understanding',
        'Snake': 'Focus on complex financial situations',
        'Coffin': 'Focus on ending financial difficulties',
        'Bouquet': 'Focus on financial gifts and appreciation',
        'Scythe': 'Focus on decisive financial actions',
        'Whip': 'Focus on energetic financial pursuits',
        'Birds': 'Focus on financial discussions and communications',
        'Child': 'Focus on new financial beginnings',
        'Fox': 'Focus on clever financial strategies',
        'Bear': 'Focus on financial strength and power',
        'Stars': 'Focus on hope for financial improvement',
        'Stork': 'Focus on positive financial changes',
        'Dog': 'Focus on loyal financial partnerships',
        'Tower': 'Focus on financial institutions and stability',
        'Garden': 'Focus on financial networking and community'
      },
      block: {
        'Rider': 'Delays in income and financial news',
        'Clover': 'Financial bad luck blocking progress',
        'Ship': 'Business setbacks hindering financial movement',
        'House': 'Financial instability affecting home security',
        'Tree': 'Stagnant finances blocking growth',
        'Clouds': 'Financial confusion causing uncertainty',
        'Snake': 'Financial deception creating complications',
        'Coffin': 'Financial stagnation blocking new opportunities',
        'Bouquet': 'Unhappiness about finances blocking prosperity',
        'Scythe': 'Financial recklessness causing problems',
        'Whip': 'Financial tension creating stress',
        'Birds': 'Financial anxiety blocking clear thinking',
        'Child': 'Financial immaturity hindering progress',
        'Fox': 'Financial deception causing mistrust',
        'Bear': 'Financial weakness limiting options',
        'Stars': 'Financial hopelessness blocking vision',
        'Stork': 'Financial stagnation resisting change',
        'Dog': 'Financial disloyalty affecting partnerships',
        'Tower': 'Financial restrictions limiting freedom',
        'Garden': 'Social financial pressure causing stress'
      },
      flow: {
        'Rider': 'Actively pursue financial opportunities',
        'Clover': 'Be optimistic about financial prospects',
        'Ship': 'Expand financial horizons, explore new ventures',
        'House': 'Build stable financial foundations',
        'Tree': 'Nurture long-term financial growth',
        'Clouds': 'Seek financial clarity and understanding',
        'Snake': 'Be wise about financial complexities',
        'Coffin': 'Allow financial transformation and renewal',
        'Bouquet': 'Accept financial gifts and opportunities',
        'Scythe': 'Be decisive with financial choices',
        'Whip': 'Use energy wisely in financial pursuits',
        'Birds': 'Communicate openly about financial matters',
        'Child': 'Embrace new financial beginnings',
        'Fox': 'Be clever with financial strategies',
        'Bear': 'Be financially strong and protective',
        'Stars': 'Have hope for financial improvement',
        'Stork': 'Embrace positive financial changes',
        'Dog': 'Seek loyal financial partnerships',
        'Tower': 'Create financial stability and structure',
        'Garden': 'Network for financial opportunities'
      }
    },
    relationships: {
      focus: {
        'Rider': 'Focus on communication in relationships',
        'Clover': 'Focus on enjoying minor relationship pleasures',
        'Ship': 'Focus on distance relationships or moving forward',
        'House': 'Focus on home life and family relationships',
        'Tree': 'Focus on deepening relationship roots',
        'Clouds': 'Focus on relationship clarity and understanding',
        'Snake': 'Focus on relationship complexities',
        'Coffin': 'Focus on ending unhealthy relationship patterns',
        'Bouquet': 'Focus on joy in relationships',
        'Scythe': 'Focus on decisive relationship actions',
        'Whip': 'Focus on passion in relationships',
        'Birds': 'Focus on relationship communication',
        'Child': 'Focus on new relationship beginnings',
        'Fox': 'Focus on strategic relationship thinking',
        'Bear': 'Focus on strong relationship foundations',
        'Stars': 'Focus on hope in relationships',
        'Stork': 'Focus on positive relationship changes',
        'Dog': 'Focus on loyal relationship connections',
        'Tower': 'Focus on structured relationship boundaries',
        'Garden': 'Focus on social relationships and community'
      },
      block: {
        'Rider': 'Communication issues blocking connection',
        'Clover': 'Minor relationship disappointments building up',
        'Ship': 'Distance creating relationship barriers',
        'House': 'Home instability affecting relationships',
        'Tree': 'Lack of depth in relationships',
        'Clouds': 'Relationship confusion causing misunderstandings',
        'Snake': 'Deception blocking relationship trust',
        'Coffin': 'Fear of relationship endings causing stagnation',
        'Bouquet': 'Unhappiness blocking relationship joy',
        'Scythe': 'Fear of decisive relationship actions',
        'Whip': 'Relationship tension creating distance',
        'Birds': 'Relationship anxiety blocking communication',
        'Child': 'Relationship immaturity causing problems',
        'Fox': 'Relationship deception undermining trust',
        'Bear': 'Weakness in relationship foundations',
        'Stars': 'Hopelessness in relationship future',
        'Stork': 'Resistance to relationship changes',
        'Dog': 'Relationship disloyalty affecting trust',
        'Tower': 'Relationship restrictions causing isolation',
        'Garden': 'Social pressures affecting relationship quality'
      },
      flow: {
        'Rider': 'Take initiative in relationship communication',
        'Clover': 'Be optimistic in relationship matters',
        'Ship': 'Bridge distance, explore relationship growth',
        'House': 'Create stable home environment for relationships',
        'Tree': 'Nurture relationship depth and growth',
        'Clouds': 'Seek relationship clarity through communication',
        'Snake': 'Be wise in relationship complexities',
        'Coffin': 'Allow relationship transformation when needed',
        'Bouquet': 'Accept love gifts and relationship joy',
        'Scythe': 'Be decisive in relationship matters',
        'Whip': 'Resolve relationship conflicts constructively',
        'Birds': 'Communicate openly about relationship needs',
        'Child': 'Embrace new relationship approaches',
        'Fox': 'Be clever in relationship situations',
        'Bear': 'Be strong in relationship matters',
        'Stars': 'Have hope in relationship possibilities',
        'Stork': 'Embrace positive relationship changes',
        'Dog': 'Be loyal in relationship connections',
        'Tower': 'Create structured relationship boundaries',
        'Garden': 'Cultivate relationship community and support'
      }
    },
    spirituality: {
      focus: {
        'Rider': 'Focus on spiritual messages and guidance',
        'Clover': 'Focus on spiritual opportunities and blessings',
        'Ship': 'Focus on spiritual journeys and exploration',
        'House': 'Focus on spiritual foundation and sacred space',
        'Tree': 'Focus on spiritual growth and wisdom',
        'Clouds': 'Focus on spiritual mysteries and intuition',
        'Snake': 'Focus on spiritual transformation and kundalini',
        'Coffin': 'Focus on spiritual release and letting go',
        'Bouquet': 'Focus on spiritual gifts and blessings',
        'Scythe': 'Focus on spiritual breakthroughs and clarity',
        'Whip': 'Focus on spiritual discipline and practice',
        'Birds': 'Focus on spiritual communication and signs',
        'Child': 'Focus on spiritual innocence and wonder',
        'Fox': 'Focus on spiritual discernment and wisdom',
        'Bear': 'Focus on spiritual strength and protection',
        'Stars': 'Focus on spiritual guidance and divine light',
        'Stork': 'Focus on spiritual evolution and progress',
        'Dog': 'Focus on spiritual loyalty and devotion',
        'Tower': 'Focus on spiritual solitude and meditation',
        'Garden': 'Focus on spiritual community and connection'
      },
      block: {
        'Rider': 'Rushing spiritual growth blocking authentic progress',
        'Clover': 'Superficial spirituality blocking depth',
        'Ship': 'Spiritual wandering without direction',
        'House': 'Rigid beliefs blocking spiritual growth',
        'Tree': 'Spiritual stagnation blocking evolution',
        'Clouds': 'Spiritual confusion blocking clarity',
        'Snake': 'Fear of transformation blocking growth',
        'Coffin': 'Fear of spiritual death blocking rebirth',
        'Bouquet': 'Spiritual materialism blocking authenticity',
        'Scythe': 'Harsh self-judgment blocking progress',
        'Whip': 'Spiritual conflict blocking peace',
        'Birds': 'Mental chatter blocking spiritual silence',
        'Child': 'Spiritual immaturity blocking wisdom',
        'Fox': 'Spiritual deception blocking truth',
        'Bear': 'Spiritual pride blocking humility',
        'Stars': 'Spiritual doubt blocking faith',
        'Stork': 'Resistance to spiritual change',
        'Dog': 'Blind faith blocking discernment',
        'Tower': 'Spiritual isolation blocking connection',
        'Garden': 'External influences blocking inner work'
      },
      flow: {
        'Rider': 'Move forward on your spiritual path',
        'Clover': 'Trust in divine timing and grace',
        'Ship': 'Explore new spiritual horizons',
        'House': 'Build strong spiritual foundations',
        'Tree': 'Nurture steady spiritual growth',
        'Clouds': 'Trust the mystery of the spiritual journey',
        'Snake': 'Embrace spiritual transformation',
        'Coffin': 'Release what no longer serves your path',
        'Bouquet': 'Accept spiritual gifts and blessings',
        'Scythe': 'Make clear spiritual choices',
        'Whip': 'Maintain consistent spiritual practice',
        'Birds': 'Listen to spiritual guidance',
        'Child': 'Approach spirituality with fresh eyes',
        'Fox': 'Use spiritual discernment wisely',
        'Bear': 'Stand strong in your spiritual truth',
        'Stars': 'Follow your spiritual guidance',
        'Stork': 'Welcome spiritual transformation',
        'Dog': 'Stay loyal to your spiritual path',
        'Tower': 'Find strength in spiritual solitude',
        'Garden': 'Connect with spiritual community'
      }
    }
  };

  const drawCards = () => {
    if (!selectedTopic) {
      alert('Please select a topic first');
      return;
    }
    
    if (!question.trim()) {
      alert('Please enter a question');
      return;
    }
    
    // Create a copy of the deck to draw from
    const deck = [...lenormandCards];
    const drawnCards: Card[] = [];
    
    // Draw 3 random cards
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = deck.splice(randomIndex, 1)[0];
      drawnCards.push(card);
    }
    
    // Log the spread to journal
    const newEntry: JournalEntry = {
      date: new Date().toISOString(),
      question,
      topic: selectedTopic,
      cards: drawnCards,
      meanings: drawnCards.map((card, index) => getCardMeaning(card, index))
    };
    setJournal(prev => [newEntry, ...prev]);
    
    setCards(drawnCards);
    setRevealedCards([false, false, false]);
    setShowResults(true);
  };

  const revealCard = (index: number) => {
    setRevealedCards(prev => {
      const newRevealed = [...prev];
      newRevealed[index] = true;
      return newRevealed;
    });
  };

  const getCardMeaning = (card: Card | null, position: number): string => {
    if (!card || !selectedTopic) return '';
    
    // Map position index to position name
    const positionName: Position = position === 0 ? 'focus' : position === 1 ? 'block' : 'flow';
    
    // Get exact meaning from our database
    return exactMeanings[selectedTopic as TopicId][positionName][card.name] || 
      `${card.name} in ${positionName} position for ${selectedTopic}`;
  };

  const resetSpread = () => {
    setCards([null, null, null]);
    setShowResults(false);
  };

  const getPositionTitle = (position: number): string => {
    switch(position) {
      case 0: return 'Focus';
      case 1: return 'Block';
      case 2: return 'Flow';
      default: return '';
    }
  };

  const getPositionDescription = (position: number): string => {
    switch(position) {
      case 0: return 'What you need to concentrate on';
      case 1: return 'What is hindering your progress';
      case 2: return 'How to move forward effectively';
      default: return '';
    }
  };

  // Add new function to get card image path
  const getCardImagePath = (card: Card | null): string => {
    if (!card) return '';
    return `/assets/cards/${card.name}.jpg`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Three Card Lenormand Reading</h1>
      <p className="text-gray-600 text-center mb-8">
        Focus - Block - Flow: Understand what to focus on, what's blocking you, and how to move forward
      </p>

      {/* Topic Selection */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Select Your Topic</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {topics.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id as TopicId)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedTopic === topic.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      {/* Question Input */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Your Question</h2>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter your question..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={drawCards}
          disabled={!selectedTopic || !question}
          className={`px-6 py-3 rounded-lg font-semibold ${
            !selectedTopic || !question
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          Draw Cards
        </button>
        <button
          onClick={resetSpread}
          className="px-6 py-3 rounded-lg font-semibold bg-gray-200 hover:bg-gray-300"
        >
          New Reading
        </button>
      </div>

      {/* Cards Display */}
      {showResults && (
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {cards.map((card, index) => (
              <div
                key={index}
                className="flex flex-col items-center"
                onClick={() => revealCard(index)}
              >
                <h3 className="text-lg font-semibold mb-2">{getPositionTitle(index)}</h3>
                <p className="text-sm text-gray-600 mb-4">{getPositionDescription(index)}</p>
                <div className={`relative cursor-pointer transition-transform hover:scale-105 ${
                  revealedCards[index] ? '' : 'transform hover:shadow-xl'
                }`}>
                  {card && (
                    <>
                      <img
                        src={getCardImagePath(card)}
                        alt={card.name}
                        className="w-48 h-72 rounded-lg shadow-lg"
                      />
                      {!revealedCards[index] && (
                        <div className="absolute inset-0 bg-purple-900 bg-opacity-90 rounded-lg flex items-center justify-center text-white">
                          <p className="text-center p-4">Click to reveal</p>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {revealedCards[index] && card && (
                  <div className="mt-4 text-center">
                    <h4 className="font-semibold">{card.name}</h4>
                    <p className="text-sm text-gray-600 mt-2">{getCardMeaning(card, index)}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Journal Section */}
      {journal.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">Your Reading Journal</h2>
          <div className="space-y-6">
            {journal.map((entry, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <p className="text-sm text-gray-500">{entry.date}</p>
                <p className="font-semibold mt-2">{entry.topic}</p>
                <p className="text-gray-600 mt-1">{entry.question}</p>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {entry.cards.map((card, cardIndex) => (
                    <div key={cardIndex} className="flex items-center space-x-4">
                      <img
                        src={getCardImagePath(card)}
                        alt={card.name}
                        className="w-16 h-24 rounded shadow"
                      />
                      <div>
                        <p className="font-semibold">{card.name}</p>
                        <p className="text-sm text-gray-600">{entry.meanings[cardIndex]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Information Section */}
      <div className="mt-12 p-6 bg-gray-50 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">About the Focus-Block-Flow Spread</h2>
        <p className="text-gray-600">
          This three-card spread helps you understand:
          <br />- What to focus on (Card 1)
          <br />- What might be blocking you (Card 2)
          <br />- How to move forward (Card 3)
        </p>
      </div>
    </div>
  );
};

export default LenormandSpread; 