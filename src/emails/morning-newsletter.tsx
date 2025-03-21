import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';
import {
  Cloud,
  CloudDrizzle,
  CloudFog,
  CloudLightning,
  CloudRain,
  CloudSnow,
  Sun
} from 'lucide-react';
import 'dotenv/config';


interface MorningNewsletterProps {
  username?: string;
  city?: string;
  date?: string;
  topNews?: Array<{
    title: string;
    summary: string;
    url: string;
  }>;
  weather?: {
    temp: string;
    condition: string;
    icon?: React.ReactNode;
  };
}

export async function getWeatherData(city = 'Paris') {
  try {   
    const API_KEY = process.env.OPENWEATHER_API_KEY;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${API_KEY}`
    ); 
    

    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }

    const data = await response.json();

    // Map weather condition to appropriate icon
    let icon;
    const weatherId = data.weather[0].id;

    if (weatherId >= 200 && weatherId < 300) {
      icon = <CloudLightning size={48} />;
    } else if (weatherId >= 300 && weatherId < 400) {
      icon = <CloudDrizzle size={48} />;
    } else if (weatherId >= 500 && weatherId < 600) {
      icon = <CloudRain size={48} />;
    } else if (weatherId >= 600 && weatherId < 700) {
      icon = <CloudSnow size={48} />;
    } else if (weatherId >= 700 && weatherId < 800) {
      icon = <CloudFog size={48} />;
    } else if (weatherId === 800) {
      icon = <Sun size={48} />;
    } else {
      icon = <Cloud size={48} />;
    }

    return {
      temp: `${Math.round(data.main.temp)}°C`,
      condition: data.weather[0].main,
      icon
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return { temp: '21°C', condition: 'Sunny', icon: <Sun size={48} /> };
  }
}

export const MorningNewsletter = async ({
  username = 'Reader',
  city = 'Lyon',
  date = new Date().toLocaleDateString(),
  topNews = [],
  weather: initialWeather,
}: MorningNewsletterProps) => {
  // Fetch weather data if not provided
  const weather = initialWeather || await getWeatherData(city);
  
  return (
    <Tailwind>
      <Html>
        <Head />
        <Preview>Your Morning Briefing for {date}</Preview>
        <Body className="bg-gray-100 my-auto mx-auto font-sans">
          <Container className="max-w-2xl mx-auto my-8 bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Header */}
            <Section className="bg-blue-600 text-white text-center py-8">
              <Heading className="text-3xl font-bold">Morning Briefing</Heading>
              <Text className="text-blue-100 text-lg">
                {date} • Daily Newsletter
              </Text>
            </Section>

            {/* Greeting */}
            <Section className="px-8 pt-6">
              <Text className="text-gray-800 text-lg">
                Good morning, <span className="font-bold">{username}</span>!
              </Text>
              <Text className="text-gray-600">
                Here&apos;s your daily briefing to start your day informed.
              </Text>
            </Section>

            {/* Weather section */}
            <Section className="px-8 py-4">
              <Heading className="text-xl font-semibold text-gray-800">Weather in {city}</Heading>
              <div className="bg-gray-50 rounded-lg p-4 flex items-center">
                <div className="mr-4 text-gray-700">
                  {weather.icon}
                </div>
                <div>
                  <Text className="text-2xl font-bold text-gray-800 mb-0">{weather.temp}</Text>
                  <Text className="text-gray-600 mt-0">{weather.condition}</Text>
                </div>
              </div>
            </Section>

            <Hr className="border-gray-200 my-2" />

            {/* Top News */}
            <Section className="px-8 py-4">
              <Heading className="text-xl font-semibold text-gray-800">Top Stories</Heading>

              {topNews.length > 0 ? (
                topNews.map((story, i) => (
                  <div key={i} className="mb-4">
                    <Link href={story.url} className="text-blue-600 font-medium hover:underline">
                      {story.title}
                    </Link>
                    <Text className="text-gray-600 mt-1">{story.summary}</Text>
                  </div>
                ))
              ) : (
                <>
                  <div className="mb-4">
                    <Link href="#" className="text-blue-600 font-medium hover:underline">
                      Global markets see unexpected surge as new economic policies take effect
                    </Link>
                    <Text className="text-gray-600 mt-1">
                      Analysts predict continued growth through the next quarter following implementation of new fiscal measures.
                    </Text>
                  </div>

                  <div className="mb-4">
                    <Link href="#" className="text-blue-600 font-medium hover:underline">
                      Breakthrough in renewable energy storage announced by researchers
                    </Link>
                    <Text className="text-gray-600 mt-1">
                      The new technology could solve long-standing challenges in storing solar and wind energy efficiently.
                    </Text>
                  </div>
                </>
              )}

              <Link href="#" className="text-blue-600 text-sm hover:underline">
                Read more news →
              </Link>
            </Section>

            <Hr className="border-gray-200 my-2" />

            {/* Quote of the day */}
            <Section className="px-8 py-4 bg-gray-50">
              <Heading className="text-xl font-semibold text-gray-800">Quote of the Day</Heading>
              <Text className="text-gray-700 italic">
                The best preparation for tomorrow is doing your best today.
              </Text>
              <Text className="text-gray-600 text-sm">— H. Jackson Brown, Jr.</Text>
            </Section>

            {/* Footer */}
            <Section className="px-8 py-6 text-center bg-gray-50 mt-4">
              <Text className="text-sm text-gray-600">
                You&apos;re receiving this email because you subscribed to Morning Briefing.
              </Text>
              <Link href="#" className="text-blue-600 hover:underline text-sm">
                Unsubscribe
              </Link>
              <Text className="text-xs text-gray-500 mt-4">
                © 2023 Morning Briefing • All rights reserved
              </Text>
            </Section>
          </Container>
        </Body>
      </Html>
    </Tailwind>
  );
};

export default MorningNewsletter;
