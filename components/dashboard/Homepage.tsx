import Link from "next/link";
import Wrapper from "../layout/Wrapper";
import { Button } from "../ui/button";

export default function Homepage() {
  return (
    <main>
      <Wrapper className="max-w-xl my-20 md:my-28">
        <section className="text-center space-y-6 text-pretty">
          <h1 className="font-bold text-4xl  leading-tight">
            Give and Receive freely in your community
          </h1>
          <p className="text-muted-foreground">
            Join thousands of neighbors sharing items they no longer need.
            Reduce waste, help others, and strengthen your local community.
          </p>
          <div className="space-x-4">
            <Link href="/upload">
              <Button>Post Item</Button>
            </Link>
            <Link href="/items">
              <Button variant={"secondary"}>Browse</Button>
            </Link>
          </div>
        </section>
      </Wrapper>
    </main>
  );
}
