import PolicyLayout, { H2 } from "@/components/PolicyLayout";

export const metadata = { title: "Wellness Disclaimer" };

export default function DisclaimerPage() {
  return (
    <PolicyLayout kicker="Important" title="Wellness Disclaimer" updated="22 May 2026">
      <p>
        Yoga and wellness services offered by Dr. Sampoorna and Cosmia Wellness are{" "}
        <em>supportive practices</em>. They are <strong>not</strong> a substitute for professional
        medical diagnosis, treatment, or emergency care.
      </p>

      <H2>What our services are</H2>
      <p>
        A research-informed, individually-assessed practice combining posture, breath, meditation
        and lifestyle. Designed to support general wellness, mobility, breath capacity, mind-body
        regulation, and the lifestyle dimensions of common modern concerns.
      </p>

      <H2>What our services are not</H2>
      <p>
        A diagnosis. A treatment. A cure. A guarantee of any specific outcome — including, with
        particular care, the outcomes of any fertility journey. The Sampoorna Fertility Yoga (SFY)
        Protocol is supportive only and works alongside, never in place of, medical care from
        endocrinologists, gynaecologists, and reproductive specialists.
      </p>

      <H2>Before practising</H2>
      <p>
        Always consult your physician before beginning any new wellness practice, especially if
        you have an existing medical condition, are recovering from surgery, are pregnant, or are
        managing chronic pain.
      </p>

      <H2>During practice</H2>
      <p>
        Practise within the comfortable limits of your body. Stop immediately if you feel
        dizziness, sharp pain, or breathlessness. Inform your instructor.
      </p>

      <H2>Emergency</H2>
      <p>
        For any medical emergency, call your local emergency number immediately. This website,
        Dr. Sampoorna, and Cosmia Wellness are not equipped to provide emergency care.
      </p>
    </PolicyLayout>
  );
}
