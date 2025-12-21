import Wrapper from "../layout/Wrapper";
import { Button } from "../ui/button";

export default function Homepage() {
  return (
    <Wrapper className="max-w-xl my-20 md:my-28">
      <main className="min-h-screen ">
        <section className="text-center space-y-6 text-pretty">
          <h1 className="font-bold text-4xl  leading-tight">
            Give and Receive freely in your community
          </h1>
          <p>
            Share items you no longer need with neighbors who will use them. No
            buying, no selling, just good people helping good people. Start
            giving today.
          </p>
          <div className="space-x-4">
            <Button>Post Item</Button>
            <Button variant={"secondary"}>Browse</Button>
          </div>
        </section>
      </main>
    </Wrapper>
  );
}
