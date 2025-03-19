import React, { useState } from 'react';

const LenormandSpread = () => {
  const [cards, setCards] = useState([null, null, null]);
  const [question, setQuestion] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [showResults, setShowResults] = useState(false);

  const topics = [
    { id: 'health', name: 'Health' },
    { id: 'money', name: 'Money' },
    { id: 'relationships', name: 'Relationships' }
  ];

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
    // Note: The spreadsheet showed 20 cards, but a full Lenormand deck has 36 cards
    // More cards would be added here in a complete implementation
  ];

  // Exact meanings from the spreadsheet
  const exactMeanings = {
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
    const drawnCards = [];
    
    // Draw 3 random cards
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * deck.length);
      const card = deck.splice(randomIndex, 1)[0];
      drawnCards.push(card);
    }
    
    setCards(drawnCards);
    setShowResults(true);
  };

  const getCardMeaning = (card, position) => {
    if (!card || !selectedTopic) return '';
    
    // Map position index to position name
    const positionName = position === 0 ? 'focus' : position === 1 ? 'block' : 'flow';
    
    // Get exact meaning from our database
    return exactMeanings[selectedTopic][positionName][card.name] || 
      `${card.name} in ${positionName} position for ${selectedTopic}`;
  };

  const getCombinationMeaning = () => {
    if (cards.length !== 3 || cards.includes(null) || !selectedTopic) return '';
    
    // Create a synthesis based on the three card positions
    return `
      <p><strong>Focus:</strong> ${getCardMeaning(cards[0], 0)}</p>
      
      <p><strong>Block:</strong> ${getCardMeaning(cards[1], 1)}</p>
      
      <p><strong>Flow:</strong> ${getCardMeaning(cards[2], 2)}</p>
      
      <p><strong>Synthesis:</strong> For your ${selectedTopic} question, focus on ${getCardMeaning(cards[0], 0).toLowerCase()} 
      While being aware that ${getCardMeaning(cards[1], 1).toLowerCase()} 
      To move forward effectively, ${getCardMeaning(cards[2], 2).toLowerCase()}</p>
    `;
  };

  const resetSpread = () => {
    setCards([null, null, null]);
    setShowResults(false);
  };

  const getPositionTitle = (position) => {
    switch(position) {
      case 0: return 'Focus';
      case 1: return 'Block';
      case 2: return 'Flow';
      default: return '';
    }
  };

  const getPositionDescription = (position) => {
    switch(position) {
      case 0: return 'What you need to concentrate on';
      case 1: return 'What is hindering your progress';
      case 2: return 'How to move forward effectively';
      default: return '';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-2">Lenormand Focus-Block-Flow Spread</h1>
        <p className="text-gray-600 mb-6">Choose a topic, ask your question, and discover what to focus on, what's blocking you, and how to find flow</p>
        
        {/* Topic Selection */}
        <div className="mb-4">
          <div className="text-left mb-2 font-medium">Select a Topic:</div>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setSelectedTopic(topic.id)}
                className={`px-4 py-2 rounded-md ${
                  selectedTopic === topic.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {topic.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Question Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Enter your question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full max-w-md px-4 py-2 border rounded-md"
          />
        </div>
        
        {/* Action Buttons */}
        <button
          onClick={drawCards}
          disabled={!selectedTopic}
          className={`px-6 py-2 rounded-md mr-2 ${
            selectedTopic
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-400 text-white cursor-not-allowed'
          }`}
        >
          Draw Cards
        </button>
        
        {showResults && (
          <button
            onClick={resetSpread}
            className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
          >
            New Reading
          </button>
        )}
      </div>

      {/* Card Display */}
      {showResults ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Your {selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1)} Reading: {question}
          </h2>
          
          <div className="flex flex-wrap justify-center gap-6 mb-8">
            {cards.map((card, index) => (
              <div key={index} className="w-64 border rounded-lg overflow-hidden shadow-md bg-white">
                <div className={`p-4 text-center border-b ${
                  index === 0 ? 'bg-blue-100' : 
                  index === 1 ? 'bg-red-100' : 'bg-green-100'
                }`}>
                  <h3 className="font-bold text-lg">
                    {getPositionTitle(index)}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {getPositionDescription(index)}
                  </p>
                </div>
                <div className="p-4">
                  <div className="h-48 flex items-center justify-center bg-gray-50 mb-4 rounded border">
                    <div className="text-center">
                      <div className="text-3xl mb-2">{card.id}</div>
                      <div className="text-xl font-semibold">{card.name}</div>
                    </div>
                  </div>
                  <p className="font-medium">{getCardMeaning(card, index)}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Combination Interpretation */}
          <div className="bg-gray-50 p-6 rounded-lg border">
            <h3 className="text-lg font-semibold mb-3">Reading Synthesis</h3>
            <div dangerouslySetInnerHTML={{ __html: getCombinationMeaning() }}></div>
            
            <div className="mt-6 pt-4 border-t border-gray-200">
              <h4 className="font-medium mb-2">Reflection Questions:</h4>
              <ul className="list-disc pl-5 text-sm text-gray-700">
                <li>How can you actively implement the Focus guidance in your daily life?</li>
                <li>What practical steps can you take to address the Block?</li>
                <li>Which aspects of the Flow advice resonate most with your situation?</li>
                <li>How do these three cards create a story that relates to your question?</li>
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {[0, 1, 2].map((position) => (
            <div 
              key={position} 
              className={`w-64 h-64 border-2 border-dashed rounded-lg flex items-center justify-center ${
                position === 0 ? 'border-blue-300 bg-blue-50' : 
                position === 1 ? 'border-red-300 bg-red-50' : 
                'border-green-300 bg-green-50'
              }`}
            >
              <p className="text-gray-500 text-center">
                <span className="block text-lg font-medium mb-1">
                  {getPositionTitle(position)}
                </span>
                <span className="block text-sm">
                  {getPositionDescription(position)}
                </span>
              </p>
            </div>
          ))}
        </div>
      )}
      
      {/* Information Section */}
      {!showResults && (
        <div className="bg-gray-50 p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-3">About the Focus-Block-Flow Spread</h3>
          <p className="mb-4">
            This three-card spread provides practical guidance by revealing what deserves 
            your attention, what's creating obstacles, and how to move forward effectively.
            By selecting a specific topic area (Health, Money, or Relationships), you'll receive
            targeted insights for that domain of life.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded p-3 bg-blue-50 border-blue-100">
              <h4 className="font-medium">Focus</h4>
              <p className="text-sm text-gray-600">Where your energy and attention should be directed for optimal results.</p>
            </div>
            <div className="border rounded p-3 bg-red-50 border-red-100">
              <h4 className="font-medium">Block</h4>
              <p className="text-sm text-gray-600">Obstacles, challenges, or resistances that are impeding your progress.</p>
            </div>
            <div className="border rounded p-3 bg-green-50 border-green-100">
              <h4 className="font-medium">Flow</h4>
              <p className="text-sm text-gray-600">The path of least resistance and how to move forward harmoniously.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LenormandSpread;
