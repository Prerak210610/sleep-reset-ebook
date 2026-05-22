import PolicyLayout, { H2 } from "@/components/PolicyLayout";

export const metadata = { title: "Terms & Conditions" };

export default function TermsPage() {
  return (
    <PolicyLayout kicker="Legal" title="Terms & Conditions" updated="22 May 2026">
      <p>
        By accessing drsampoorna.com or booking any service offered by Dr. Sampoorna and Cosmia
        Wellness, you agree to the following terms.
      </p>

      <H2>Use of the website</H2>
      <p>
        Content on this site is provided for general educational and wellness purposes. You agree
        not to misuse, scrape, copy, or republish content without written permission.
      </p>

      <H2>Bookings, fees and refunds</H2>
      <p>
        Sessions are priced as listed on the Services page (₹499 / session at the time of writing).
        Payment is collected at or before the first session. Cancellations made at least 24 hours
        in advance are eligible for a full credit toward a future session. No-shows are not
        refundable. Long-term packages are governed by a separate written agreement.
      </p>

      <H2>Conduct during sessions</H2>
      <p>
        For online sessions, please ensure adequate space, a stable internet connection, and an
        undisturbed environment. Inform Dr. Sampoorna of any new injury, surgery, pregnancy or
        medical condition before each session.
      </p>

      <H2>No medical claims</H2>
      <p>
        All sessions, programs, including the Sampoorna Fertility Yoga (SFY) Protocol, are
        supportive wellness practices. They do not diagnose, treat, cure, or prevent any disease,
        and are not a substitute for licensed medical care.
      </p>

      <H2>Intellectual property</H2>
      <p>
        All content, protocols, written materials and the SFY framework are the intellectual
        property of Dr. Sampoorna and Cosmia Wellness. Reproduction, redistribution, or commercial
        use is prohibited without written consent.
      </p>

      <H2>Limitation of liability</H2>
      <p>
        Participation in any session is voluntary. Practice within the limits of your body. Dr.
        Sampoorna and Cosmia Wellness will not be liable for injury arising from disregarding
        instructions, undisclosed medical conditions, or practice outside the supervised session.
      </p>

      <H2>Changes</H2>
      <p>
        These terms may be updated periodically. Continued use of the site or services constitutes
        acceptance of the updated terms.
      </p>
    </PolicyLayout>
  );
}
