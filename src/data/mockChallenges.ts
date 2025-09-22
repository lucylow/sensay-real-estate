export interface Challenge {
  id: string;
  title: string;
  description: string;
  category: 'innovation' | 'analysis' | 'community' | 'research';
  prize: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'upcoming';
  participants: number;
  submissions: ChallengeSubmission[];
  judgePanel: string[];
  criteria: string[];
  sponsors: string[];
}

export interface ChallengeSubmission {
  id: string;
  userId: string;
  userName: string;
  title: string;
  description: string;
  votes: number;
  images?: string[];
  estimatedCost?: number;
  roi?: string;
  submittedAt: string;
  status: 'submitted' | 'reviewing' | 'winner' | 'finalist';
}

export const mockChallenges: Challenge[] = [
  {
    id: "challenge_001",
    title: "Coastal Defense Innovation Challenge",
    description: "Design and implement innovative coastal erosion protection solutions for residential properties facing sea level rise.",
    category: "innovation",
    prize: "$2,500 + Featured Article",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    status: "active",
    participants: 142,
    judgePanel: ["Dr. Emma Wilson - Coastal Engineer", "Prof. James Liu - Climate Scientist"],
    criteria: ["Innovation", "Feasibility", "Cost-effectiveness", "Environmental Impact"],
    sponsors: ["Coastal Protection Australia", "Green Building Council"],
    submissions: [
      {
        id: "sub_001",
        userId: "user_003",
        userName: "Emma Wilson",
        title: "Living Seawall System",
        description: "Bio-engineered seawall using native oyster reefs and mangrove plantings to create natural wave barriers while enhancing marine ecosystem.",
        votes: 89,
        images: ["/submissions/seawall_001.jpg"],
        estimatedCost: 45000,
        roi: "15-year payback through reduced insurance premiums",
        submittedAt: "2024-01-15T10:30:00Z",
        status: "finalist"
      },
      {
        id: "sub_002",
        userId: "user_002",
        userName: "Michael Chen",
        title: "Smart Dune Restoration",
        description: "AI-powered dune planting system with sensors that monitor sand movement and automatically deploy vegetation where needed.",
        votes: 67,
        images: ["/submissions/dune_002.jpg"],
        estimatedCost: 32000,
        roi: "10-year payback plus 25% property value increase",
        submittedAt: "2024-01-18T14:45:00Z",
        status: "submitted"
      },
      {
        id: "sub_003",
        userId: "user_001",
        userName: "Sarah Thompson",
        title: "Modular Wave Barriers",
        description: "Prefabricated modular barriers that can be quickly deployed and reconfigured based on storm predictions and tidal patterns.",
        votes: 78,
        estimatedCost: 28000,
        roi: "8-year payback through damage prevention",
        submittedAt: "2024-01-20T09:15:00Z",
        status: "submitted"
      }
    ]
  },
  
  {
    id: "challenge_002",
    title: "Bushfire Early Warning Systems",
    description: "Develop community-based early warning systems for bushfire detection and evacuation planning in high-risk areas.",
    category: "research",
    prize: "$1,800 + Research Grant Opportunity",
    startDate: "2023-12-01",
    endDate: "2024-01-15",
    status: "completed",
    participants: 95,
    judgePanel: ["Fire Chief Mark Stevens", "Dr. Lisa Roberts - Emergency Management"],
    criteria: ["Accuracy", "Speed", "Community Integration", "Cost"],
    sponsors: ["Australian Fire Services", "Emergency Management Australia"],
    submissions: [
      {
        id: "sub_004",
        userId: "user_004",
        userName: "James Martinez",
        title: "Community Fire Watch Network",
        description: "Distributed sensor network combined with community volunteer spotters using mobile app for real-time fire detection.",
        votes: 134,
        estimatedCost: 15000,
        roi: "Saves lives and property - invaluable",
        submittedAt: "2024-01-10T16:20:00Z",
        status: "winner"
      }
    ]
  },

  {
    id: "challenge_003",
    title: "Climate-Resilient Property Design",
    description: "Create architectural designs that can withstand extreme weather while maintaining energy efficiency and livability.",
    category: "innovation",
    prize: "$3,000 + Industry Partnership",
    startDate: "2024-02-01",
    endDate: "2024-03-15",
    status: "upcoming",
    participants: 0,
    judgePanel: ["Sarah Mitchell - Sustainable Architect", "Tom Anderson - Building Engineer"],
    criteria: ["Climate Adaptation", "Energy Efficiency", "Affordability", "Aesthetics"],
    sponsors: ["Sustainable Building Institute", "Climate Architects Australia"],
    submissions: []
  },

  {
    id: "challenge_004",
    title: "Flood Prediction Algorithm",
    description: "Develop machine learning algorithms to predict localized flooding based on rainfall, terrain, and urban drainage data.",
    category: "analysis",
    prize: "$2,200 + Data Science Mentorship",
    startDate: "2024-01-15",
    endDate: "2024-02-28",
    status: "active",
    participants: 78,
    judgePanel: ["Dr. Priya Patel - Data Scientist", "Prof. Alan Chen - Hydrology"],
    criteria: ["Accuracy", "Speed", "Data Efficiency", "Practical Implementation"],
    sponsors: ["Bureau of Meteorology", "Data Science Australia"],
    submissions: [
      {
        id: "sub_005",
        userId: "user_005",
        userName: "Dr. Priya Patel",
        title: "Urban Flood AI",
        description: "Deep learning model trained on 10 years of rainfall and flood data to predict street-level flooding 6 hours in advance.",
        votes: 56,
        submittedAt: "2024-01-22T11:30:00Z",
        status: "submitted"
      }
    ]
  }
];

export const getActiveChallenges = (): Challenge[] => {
  return mockChallenges.filter(challenge => challenge.status === 'active');
};

export const getCompletedChallenges = (): Challenge[] => {
  return mockChallenges.filter(challenge => challenge.status === 'completed');
};

export const getChallengeById = (id: string): Challenge | undefined => {
  return mockChallenges.find(challenge => challenge.id === id);
};

export const getTopSubmissions = (challengeId: string, limit: number = 3): ChallengeSubmission[] => {
  const challenge = getChallengeById(challengeId);
  if (!challenge) return [];
  
  return challenge.submissions
    .sort((a, b) => b.votes - a.votes)
    .slice(0, limit);
};

export const getUserSubmissions = (userId: string): ChallengeSubmission[] => {
  const allSubmissions: ChallengeSubmission[] = [];
  
  mockChallenges.forEach(challenge => {
    const userSubmissions = challenge.submissions.filter(sub => sub.userId === userId);
    allSubmissions.push(...userSubmissions);
  });
  
  return allSubmissions;
};