export interface CommunityMember {
  id: string;
  name: string;
  role: 'ambassador' | 'expert' | 'member' | 'moderator';
  title: string;
  company?: string;
  location: string;
  joinDate: string;
  points: number;
  level: number;
  achievements: string[];
  stats: {
    reportsSubmitted: number;
    reportsVerified: number;
    challengesWon: number;
    referralsGenerated: number;
    communityHelpful: number;
  };
  expertise: string[];
  avatar: string;
  verified: boolean;
  badges: string[];
}

export interface HazardReport {
  id: string;
  type: 'flood' | 'fire' | 'coastal' | 'cyclone' | 'earthquake' | 'subsidence';
  location: { lat: number; lng: number };
  address: string;
  description: string;
  severity: number; // 1-5
  reportedBy: string;
  reporterName: string;
  verifiedBy: string[];
  status: 'pending' | 'verified' | 'disputed' | 'resolved';
  createdAt: string;
  photos?: string[];
  impactRadius: number; // meters
  affectedProperties: number;
  emergencyServices?: string;
  weatherConditions?: {
    rainfall?: string;
    windSpeed?: string;
    tideLevel?: string;
    temperature?: string;
  };
}

export const mockCommunityMembers: CommunityMember[] = [
  {
    id: "user_001",
    name: "Sarah Thompson",
    role: "ambassador",
    title: "Senior Mortgage Broker",
    company: "Thompson Finance Group",
    location: "Melbourne, VIC",
    joinDate: "2023-08-15",
    points: 4250,
    level: 8,
    achievements: [
      "Top Contributor 2023", "Risk Assessment Expert", 
      "Community Mentor", "APRA Compliance Specialist"
    ],
    stats: {
      reportsSubmitted: 47,
      reportsVerified: 156,
      challengesWon: 3,
      referralsGenerated: 23,
      communityHelpful: 89
    },
    expertise: ["Commercial Lending", "Climate Risk", "APRA Compliance"],
    avatar: "/avatars/sarah_t.jpg",
    verified: true,
    badges: ["Expert", "Mentor", "Top Performer"]
  },
  {
    id: "user_002",
    name: "Michael Chen",
    role: "expert",
    title: "Climate Risk Analyst",
    company: "Australian Climate Solutions",
    location: "Sydney, NSW",
    joinDate: "2023-09-22",
    points: 3850,
    level: 7,
    achievements: [
      "Flood Prediction Master", "Early Warning Hero", "Data Science Champion"
    ],
    stats: {
      reportsSubmitted: 62,
      reportsVerified: 134,
      challengesWon: 2,
      referralsGenerated: 18,
      communityHelpful: 76
    },
    expertise: ["Flood Analysis", "Climate Modeling", "Emergency Response"],
    avatar: "/avatars/michael_c.jpg",
    verified: true,
    badges: ["Climate Expert", "Verified Professional"]
  },
  {
    id: "user_003",
    name: "Emma Wilson",
    role: "expert",
    title: "Coastal Engineer",
    company: "Coastal Protection Australia",
    location: "Gold Coast, QLD",
    joinDate: "2023-10-05",
    points: 3200,
    level: 6,
    achievements: [
      "Coastal Defense Innovator", "Engineering Excellence", "Community Builder"
    ],
    stats: {
      reportsSubmitted: 34,
      reportsVerified: 98,
      challengesWon: 5,
      referralsGenerated: 31,
      communityHelpful: 92
    },
    expertise: ["Coastal Engineering", "Sea Level Rise", "Infrastructure Design"],
    avatar: "/avatars/emma_w.jpg",
    verified: true,
    badges: ["Engineering Expert", "Innovation Leader"]
  },
  {
    id: "user_004",
    name: "James Martinez",
    role: "member",
    title: "Property Investor",
    location: "Perth, WA",
    joinDate: "2023-11-12",
    points: 1450,
    level: 4,
    achievements: [
      "First Property Analyzed", "Community Supporter"
    ],
    stats: {
      reportsSubmitted: 8,
      reportsVerified: 23,
      challengesWon: 0,
      referralsGenerated: 5,
      communityHelpful: 34
    },
    expertise: ["Investment Analysis", "Market Trends"],
    avatar: "/avatars/james_m.jpg",
    verified: false,
    badges: ["Active Member"]
  },
  {
    id: "user_005",
    name: "Dr. Priya Patel",
    role: "expert",
    title: "Insurance Risk Manager",
    company: "Australian Risk Insurance",
    location: "Adelaide, SA",
    joinDate: "2023-07-30",
    points: 4100,
    level: 8,
    achievements: [
      "Insurance Innovation Award", "Risk Mitigation Specialist", "Top Reviewer"
    ],
    stats: {
      reportsSubmitted: 41,
      reportsVerified: 178,
      challengesWon: 1,
      referralsGenerated: 29,
      communityHelpful: 95
    },
    expertise: ["Insurance Risk", "Actuarial Analysis", "Catastrophe Modeling"],
    avatar: "/avatars/priya_p.jpg",
    verified: true,
    badges: ["Insurance Expert", "Trusted Advisor"]
  }
];

