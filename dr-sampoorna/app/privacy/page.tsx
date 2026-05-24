import PolicyLayout, { H2 } from "@/components/PolicyLayout";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <PolicyLayout kicker="Legal" title="Privacy Policy" updated="22 May 2026">
      <p>
        Dr. Sampoorna and Cosmia Wellness ("we", "our", "us") respect your privacy. This policy
        explains what personal information we collect when you visit drsampoorna.com or use any of
        our services, how we use it, and the choices you have.
      </p>

      <H2>Information we collect</H2>
      <p>
        We collect information you voluntarily provide — your name, phone number, email, the body
        concerns you choose to share with us, and any messages you send via the contact or booking
        forms. We also collect basic technical information through Google Analytics 4: pages
        visited, device type, approximate location, and referral source.
      </p>

      <H2>How we use your information</H2>
      <p>
        Your information is used solely to respond to enquiries, deliver the service you requested,
        coordinate consultations, send important updates about your bookings, and improve the
        website. We do not sell your data. We do not share it with advertisers.
      </p>

      <H2>Where your data is stored</H2>
      <p>
        Form submissions and account data are stored in Google Firebase (Firestore) servers and
        protected by Google's security infrastructure. Wellness journal entries and dashboard
        content are visible only to you and to authorised admins of Cosmia Wellness.
      </p>

      <H2>Your rights</H2>
      <p>
        You can request a copy of your data, ask us to update it, or request deletion at any time
        by writing to cosmiawellness@gmail.com. Account holders may delete their account directly
        from the dashboard settings.
      </p>

      <H2>Cookies</H2>
      <p>
        We use cookies and localStorage for authentication, theme/language preference, sound
        preferences, and analytics. You can disable cookies in your browser settings, but some
        features (login, dashboard) may not work.
      </p>

      <H2>Contact</H2>
      <p>
        Privacy queries · cosmiawellness@gmail.com · +91 7303083757
      </p>
    </PolicyLayout>
  );
}
