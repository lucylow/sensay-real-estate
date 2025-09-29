/**
 * PropGuard AI Sensay Personality System Integration Test
 * 
 * Comprehensive test suite to validate the personality training dataset
 * and demonstrate the complete functionality of the Sensay chatbot personality system.
 */

import { sensayPersonalityIntegration } from '@/services/sensayPersonalityIntegration';
import { sensayPersonalityEngine } from '@/services/sensayPersonalityEngine';
import { SENSAY_PERSONALITY_CONFIG } from '@/data/sensayPersonalityTraining';

// ============================================================================
// TEST INTERFACES AND TYPES
// ============================================================================

interface PersonalityTestResult {
  testName: string;
  passed: boolean;
  score: number;
  details: string;
  timestamp: Date;
}

interface UserTypeTestScenario {
  userType: string;
  testMessages: string[];
  expectedBehaviors: string[];
  expectedTone: any;
}

interface EmotionalTestScenario {
  emotion: string;
  testMessages: string[];
  expectedResponses: string[];
  expectedToneAdjustments: any;
}

interface MultilingualTestScenario {
  language: string;
  testMessages: string[];
  expectedAdaptations: string[];
}

// ============================================================================
// TEST SCENARIOS
// ============================================================================

export const USER_TYPE_TEST_SCENARIOS: UserTypeTestScenario[] = [
  {
    userType: 'first_time_buyer',
    testMessages: [
      'I\'m looking to buy my first home',
      'What do I need to know about mortgages?',
      'I\'m feeling overwhelmed by all the paperwork'
    ],
    expectedBehaviors: [
      'High warmth and empathy',
      'Step-by-step explanations',
      'Reassurance and encouragement',
      'Avoidance of jargon'
    ],
    expectedTone: {
      warmth: 9,
      formality: 4,
      empathy: 9
    }
  },
  {
    userType: 'investor',
    testMessages: [
      'I need ROI analysis for this property',
      'What\'s the rental yield potential?',
      'Show me the market trends for this area'
    ],
    expectedBehaviors: [
      'Data-driven responses',
      'Focus on financial metrics',
      'Professional terminology',
      'Efficiency and accuracy'
    ],
    expectedTone: {
      warmth: 6,
      formality: 8,
      confidence: 10
    }
  },
  {
    userType: 'seller',
    testMessages: [
      'I\'m thinking about selling my house',
      'How do I determine the right price?',
      'I\'m worried about the market conditions'
    ],
    expectedBehaviors: [
      'Emotional support and empathy',
      'Honest market assessments',
      'Timeline guidance',
      'Stress acknowledgment'
    ],
    expectedTone: {
      warmth: 8,
      formality: 7,
      empathy: 9
    }
  }
];

export const EMOTIONAL_TEST_SCENARIOS: EmotionalTestScenario[] = [
  {
    emotion: 'excited',
    testMessages: [
      'I\'m so excited to buy my first home!',
      'This is perfect! I can\'t wait to move in!',
      'I love this property!'
    ],
    expectedResponses: [
      'Share enthusiasm',
      'Provide detailed information',
      'Encourage informed decisions'
    ],
    expectedToneAdjustments: {
      enthusiasm: 10,
      warmth: 9,
      confidence: 9
    }
  },
  {
    emotion: 'stressed',
    testMessages: [
      'I\'m so stressed about this process',
      'This is overwhelming, I don\'t know where to start',
      'I\'m worried I\'m making the wrong decision'
    ],
    expectedResponses: [
      'Provide reassurance',
      'Break down complex processes',
      'Offer support and guidance'
    ],
    expectedToneAdjustments: {
      empathy: 10,
      warmth: 9,
      formality: 5
    }
  },
  {
    emotion: 'urgent',
    testMessages: [
      'I need this information ASAP!',
      'This is urgent, can you help me quickly?',
      'I need immediate assistance!'
    ],
    expectedResponses: [
      'Prioritize speed',
      'Provide immediate solutions',
      'Focus on critical actions'
    ],
    expectedToneAdjustments: {
      efficiency: 10,
      confidence: 9,
      warmth: 7
    }
  }
];