export const mockHazardReports: HazardReport[] = [
  {
    id: "hazard_001",
    type: "flood",
    location: { lat: -33.8688, lng: 151.2093 },
    address: "Near Circular Quay, Sydney NSW",
    description: "King tide flooding observed during recent storm. Water reached 30cm above normal high tide mark.",
    severity: 4,
    reportedBy: "user_002",
    reporterName: "Michael Chen",
    verifiedBy: ["user_001", "user_003"],
    status: "verified",
    createdAt: "2024-01-08T14:30:00Z",
    photos: ["/hazards/flood_001_1.jpg", "/hazards/flood_001_2.jpg"],
    impactRadius: 500,
    affectedProperties: 23,
    emergencyServices: "contacted",
    weatherConditions: {
      rainfall: "45mm in 2 hours",
      windSpeed: "65 km/h",
      tideLevel: "1.8m above LAT"
    }
  },
  {
    id: "hazard_002",
    type: "fire",
    location: { lat: -37.7749, lng: 144.9624 },
    address: "Dandenong Ranges, Melbourne VIC",
    description: "Bushfire risk elevated due to extreme heat and dry conditions. Spotting observed 2km ahead of main fire front.",
    severity: 5,
    reportedBy: "user_001",
    reporterName: "Sarah Thompson",
    verifiedBy: ["user_002", "user_005"],
    status: "verified",
    createdAt: "2024-01-10T08:45:00Z",
    photos: ["/hazards/fire_002_1.jpg"],
    impactRadius: 2000,
    affectedProperties: 156,
    emergencyServices: "evacuations_ordered",
    weatherConditions: {
      temperature: "42°C",
      windSpeed: "85 km/h",
      rainfall: "0mm (drought conditions)"
    }
  },
  {
    id: "hazard_003",
    type: "coastal",
    location: { lat: -33.8915, lng: 151.2767 },
    address: "Bondi Beach, Sydney NSW",
    description: "Significant coastal erosion observed after severe storm. Beach access compromised, cliff face showing instability.",
    severity: 3,
    reportedBy: "user_003",
    reporterName: "Emma Wilson",
    verifiedBy: ["user_001"],
    status: "verified",
    createdAt: "2024-01-12T16:20:00Z",
    photos: ["/hazards/coastal_003_1.jpg", "/hazards/coastal_003_2.jpg"],
    impactRadius: 300,
    affectedProperties: 8,
    weatherConditions: {
      windSpeed: "95 km/h",
      tideLevel: "2.1m above LAT",
      rainfall: "78mm in 6 hours"
    }
  },
  {
    id: "hazard_004",
    type: "cyclone",
    location: { lat: -12.4634, lng: 130.8456 },
    address: "Darwin, NT",
    description: "Category 2 cyclone approaching. Residents advised to prepare for destructive winds and flooding.",
    severity: 4,
    reportedBy: "user_004",
    reporterName: "James Martinez",
    verifiedBy: [],
    status: "pending",
    createdAt: "2024-01-15T12:00:00Z",
    impactRadius: 5000,
    affectedProperties: 450,
    emergencyServices: "warnings_issued",
    weatherConditions: {
      windSpeed: "120 km/h (sustained)",
      rainfall: "Expected 200-400mm"
    }
  }
];

export const getCommunityMember = (id: string): CommunityMember | undefined => {
  return mockCommunityMembers.find(member => member.id === id);
};

export const getTopContributors = (limit: number = 5): CommunityMember[] => {
  return mockCommunityMembers
    .sort((a, b) => b.points - a.points)
    .slice(0, limit);
};

export const getHazardReportsByLocation = (lat: number, lng: number, radiusKm: number = 10): HazardReport[] => {
  return mockHazardReports.filter(report => {
    const distance = Math.sqrt(
      Math.pow(report.location.lat - lat, 2) + 
      Math.pow(report.location.lng - lng, 2)
    ) * 111; // Rough km conversion
    return distance <= radiusKm;
  });
};

export const getRecentHazardReports = (limit: number = 10): HazardReport[] => {
  return mockHazardReports
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, limit);
};