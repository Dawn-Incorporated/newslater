import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';
import * as React from 'react';

interface MagicLinkEmailProps {
  username?: string;
  email?: string;
  magicLink?: string;
  loginCode?: string;
  expiryMinutes?: number;
  companyName?: string;
  companyLogo?: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : '';

export const MagicLinkEmail = ({
  username = 'there',
  email = 'user@example.com',
  magicLink = 'https://example.com/login/verify?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
  loginCode = 'ABCD-EFGH-IJKL',
  expiryMinutes = 10,
  companyName = 'Newslater',
  companyLogo = `${baseUrl}/static/company-logo.png`,
}: MagicLinkEmailProps) => (
  <Tailwind>
    <Html>
      <Head />
      <Preview>Your magic link to sign in to {companyName}</Preview>
      <Body className="bg-gray-100 my-auto mx-auto font-sans">
        <Container className="max-w-md mx-auto my-8 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header with Logo */}
          <Section className="text-center pt-8 pb-4">
            <Img
              src={companyLogo}
              width="64"
              height="64"
              alt={`${companyName} Logo`}
              className="mx-auto"
            />
            <Heading className="text-xl font-semibold text-gray-800 mt-4">
              Sign in to {companyName}
            </Heading>
          </Section>

          <Hr className="border-gray-200 my-2" />

          {/* Main Content */}
          <Section className="px-8 py-6">
            <Text className="text-gray-700">
              Hi {username},
            </Text>
            <Text className="text-gray-700">
              We received a request to sign in to {companyName} using this email address ({email}). 
              Click the button below to securely sign in.
            </Text>
            
            {/* Magic Link Button */}
            <Section className="text-center my-6">
              <Button
                className="bg-blue-600 rounded-md text-white py-3 px-6 font-medium hover:bg-blue-700"
                href={magicLink}
              >
                Sign in securely
              </Button>
            </Section>
            
            <Text className="text-gray-700 text-sm">
              This magic link will expire in {expiryMinutes} minutes and can only be used once.
            </Text>
            
            {/* Or use code section */}
            <Section className="mt-6">
              <Text className="text-gray-700">
                Alternatively, you can copy and paste this verification code:
              </Text>
              <Section className="bg-gray-50 rounded-md py-2 px-4 my-2 text-center">
                <Text className="font-mono font-medium text-lg text-gray-800 tracking-wide">
                  {loginCode}
                </Text>
              </Section>
            </Section>
          </Section>
          
          <Hr className="border-gray-200 my-2" />

          {/* Security Notice */}
          <Section className="px-8 py-4 bg-gray-50">
            <Text className="text-sm text-gray-600">
              If you didn&apos;t request this sign-in link, you can safely ignore this email. 
              Someone may have entered your email address by mistake.
            </Text>
          </Section>

          {/* Footer */}
          <Section className="px-8 py-6 text-center">
            <Text className="text-xs text-gray-500">
              © {new Date().getFullYear()} {companyName}. All rights reserved.
            </Text>
            <Text className="text-xs text-gray-500 mt-1">
              Our address: 123 Main St, Anytown, ST 12345
            </Text>
            <Section className="mt-4">
              <Link href="#" className="text-xs text-blue-600 hover:underline px-2">
                Privacy Policy
              </Link>
              <Link href="#" className="text-xs text-blue-600 hover:underline px-2">
                Terms of Service
              </Link>
              <Link href="#" className="text-xs text-blue-600 hover:underline px-2">
                Contact Support
              </Link>
            </Section>
          </Section>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

MagicLinkEmail.PreviewProps = {
  username: 'Sophie',
  email: 'sophie@example.com',
  magicLink: 'https://newslater.app/login/verify?token=eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U',
  loginCode: 'BHPN-RDCZ-FALM',
  expiryMinutes: 15,
  companyName: 'Newslater',
} as MagicLinkEmailProps;

export default MagicLinkEmail;
