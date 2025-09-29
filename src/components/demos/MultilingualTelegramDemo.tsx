import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Globe, 
  Home, 
  Calendar, 
  Video,
  Star,
  MapPin,
  DollarSign,
  Bed,
  Bath,
  Car,
  Phone,
  Heart
} from 'lucide-react';

interface TelegramConversation {
  id: string;
  language: string;
  messages: Array<{
    id: string;
    sender: 'user' | 'bot';
    message: string;
    timestamp: string;
    type?: 'property_card' | 'quick_reply' | 'image';
    data?: any;
  }>;
}

export const MultilingualTelegramDemo: React.FC = () => {
  const [activeLanguage, setActiveLanguage] = useState<'spanish' | 'english' | 'chinese' | 'french'>('spanish');
  const [currentStep, setCurrentStep] = useState<number>(0);

  const conversations: Record<string, TelegramConversation> = {
    spanish: {
      id: 'telegram_spanish',
      language: 'Spanish',
      messages: [
        {
          id: '1',
          sender: 'user',
          message: 'Hola, estoy buscando casas en Madrid con 3 habitaciones',
          timestamp: '2:15 PM'
        },
        {
          id: '2',
          sender: 'bot',
          message: '¡Hola! Tengo 4 propiedades disponibles que coinciden con tu búsqueda. ¿Quieres ver los detalles o programar una visita virtual?',
          timestamp: '2:15 PM',
          type: 'quick_reply',
          data: ['Ver detalles', 'Visita virtual', 'Guardar búsqueda', 'Cambiar filtros']
        },
        {
          id: '3',
          sender: 'user',
          message: 'Programar una visita virtual, por favor',
          timestamp: '2:16 PM'
        },
        {
          id: '4',
          sender: 'bot',
          message: 'Perfecto. ¿Qué día y hora prefieres?',
          timestamp: '2:16 PM',
          type: 'quick_reply',
          data: ['Mañana', 'Este fin de semana', 'Próxima semana', 'Más opciones']
        },
        {
          id: '5',
          sender: 'user',
          message: 'Mañana',
          timestamp: '2:17 PM'
        },
        {
          id: '6',
          sender: 'bot',
          message: 'Excelente! Disponibilidad para mañana:\n\n⏰ Horarios:\n• 9:00 AM\n• 11:00 AM\n• 2:00 PM\n• 4:00 PM\n\n¿Cuál prefieres?',
          timestamp: '2:17 PM',
          type: 'quick_reply',
          data: ['9:00 AM', '11:00 AM', '2:00 PM', '4:00 PM']
        },
        {
          id: '7',
          sender: 'user',
          message: '2:00 PM',
          timestamp: '2:18 PM'
        },
        {
          id: '8',
          sender: 'bot',
          message: '¡Confirmado! 🎉\n\n📅 Cita: Mañana 2:00 PM\n📍 Ubicación: Calle Alcalá 123, Madrid\n👤 Agente: Carmen Ruiz\n📱 Teléfono: +34 666 123 456\n\n🏠 Propiedades incluidas:\n• Casa colonial reformada (€485K)\n• Piso moderno con vistas (€650K)\n• Villa con jardín (€789K)\n\nRecibirás el enlace de Zoom 1 hora antes de la cita. ¡Nos vemos mañana! 🏠✨',
          timestamp: '2:18 PM'
        }
      ]
    },
    english: {
      id: 'telegram_english',
      language: 'English',
      messages: [
        {
          id: '1',
          sender: 'user',
          message: 'Hi, I\'m looking for condos in Miami Beach',
          timestamp: '2:15 PM'
        },
        {
          id: '2',
          sender: 'bot',
          message: 'Hello! I found several condos in Miami Beach. What\'s your budget range?',
          timestamp: '2:15 PM',
          type: 'quick_reply',
          data: ['Under $800K', '$800K - $1.2M', '$1.2M+', 'Show all']
        },
        {
          id: '3',
          sender: 'user',
          message: '$800K - $1.2M',
          timestamp: '2:16 PM'
        },
        {
          id: '4',
          sender: 'bot',
          message: 'Great! Here are 3 amazing condos in your range:\n\n🏖️ **Ocean View Condo** - $950K\n📊 PropGuard Score: 9.1/10\n🛏️ 2 bed, 2 bath\n\nWould you like to schedule a tour?',
          timestamp: '2:16 PM',
          type: 'quick_reply',
          data: ['Schedule Tour', 'More Details', 'Virtual Tour', 'Save Property']
        }
      ]
    },
    chinese: {
      id: 'telegram_chinese',
      language: 'Chinese',
      messages: [
        {
          id: '1',
          sender: 'user',
          message: '你好，我想找上海的投资房产',
          timestamp: '2:15 PM'
        },
        {
          id: '2',
          sender: 'bot',
          message: '您好！我可以帮您找上海的投资房产。请问您的预算是多少？',
          timestamp: '2:15 PM',
          type: 'quick_reply',
          data: ['500万以下', '500-1000万', '1000万以上', '查看投资建议']
        },
        {
          id: '3',
          sender: 'user',
          message: '500-1000万',
          timestamp: '2:16 PM'
        },
        {
          id: '4',
          sender: 'bot',
          message: '根据PropGuard AI分析，上海市场目前投资前景良好。为您找到3套符合预算的优质房产：\n\n🏙️ **豪华公寓** - 800万\n📊 PropGuard评分: 8.9/10\n💎 投资回报率: 5.8%\n\n需要详细分析报告吗？',
          timestamp: '2:16 PM',
          type: 'quick_reply',
          data: ['查看报告', '预约看房', '计算收益', '风险评估']
        }
      ]
    },
    french: {
      id: 'telegram_french',
      language: 'French',
      messages: [
        {
          id: '1',
          sender: 'user',
          message: 'Bonjour, je cherche un appartement à Paris',
          timestamp: '2:15 PM'
        },
        {
          id: '2',
          sender: 'bot',
          message: 'Bonjour ! Je serais heureux de vous aider à trouver un appartement à Paris. Quel est votre budget ?',
          timestamp: '2:15 PM',
          type: 'quick_reply',
          data: ['Moins de 500K€', '500K€ - 1M€', 'Plus de 1M€', 'Voir les conseils']
        },
        {
          id: '3',
          sender: 'user',
          message: '500K€ - 1M€',
          timestamp: '2:16 PM'
        },
        {
          id: '4',
          sender: 'bot',
          message: 'Parfait ! J\'ai trouvé 4 appartements dans cette fourchette de prix dans différents arrondissements de Paris. Voulez-vous voir les détails ou programmer une visite ?',
          timestamp: '2:16 PM',
          type: 'quick_reply',
          data: ['Voir détails', 'Programmer visite', 'Comparer prix', 'Analyse marché']
        }
      ]
    }
  };

  const getLanguageFlag = (lang: string) => {
    switch (lang) {
      case 'spanish': return '🇪🇸';
      case 'english': return '🇺🇸';
      case 'chinese': return '🇨🇳';
      case 'french': return '🇫🇷';
      default: return '🌍';
    }
  };

  const renderConversation = () => {
    const conversation = conversations[activeLanguage];
    const visibleMessages = conversation.messages.slice(0, currentStep + 1);

    return (
      <div className="space-y-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              {getLanguageFlag(activeLanguage)} Telegram Bot Demo - {conversation.language}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 p-4 bg-white rounded-lg border">
              {visibleMessages.map((message) => (
                <div key={message.id} className="space-y-2">
                  <div className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-100'
                    }`}>
                      <div className="text-sm">{message.message}</div>
                      <div className={`text-xs mt-1 ${
                        message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp}
                      </div>
                    </div>
                  </div>

                  {/* Quick Reply Buttons */}
                  {message.type === 'quick_reply' && (
                    <div className="flex justify-start grid grid-cols-2 gap-2 ml-0">
                      {message.data?.map((reply: string, index: number) => (
                        <Button
                          key={index}
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => {
                            if (currentStep < conversation.messages.length - 1) {
                              setCurrentStep(prev => prev + 1);
                            }
                          }}
                        >
                          {reply}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Progress Control */}
            <div className="flex justify-center gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(0)}
                disabled={currentStep === 0}
              >
                Reset
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              <Button
                size="sm"
                onClick={() => setCurrentStep(prev => prev + 1)}
                disabled={currentStep >= conversation.messages.length - 1}
              >
                Next Step
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderLanguageFeatures = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-purple-500" />
          Multilingual AI Features
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Language Capabilities */}
          <div className="space-y-4">
            <h3 className="font-semibold">Supported Languages</h3>
            <div className="space-y-3">
              {Object.entries(conversations).map(([key, conv]) => (
                <div key={key} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getLanguageFlag(key)}</span>
                    <span className="font-medium">{conv.language}</span>
                  </div>
                  <Button
                    variant={activeLanguage === key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => {
                      setActiveLanguage(key as any);
                      setCurrentStep(0);
                    }}
                  >
                    Demo
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Cultural Adaptations */}
          <div className="space-y-4">
            <h3 className="font-semibold">Cultural Adaptations</h3>
            <div className="space-y-3">
              <div className="p-3 bg-blue-50 rounded-lg">
                <div className="font-medium text-sm text-blue-800">🇪🇸 Spanish</div>
                <div className="text-xs text-blue-600">Formal/informal tone switching, European property terminology</div>
              </div>
              <div className="p-3 bg-green-50 rounded-lg">
                <div className="font-medium text-sm text-green-800">🇨🇳 Chinese</div>
                <div className="text-xs text-green-600">Investment-focused language, market analysis emphasis</div>
              </div>
�              <div className="p-3 bg-purple-50 rounded-lg">
                <div className="font-medium text-sm text-purple-800">🇫🇷 French</div>
                <div className="text-xs text-purple-600">Polite conversational style, French real estate law context</div>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="font-medium text-sm text-gray-800">🇺🇸 English</div>
                <div className="text-xs text-gray-600">Direct communication style, US market conventions</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderAdvancedFeatures = () => (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-green-500" />
          Advanced Telegram Features
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="font-semibold">Rich Media Support</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Home className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium text-sm">Property Cards</div>
                  <div className="text-xs text-gray-600">Interactive cards with images, prices, and quick actions</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Video className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="font-medium text-sm">Virtual Tours</div>
                  <div className="text-xs text-gray-600">Seamless integration with tour scheduling</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Calendar className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium text-sm">Calendar Integration</div>
                  <div className="text-xs text-gray-600">Direct booking and appointment scheduling</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Conversation Features</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Star className="h-5 w-5 text-yellow-500" />
                <div>
                  <div className="font-medium text-sm">Context Memory</div>
                  <div className="text-xs text-gray-600">Remembers preferences across conversations</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Globe className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium text-sm">Auto-Translation</div>
                  <div className="text-xs text-gray-600">Real-time language detection and translation</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Phone className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium text-sm">Agent Handoff</div>
                  <div className="text-xs text-gray-600">Smooth transition to human agents when needed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Multilingual Telegram Demo</h2>
        <p className="text-gray-600">Real-time language detection with cultural adaptation and seamless conversation flows</p>
      </div>

      {/* Main Demo View */}
      <div className="space-y-6">
        {renderConversation()}
        
        {/* Language Selection */}
        <div className="flex justify-center gap-2">
          {Object.keys(conversations).map((lang) => (
            <Button
              key={lang}
              variant={activeLanguage === lang ? 'default' : 'outline'}
              onClick={() => {
                setActiveLanguage(lang as any);
                setCurrentStep(0);
              }}
              className="flex items-center gap-2"
            >
              {getLanguageFlag(lang)} {lang.charAt(0).toUpperCase() + lang.slice(1)}
            </Button>
          ))}
        </div>

        {/* Features Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderLanguageFeatures()}
          {renderAdvancedFeatures()}
        </div>
      </div>
    </div>
  );
};