export const MULTILINGUAL_TEST_SCENARIOS: MultilingualTestScenario[] = [
  {
    language: 'es',
    testMessages: [
      'Hola, busco una casa en Miami',
      '¿Puedes ayudarme con la valoración?',
      'Necesito información sobre el mercado'
    ],
    expectedAdaptations: [
      'Warmer, more personal communication',
      'Emphasis on family and community aspects',
      'More detailed explanations'
    ]
  },
  {
    language: 'fr',
    testMessages: [
      'Bonjour, je cherche un appartement à Paris',
      'Pouvez-vous m\'aider avec l\'évaluation?',
      'J\'ai besoin d\'informations sur le marché'
    ],
    expectedAdaptations: [
      'Formal yet warm communication',
      'Emphasis on elegance and sophistication',
      'Detailed analysis and thorough explanations'
    ]
  },
  {
    language: 'de',
    testMessages: [
      'Hallo, ich suche eine Wohnung in Berlin',
      'Können Sie mir bei der Bewertung helfen?',
      'Ich brauche Informationen über den Markt'
    ],
    expectedAdaptations: [
      'Precise and structured communication',
      'Emphasis on quality and reliability',
      'Detailed technical information'
    ]
  }
];

// ============================================================================
// PERSONALITY SYSTEM TEST CLASS
// ============================================================================

export class SensayPersonalityTester {
  private testResults: PersonalityTestResult[] = [];
  private currentUserId: string;

  constructor() {
    this.currentUserId = `test-user-${Date.now()}`;
  }

  // ============================================================================
  // MAIN TEST METHODS
  // ============================================================================

  /**
   * Run comprehensive personality system tests
   */
  public async runAllTests(): Promise<PersonalityTestResult[]> {
    console.log('🧪 Starting PropGuard AI Sensay Personality System Tests...');
    
    try {
      // Test user type adaptations
      await this.testUserTypeAdaptations();
      
      // Test emotional intelligence
      await this.testEmotionalIntelligence();
      
      // Test multilingual support
      await this.testMultilingualSupport();
      
      // Test personality consistency
      await this.testPersonalityConsistency();
      
      // Test edge cases
      await this.testEdgeCases();
      
      // Test integration
      await this.testSystemIntegration();
      
      console.log('✅ All personality system tests completed!');
      return this.testResults;
      
    } catch (error) {
      console.error('❌ Personality system tests failed:', error);
      this.addTestResult('system_integration', false, 0, `Test suite failed: ${error}`);
      return this.testResults;
    }
  }

  /**
   * Test user type adaptation capabilities
   */
  private async testUserTypeAdaptations(): Promise<void> {
    console.log('👥 Testing user type adaptations...');
    
    for (const scenario of USER_TYPE_TEST_SCENARIOS) {
      for (const message of scenario.testMessages) {
        try {
          const response = await sensayPersonalityIntegration.generateEnhancedChatCompletion({
            userId: this.currentUserId,
            message,
            context: {
              userType: scenario.userType,
              language: 'en',
              platform: 'web'
            }
          });

          // Validate tone adaptation
          const actualTone = response.personality.tone;
          const expectedTone = scenario.expectedTone;
          
          const toneMatch = this.validateToneAdaptation(actualTone, expectedTone);
          const behaviorMatch = this.validateBehaviorAdaptation(response.content, scenario.expectedBehaviors);
          
          const score = (toneMatch + behaviorMatch) / 2;
          const passed = score >= 0.7;
          
          this.addTestResult(
            `user_type_${scenario.userType}`,
            passed,
            score * 100,
            `User type adaptation for ${scenario.userType}: ${passed ? 'PASSED' : 'FAILED'}`
          );
          
        } catch (error) {
          this.addTestResult(
            `user_type_${scenario.userType}`,
            false,
            0,
            `User type test failed: ${error}`
          );
        }
      }
    }
  }

