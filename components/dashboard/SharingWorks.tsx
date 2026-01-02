import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Wrapper from "../layout/Wrapper";
import SafetyReminder from "../ui/safety-reminder";

const project = [
  {
    step: "one",
    title: "Post items you want to give away",
    description:
      "Upload photos, add a description, and let your neighbors know what you're sharing",
  },
  {
    step: "two",
    title: "Others request to claim your items",
    description:
      "Review requests from community members and choose who gets what",
  },
  {
    step: "three",
    title: "Meet safely and hand off",
    description: "Arrange pickup in a public place and complete the exchange",
  },
];

export default function Sharing() {
  return (
    <main>
      <Wrapper className="mb-20">
        <section>
          <div className="text-center space-y-4">
            <h1 className="font-bold text-3xl">How It Works</h1>
            <p>
              Sharing with your community is simple. No money changes hands—just
              kindness.
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-6 mt-8 text-pretty">
            {project.map((item) => (
              <Card key={item.step} className="flex-1 shrink-0">
                <CardHeader className="font-bold text-xs">
                  <p>Step {item.step}</p>
                  <CardTitle className="font-bold  text-xl">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-pretty">{item.description}</p>
                </CardContent>{" "}
                <CardFooter className="mt-auto">
                  {/* <p>Learn more...</p> */}
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
        <SafetyReminder />
      </Wrapper>
    </main>
  );
}