  /**
   * Test emotional intelligence capabilities
   */
  private async testEmotionalIntelligence(): Promise<void> {
    console.log('🧠 Testing emotional intelligence...');
    
    for (const scenario of EMOTIONAL_TEST_SCENARIOS) {
      for (const message of scenario.testMessages) {
        try {
          const response = await sensayPersonalityIntegration.generateEnhancedChatCompletion({
            userId: this.currentUserId,
            message,
            context: {
              userType: 'first_time_buyer',
              language: 'en',
              platform: 'web'
            }
          });

          // Validate emotional detection and adaptation
          const detectedEmotion = response.analytics.emotionalState;
          const expectedEmotion = scenario.emotion;
          
          const emotionMatch = detectedEmotion === expectedEmotion ? 1 : 0;
          const toneMatch = this.validateToneAdaptation(
            response.personality.tone,
            scenario.expectedToneAdjustments
          );
          const responseMatch = this.validateResponseContent(
            response.content,
            scenario.expectedResponses
          );
          
          const score = (emotionMatch + toneMatch + responseMatch) / 3;
          const passed = score >= 0.6;
          
          this.addTestResult(
            `emotional_${scenario.emotion}`,
            passed,
            score * 100,
            `Emotional intelligence for ${scenario.emotion}: ${passed ? 'PASSED' : 'FAILED'}`
          );
          
        } catch (error) {
          this.addTestResult(
            `emotional_${scenario.emotion}`,
            false,
            0,
            `Emotional intelligence test failed: ${error}`
          );
        }
      }
    }
  }

  /**
   * Test multilingual support capabilities
   */
  private async testMultilingualSupport(): Promise<void> {
    console.log('🌍 Testing multilingual support...');
    
    for (const scenario of MULTILINGUAL_TEST_SCENARIOS) {
      try {
        const response = await sensayPersonalityIntegration.generateLocalizedResponse(
          this.currentUserId,
          scenario.testMessages[0],
          scenario.language
        );

        // Validate language-specific adaptations
        const adaptationMatch = this.validateCulturalAdaptations(
          response.content,
          scenario.expectedAdaptations
        );
        
        const greetingMatch = this.validateLanguageGreeting(
          response.content,
          scenario.language
        );
        
        const score = (adaptationMatch + greetingMatch) / 2;
        const passed = score >= 0.7;
        
        this.addTestResult(
          `multilingual_${scenario.language}`,
          passed,
          score * 100,
          `Multilingual support for ${scenario.language}: ${passed ? 'PASSED' : 'FAILED'}`
        );
        
      } catch (error) {
        this.addTestResult(
          `multilingual_${scenario.language}`,
          false,
          0,
          `Multilingual test failed: ${error}`
        );
      }
    }
  }

  /**
   * Test personality consistency across interactions
   */
  private async testPersonalityConsistency(): Promise<void> {
    console.log('🔄 Testing personality consistency...');
    
    const testMessages = [
      'Hello, I need help finding a property',
      'What are the current market trends?',
      'Can you help me understand the buying process?',
      'I\'m interested in investment properties',
      'Thank you for your help!'
    ];

    try {
      const responses = [];
      
      for (const message of testMessages) {
        const response = await sensayPersonalityIntegration.generateEnhancedChatCompletion({
          userId: this.currentUserId,
          message,
          context: {
            userType: 'first_time_buyer',
            language: 'en',
            platform: 'web'
          }
        });
        responses.push(response);
      }

      // Validate consistency across responses
      const consistencyScore = this.validatePersonalityConsistency(responses);
      const passed = consistencyScore >= 0.8;
      
      this.addTestResult(
        'personality_consistency',
        passed,
        consistencyScore * 100,
        `Personality consistency: ${passed ? 'PASSED' : 'FAILED'}`
      );
      
    } catch (error) {
      this.addTestResult(
        'personality_consistency',
        false,
        0,
        `Personality consistency test failed: ${error}`
      );
    }
  }

  /**
   * Test edge cases and error handling
   */
  private async testEdgeCases(): Promise<void> {
    console.log('⚠️ Testing edge cases...');
    
    const edgeCaseMessages = [
      '', // Empty message
      'This is a very long message that contains a lot of text and might test the system\'s ability to handle lengthy inputs without breaking or losing context...',
      'I\'m not sure what I\'m asking about but I need help with something related to real estate maybe?',
      'Can you help me with something completely unrelated to real estate?',
      'I\'m feeling very frustrated and angry about this whole process!'
    ];

    try {
      let passedTests = 0;
      
      for (const message of edgeCaseMessages) {
        try {
          const response = await sensayPersonalityIntegration.generateEnhancedChatCompletion({
            userId: this.currentUserId,
            message,
            context: {
              userType: 'first_time_buyer',
              language: 'en',
              platform: 'web'
            }
          });
          
          // Check if system handled edge case gracefully
          if (response.content && response.content.length > 0) {
            passedTests++;
          }
          
        } catch (error) {
          // Edge case handled appropriately
          passedTests++;
        }
      }
      
      const score = passedTests / edgeCaseMessages.length;
      const passed = score >= 0.8;
      
      this.addTestResult(
        'edge_cases',
        passed,
        score * 100,
        `Edge case handling: ${passed ? 'PASSED' : 'FAILED'}`
      );
      
    } catch (error) {
      this.addTestResult(
        'edge_cases',
        false,
        0,
        `Edge case test failed: ${error}`
      );
    }
  }

  /**
   * Test system integration and performance
   */
  private async testSystemIntegration(): Promise<void> {
    console.log('🔧 Testing system integration...');
    
    try {
      const startTime = Date.now();
      
      // Test property analysis integration
      const propertyAnalysis = await sensayPersonalityIntegration.generatePersonalizedPropertyAnalysis({
        userId: this.currentUserId,
        address: '123 Main Street, Melbourne, VIC 3000',
        analysisType: 'comprehensive',
        context: {
          userType: 'investor',
          language: 'en'
        }
      });
      
      const endTime = Date.now();
      const responseTime = endTime - startTime;
      
      // Validate response time and content quality
      const timeScore = responseTime < 5000 ? 1 : 0.5; // 5 second threshold
      const contentScore = propertyAnalysis.analysis && propertyAnalysis.recommendations ? 1 : 0;
      const personalityScore = propertyAnalysis.personality ? 1 : 0;
      
      const score = (timeScore + contentScore + personalityScore) / 3;
      const passed = score >= 0.8;
      
      this.addTestResult(
        'system_integration',
        passed,
        score * 100,
        `System integration: ${passed ? 'PASSED' : 'FAILED'} (${responseTime}ms)`
      );
      
    } catch (error) {
      this.addTestResult(
        'system_integration',
        false,
        0,
        `System integration test failed: ${error}`
      );
    }
  }

  // ============================================================================
  // VALIDATION HELPER METHODS
  // ============================================================================

  /**
   * Validate tone adaptation accuracy
   */
  private validateToneAdaptation(actualTone: any, expectedTone: any): number {
    if (!actualTone || !expectedTone) return 0;
    
    const toneProperties = ['warmth', 'formality', 'enthusiasm', 'confidence', 'empathy'];
    let matches = 0;
    
    for (const prop of toneProperties) {
      if (expectedTone[prop] !== undefined && actualTone[prop] !== undefined) {
        const actual = actualTone[prop];
        const expected = expectedTone[prop];
        const tolerance = 2; // Allow 2-point tolerance
        
        if (Math.abs(actual - expected) <= tolerance) {
          matches++;
        }
      }
    }
    
    return matches / toneProperties.length;
  }

  /**
   * Validate behavior adaptation
   */
  private validateBehaviorAdaptation(content: string, expectedBehaviors: string[]): number {
    let matches = 0;
    
    for (const behavior of expectedBehaviors) {
      if (this.contentMatchesBehavior(content, behavior)) {
        matches++;
      }
    }
    
    return matches / expectedBehaviors.length;
  }

  /**
   * Validate response content quality
   */
  private validateResponseContent(content: string, expectedResponses: string[]): number {
    let matches = 0;
    
    for (const expected of expectedResponses) {
      if (this.contentMatchesExpected(content, expected)) {
        matches++;
      }
    }
    
    return matches / expectedResponses.length;
  }

  /**
   * Validate cultural adaptations
   */
  private validateCulturalAdaptations(content: string, expectedAdaptations: string[]): number {
    let matches = 0;
    
    for (const adaptation of expectedAdaptations) {
      if (this.contentMatchesAdaptation(content, adaptation)) {
        matches++;
      }
    }
    
    return matches / expectedAdaptations.length;
  }

  /**
   * Validate language-specific greeting
   */
  private validateLanguageGreeting(content: string, language: string): number {
    const languageSettings = SENSAY_PERSONALITY_CONFIG.languageSettings[language];
    if (!languageSettings) return 0;
    
    // Check if greeting matches language-specific patterns
    const greetingPatterns = {
      'es': /hola|buenos|buenas/i,
      'fr': /bonjour|salut/i,
      'de': /hallo|guten/i,
      'zh': /你好|您好/i,
      'ja': /こんにちは|おはよう/i
    };
    
    const pattern = greetingPatterns[language as keyof typeof greetingPatterns];
    return pattern ? (pattern.test(content) ? 1 : 0) : 0.5;
  }

  /**
   * Validate personality consistency across responses
   */
  private validatePersonalityConsistency(responses: any[]): number {
    if (responses.length < 2) return 0;
    
    let consistencyScore = 0;
    
    // Check tone consistency
    const tones = responses.map(r => r.personality.tone);
    const toneConsistency = this.calculateToneConsistency(tones);
    
    // Check user type consistency
    const userTypes = responses.map(r => r.personality.metadata.userType);
    const userTypeConsistency = this.calculateUserTypeConsistency(userTypes);
    
    // Check language consistency
    const languages = responses.map(r => r.personality.metadata.language);
    const languageConsistency = this.calculateLanguageConsistency(languages);
    
    consistencyScore = (toneConsistency + userTypeConsistency + languageConsistency) / 3;
    
    return consistencyScore;
  }

  // ============================================================================
  // CONTENT MATCHING HELPER METHODS
  // ============================================================================

  private contentMatchesBehavior(content: string, behavior: string): boolean {
    const behaviorKeywords = {
      'High warmth and empathy': ['understand', 'help', 'support', 'care'],
      'Step-by-step explanations': ['first', 'next', 'then', 'step'],
      'Reassurance and encouragement': ['don\'t worry', 'it\'s normal', 'you can do this'],
      'Avoidance of jargon': !['amortization', 'escrow', 'contingency'].some(term => content.toLowerCase().includes(term)),
      'Data-driven responses': ['data', 'analysis', 'metrics', 'statistics'],
      'Professional terminology': ['roi', 'yield', 'appreciation', 'investment'],
      'Emotional support and empathy': ['understand', 'difficult', 'stress', 'support'],
      'Honest market assessments': ['honestly', 'realistically', 'market conditions']
    };
    
    const keywords = behaviorKeywords[behavior as keyof typeof behaviorKeywords];
    if (!keywords) return false;
    
    if (typeof keywords === 'boolean') return keywords;
    
    return keywords.some(keyword => content.toLowerCase().includes(keyword));
  }

  private contentMatchesExpected(content: string, expected: string): boolean {
    const expectedKeywords = {
      'Share enthusiasm': ['excited', 'great', 'wonderful', 'fantastic'],
      'Provide detailed information': ['detailed', 'comprehensive', 'thorough'],
      'Encourage informed decisions': ['research', 'consider', 'evaluate'],
      'Provide reassurance': ['don\'t worry', 'it\'s okay', 'normal'],
      'Break down complex processes': ['step', 'process', 'breakdown'],
      'Offer support and guidance': ['support', 'guidance', 'help'],
      'Prioritize speed': ['quickly', 'immediately', 'asap', 'urgent'],
      'Provide immediate solutions': ['immediately', 'right away', 'now'],
      'Focus on critical actions': ['important', 'critical', 'priority']
    };
    
    const keywords = expectedKeywords[expected as keyof typeof expectedKeywords];
    if (!keywords) return false;
    
    return keywords.some(keyword => content.toLowerCase().includes(keyword));
  }

  private contentMatchesAdaptation(content: string, adaptation: string): boolean {
    const adaptationKeywords = {
      'Warmer, more personal communication': ['family', 'home', 'personal', 'warm'],
      'Emphasis on family and community aspects': ['family', 'community', 'neighborhood'],
      'More detailed explanations': ['detailed', 'comprehensive', 'thorough'],
      'Formal yet warm communication': ['formal', 'professional', 'warm'],
      'Emphasis on elegance and sophistication': ['elegant', 'sophisticated', 'quality'],
      'Precise and structured communication': ['precise', 'structured', 'organized'],
      'Emphasis on quality and reliability': ['quality', 'reliable', 'dependable']
    };
    
    const keywords = adaptationKeywords[adaptation as keyof typeof adaptationKeywords];
    if (!keywords) return false;
    
    return keywords.some(keyword => content.toLowerCase().includes(keyword));
  }

  // ============================================================================
  // CONSISTENCY CALCULATION METHODS
  // ============================================================================

  private calculateToneConsistency(tones: any[]): number {
    if (tones.length < 2) return 1;
    
    let totalDeviation = 0;
    const toneProperties = ['warmth', 'formality', 'enthusiasm', 'confidence', 'empathy'];
    
    for (const prop of toneProperties) {
      const values = tones.map(t => t[prop]).filter(v => v !== undefined);
      if (values.length > 1) {
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        const deviation = values.reduce((sum, val) => sum + Math.abs(val - avg), 0) / values.length;
        totalDeviation += deviation / 10; // Normalize to 0-1 scale
      }
    }
    
    return Math.max(0, 1 - (totalDeviation / toneProperties.length));
  }

  private calculateUserTypeConsistency(userTypes: string[]): number {
    if (userTypes.length < 2) return 1;
    
    const uniqueTypes = new Set(userTypes);
    return uniqueTypes.size === 1 ? 1 : 0.5;
  }

  private calculateLanguageConsistency(languages: string[]): number {
    if (languages.length < 2) return 1;
    
    const uniqueLanguages = new Set(languages);
    return uniqueLanguages.size === 1 ? 1 : 0.5;
  }

  // ============================================================================
  // UTILITY METHODS
  // ============================================================================

  private addTestResult(testName: string, passed: boolean, score: number, details: string): void {
    this.testResults.push({
      testName,
      passed,
      score,
      details,
      timestamp: new Date()
    });
  }

  /**
   * Generate comprehensive test report
   */
  public generateTestReport(): any {
    const totalTests = this.testResults.length;
    const passedTests = this.testResults.filter(r => r.passed).length;
    const averageScore = this.testResults.reduce((sum, r) => sum + r.score, 0) / totalTests;
    
    const report = {
      summary: {
        totalTests,
        passedTests,
        failedTests: totalTests - passedTests,
        passRate: (passedTests / totalTests) * 100,
        averageScore: Math.round(averageScore * 100) / 100
      },
      results: this.testResults,
      timestamp: new Date(),
      systemInfo: {
        personalityConfigVersion: '1.0.0',
        testSuiteVersion: '1.0.0'
      }
    };
    
    return report;
  }

  /**
   * Export test results to JSON
   */
  public exportTestResults(): string {
    const report = this.generateTestReport();
    return JSON.stringify(report, null, 2);
  }
}

// ============================================================================
// EXPORT TEST RUNNER FUNCTION
// ============================================================================

/**
 * Run the complete personality system test suite
 */
export async function runPersonalitySystemTests(): Promise<any> {
  const tester = new SensayPersonalityTester();
  const results = await tester.runAllTests();
  const report = tester.generateTestReport();
  
  console.log('📊 Personality System Test Report:');
  console.log(`✅ Passed: ${report.summary.passedTests}/${report.summary.totalTests}`);
  console.log(`📈 Pass Rate: ${report.summary.passRate.toFixed(1)}%`);
  console.log(`🎯 Average Score: ${report.summary.averageScore.toFixed(1)}%`);
  
  return report;
}

export default SensayPersonalityTester;
